const uploadForm = document.querySelector('.img-upload__form');
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // window upload
const uploadFileEditorResetBtn = uploadFileEditor.querySelector('.img-upload__cancel');
const uploadFileControl = document.querySelector('#upload-file'); // input
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

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
pristine.addValidator(commentArea, isValidCommentArea, 'Длина комментария должна быть не более 140 символов');
function isValidCommentArea(value) {
  const commentLength = value.length <= 140; // регулярное выражение
  // console.log(regularString, value);
  return commentLength;
}
// проверка на количество хэштегов (не больше 5)
pristine.addValidator(hashtagInput, (value) => {
  const arrayInputHashtag = value.split(/\s+/);
  return arrayInputHashtag.length <= 5;
}, 'Количество хэштегов не больше 5 !');

// проверка на первый символ хэштега
pristine.addValidator(hashtagInput, (value) => {
  const inputText = value.toLowerCase().trim();
  console.log(inputText);
  if (!inputText) {
    return true;
  }
  const arrayInputText = value.split('');
  if (arrayInputText[0] === '#') {
    return true;
  }
}, 'Хэштег должен начинаться с #');

pristine.addValidator(hashtagInput, (value) => {
  const inputText = value.toLowerCase().trim();
  if (inputText.length <= 20) {
    return inputText;
  }
}, 'Длина хэштега должна быть не больше 20 символов');


//const regularString = /^#[a-zа-яё0-9]{1,19}$/i.test(value); // регулярное выражение


