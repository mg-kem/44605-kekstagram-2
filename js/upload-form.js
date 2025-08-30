import { sendDataToServer } from './api-fetch.js';
import { pristine } from './validation.js';
import { isEscapeKey } from './utils.js';
import { addChangeEffect, removeChangeEffect, sliderContainer, noneEffect } from './slider.js';
import { onBiggerClick, onSmallerClick, scaleDefault } from './scaling-picture.js';

const uploadForm = document.querySelector('.img-upload__form'); // Форма отправки изображения
const uploadFileControl = uploadForm.querySelector('.img-upload__input'); // input для загрузки изображения
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // Окно редактирования изображения перед отправкой
const buttonCloseFileEditor = uploadFileEditor.querySelector('.img-upload__cancel'); // Кнопка закрытия окна редактирования изображения
const imgUploadPreview = uploadFileEditor.querySelector('.img-upload__preview img'); // Предварительный просмотр изображения
const effectImagePreviews = uploadFileEditor.querySelectorAll('.effects__preview');
const hashtagInput = uploadFileEditor.querySelector('.text__hashtags'); // Input ввода хэштегов
const commentArea = uploadFileEditor.querySelector('.text__description'); // Inpit ввода комментариев
const imgUploadButton = uploadFileEditor.querySelector('.img-upload__submit'); // Кнопка отправки формы

const buttonSmaller = uploadFileEditor.querySelector('.scale__control--smaller');
const buttonBigger = uploadFileEditor.querySelector('.scale__control--bigger');

const onClickBtnClose = () => closeWindowEditor();

const onClickEscape = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentArea) {
      return;
    }
    closeWindowEditor();
  }
};

function closeWindowEditor() {
  uploadFileEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonCloseFileEditor.removeEventListener('click', onClickBtnClose);
  document.removeEventListener('keydown', onClickEscape);
  buttonSmaller.removeEventListener('click', onSmallerClick);
  buttonBigger.removeEventListener('click', onBiggerClick);
  removeChangeEffect();
  noneEffect();
  imgUploadButton.disabled = false;
  imgUploadButton.textContent = 'Опубликовать';
  uploadFileControl.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
  scaleDefault();
}

const uploadImage = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectImagePreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }
  addChangeEffect();
  buttonSmaller.addEventListener('click', onSmallerClick);
  buttonBigger.addEventListener('click', onBiggerClick);
  sliderContainer.classList.add('hidden');
  uploadFileEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonCloseFileEditor.addEventListener('click', onClickBtnClose);
  document.addEventListener('keydown', onClickEscape);
};

const sendingFile = () => {
  uploadFileControl.addEventListener('change', uploadImage);
};

// отправка формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const loadForm = new FormData(evt.target);

    imgUploadButton.disabled = true;
    imgUploadButton.textContent = 'Публикую...';
    sendDataToServer(loadForm, closeWindowEditor);
  }
});

export {
  sendingFile,
  imgUploadPreview,
  uploadForm
};
