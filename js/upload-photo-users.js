import { sendData } from './api.js';
import { pristine } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form'); // Форма отправки изображения
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // Окно редактирования изображения перед отправкой
const uploadFileEditorResetBtn = uploadFileEditor.querySelector('.img-upload__cancel'); // Кнопка закрытия окна редактирования изображения
const uploadFileControl = uploadForm.querySelector('.img-upload__input'); // input для загрузки изображения
const imgUploadPrewiev = uploadFileEditor.querySelector('.img-upload__preview').querySelector('img'); // Предварительный просмотр изображения
const hashtagInput = uploadFileEditor.querySelector('.text__hashtags'); // Input ввода хэштегов
const commentArea = uploadFileEditor.querySelector('.text__description'); // Inpit ввода комментариев
const imgUploadButton = uploadFileEditor.querySelector('.img-upload__submit'); // Кнопка отправки формы

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
  imgUploadButton.textContent = 'Опубликовать';
  uploadFileControl.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
}

const uploadImage = () => {
  const reader = new FileReader();
  reader.onload = (evt) = {
    // console.log(evt.target.result);
    imgUploadPrewiev.src = evt.target.result;
  };
  imgUploadPrewiev.src = uploadFileControl.value;
  uploadFileEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadFileEditorResetBtn.addEventListener('click', onClickBtnClose);
  document.addEventListener('keydown', onClickEscape);
};

uploadFileControl.addEventListener('change', uploadImage);// При изменении состояния инпута (загружаем фото) происходят события внутри функции

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
