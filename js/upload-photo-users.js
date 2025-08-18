import { sendData } from './api';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // window upload
const uploadFileEditorResetBtn = uploadFileEditor.querySelector('.img-upload__cancel');
const uploadFileControl = document.querySelector('#upload-file'); // input
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');

let errorMessage = '';

const onClickBtnClose = () => closeWindowEditor();
const onClickEscape = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagInput || document.activeElement === commentArea) {
      return;
    }
    closeWindowEditor();
  }
};

function closeWindowEditor() {
  uploadFileEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileEditorResetBtn.removeEventListener('click', onClickBtnClose);
  document.removeEventListener('keydown', onClickEscape);
  imgUploadButton.disabled = false;
  imgUploadButton.textContent = 'Опубликоватьььььььь';
  uploadFileControl.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
}

// При изменении состояния инпута (загружаем фото) происходят события внутри функции
uploadFileControl.addEventListener('change', () => {
  uploadFileEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadFileEditorResetBtn.addEventListener('click', onClickBtnClose);
  document.addEventListener('keydown', onClickEscape);
});

// Создаем PRISTINE и передаем переменную формы. Далее навешиваем на "форму"(pristine) валидацию
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// проверка длины комментария
function isValidCommentArea(value) {
  const commentLength = value.length <= 140; // регулярное выражение
  // console.log(regularString, value);
  return commentLength;
}
pristine.addValidator(commentArea, isValidCommentArea, 'Длина комментария должна быть не более 140 символов');

// проверка хэштегов
function isArrayUnique(arr) {
  return new Set(arr).size === arr.length;
}
function isValidHashTag(value) {
  const regularString = /^#[a-zа-яё0-9]{0,19}$/i; // регулярное выражение
  const hashtags = value.split(/\s+/); // Сохраняю массив хэштегов
  const inputText = value.toLowerCase().trim();
  if (inputText.length === 0) {
    return true;
  }
  if (hashtags.length > 5) {
    errorMessage = 'quantity';
    return false;
  }
  if (!isArrayUnique(hashtags)) {
    errorMessage = 'unique';
    return false;
  }
  for (const hashtag of hashtags) {
    if (hashtag[0] !== '#') {
      errorMessage = 'grid';
      return false;
    } else if (hashtag.length < 2 || hashtag.length > 20) {
      errorMessage = 'length';
      return false;
    } else if (!regularString.test(hashtag)) {
      errorMessage = 'regex';
      return false;
    }
  }
  return true;
}

function getErrorMessage() {
  switch (errorMessage) {
    case 'length': return 'Размер хэштега от 1 до 20 символов';
    case 'quantity': return 'Количество хэштегов не больше 5';
    case 'grid': return 'Хэштег должен начинаться с символа #';
    case 'unique': return 'Хэштеги не должны повторяться';
    case 'regex': return 'Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;';
  }
}
pristine.addValidator(hashtagInput, isValidHashTag, getErrorMessage);

// отправка формы

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const loadForm = new FormData(evt.target);

    imgUploadButton.disabled = true;
    imgUploadButton.textContent = 'Публикую...';
    sendData(closeWindowEditor, loadForm);
  }
});
