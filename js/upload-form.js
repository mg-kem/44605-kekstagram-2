
import { sendDataToServer } from './api.js';
import { pristine } from './validation.js';
import { isEscapeKey } from './utils.js';
import { addEventListenerEffect, removeEventListenerEffect, sliderContainer } from './slider.js';
import { SCALE_STEP } from './const.js';

export const uploadForm = document.querySelector('.img-upload__form'); // Форма отправки изображения
const uploadFileControl = uploadForm.querySelector('.img-upload__input'); // input для загрузки изображения
const uploadFileEditor = document.querySelector('.img-upload__overlay'); // Окно редактирования изображения перед отправкой
const uploadFileEditorResetBtn = uploadFileEditor.querySelector('.img-upload__cancel'); // Кнопка закрытия окна редактирования изображения
export const imgUploadPrewiev = uploadFileEditor.querySelector('.img-upload__preview img'); // Предварительный просмотр изображения
const effectImagePreviews = uploadFileEditor.querySelectorAll('.effects__preview');
const hashtagInput = uploadFileEditor.querySelector('.text__hashtags'); // Input ввода хэштегов
const commentArea = uploadFileEditor.querySelector('.text__description'); // Inpit ввода комментариев
const imgUploadButton = uploadFileEditor.querySelector('.img-upload__submit'); // Кнопка отправки формы

const btnSmaller = uploadFileEditor.querySelector('.scale__control--smaller');
const btnBigger = uploadFileEditor.querySelector('.scale__control--bigger');
const scaleControl = uploadFileEditor.querySelector('.scale__control--value');

let scale = 1;

const onClickBtnClose = () => closeWindowEditor();

const onClickEscape = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentArea) {
      return;
    }
    closeWindowEditor();
  }
};

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPrewiev.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgUploadPrewiev.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

function closeWindowEditor() {
  uploadFileEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileEditorResetBtn.removeEventListener('click', onClickBtnClose);
  document.removeEventListener('keydown', onClickEscape);
  btnSmaller.removeEventListener('click', onSmallerClick); // Клик на кнопку уменьшения изображения в окне предпросмотра
  btnBigger.removeEventListener('click', onBiggerClick); // Клик на кнопку увеличения изображения в окне предпросмотра
  removeEventListenerEffect();
  imgUploadButton.disabled = false;
  imgUploadButton.textContent = 'Опубликовать';
  uploadFileControl.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
}

const uploadImage = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    imgUploadPrewiev.src = URL.createObjectURL(file);
    effectImagePreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }
  addEventListenerEffect();
  sliderContainer.classList.add('hidden');
  uploadFileEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadFileEditorResetBtn.addEventListener('click', onClickBtnClose);
  document.addEventListener('keydown', onClickEscape);
};

export const sendingFile = () => {
  uploadFileControl.addEventListener('change', uploadImage); // При изменении input type='file' ...
  btnSmaller.addEventListener('click', onSmallerClick); // Клик на кнопку уменьшения изображения в окне предпросмотра
  btnBigger.addEventListener('click', onBiggerClick); // Клик на кнопку увеличения изображения в окне предпросмотра
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
