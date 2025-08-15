const uploadForm = document.querySelector('.img-upload__form');
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // window upload
const uploadFileEditorResetBtn = uploadFileEditor.querySelector('.img-upload__cancel');
const uploadFileControl = document.querySelector('#upload-file'); // input
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');
uploadFileEditor.classList.remove('hidden'); // убрать

let errorMessage = '';


const onClickBtnClose = () => closeWindowEditor();
const onClickEscape = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagInput || document.activeElement === commentArea) {
      evt.stopPropagation();
    }
    closeWindowEditor();
  }
};

function closeWindowEditor() {
  uploadFileEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileEditorResetBtn.removeEventListener('click', onClickBtnClose);
  document.removeEventListener('keydown', onClickEscape);
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
function isValidHashTag(value) {
  const regularString = /^#[a-zа-яё0-9]{1,19}$/; // регулярное выражение
  const hashtags = value.split(/\s+/); // Сохраняю массив хэштегов
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }
  console.log(hashtags);

  if (hashtags.length > 5) {
    errorMessage = 'quantity';
    return false;
  }
  for (const hashtag of hashtags) {


    if (hashtag[0] !== '#') {
      errorMessage = 'grid';
      return false;
    }
    if (hashtag.length < 1 && hashtag.length > 20) {
      errorMessage = 'length';
      return false;
    }
    if (!regularString.test(hashtag)) {
      // console.log(egularString.test(hashtag));

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
    case 'regex': return 'Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;';
  }
}


pristine.addValidator(hashtagInput, isValidHashTag, getErrorMessage);

// отправка формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // console.log('Можно отправлять');
    uploadForm.submit();
    // } else {
    //   console.log('Форма невалидна');
    //   alert('Форма невалидна');
  }
});
