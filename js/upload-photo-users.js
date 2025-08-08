const uploadForm = document.querySelector('.img-upload__form');
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // window upload
const uploadFileEditorResetBtn = uploadFileEditor.querySelector('.img-upload__cancel');
const uploadFileControl = document.querySelector('#upload-file'); // input
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

const onClickBtnClose = () => closeWindowEditor();
const onClickEscape = (evt) => {
  if (evt.key === 'Escape') {

    if (document.activeElement === hashtagInput && document.activeElement === commentArea) {
      evt.preventDefault();
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
  // errorTextTag: 'span',
  // errorTextClass: 'text-help'
});

function isValidHashtag(value) {
  const regularString = /^#[a-zа-яё0-9]{1,19}$/i.test(value); // регулярное выражение
  // console.log(regularString, value);
  return regularString;
}

function isValidCommentArea(value) {
  const commentLength = value.length <= 140; // регулярное выражение
  // console.log(regularString, value);
  return commentLength;
}

pristine.addValidator(hashtagInput, isValidHashtag, 'Ошибка');
pristine.addValidator(commentArea, isValidCommentArea, 'Длина комментария должна быть не более 140 символов');
