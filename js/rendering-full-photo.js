import { placeInsertThumbnail } from './rendering-thumbnails.js';
import { objectsPhoto } from './create-object.js';
import { clearComments, renderComments } from './render-comments-full-photo.js';

const bigPicture = document.querySelector('.big-picture'); // блок FullPhoto
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel'); // крестик закрытия FullPhoto
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img'); // Тег внутри блока FullPhoto
const likesCount = bigPicture.querySelector('.likes-count'); // количество лайков
const commentsCaption = bigPicture.querySelector('.social__caption'); // блок с описанием

const onClickBtnClose = (evt) => {
  evt.preventDefault();
  closeFullPicture();
};

const onClickEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPicture();
  }
};

function closeFullPicture() {
  clearComments();

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelButton.removeEventListener('click', onClickBtnClose);
  document.removeEventListener('keydown', onClickEscape);
}

// Функция открытия большого изображения
const openFullPhoto = (pictureId) => {
  const currentPhoto = objectsPhoto.find((photo) => photo.id === Number(pictureId)); // Поиск в массиве объектов элемента по условию отловленного на 1 шаге клика (picture-id)

  bigPictureImg.src = currentPhoto.url; // Присваиваем путь к полноразмерному изображению из объекта миниатюры
  likesCount.textContent = currentPhoto.likes; // Присваиваем количество лайков к полноразмерному изображению из объекта миниатюры
  commentsCaption.textContent = currentPhoto.description; // Присваиваем описание фотографии из объекта миниатюры

  renderComments(currentPhoto.comments);

  bigPicture.classList.remove('hidden'); // скрываю класс, чтобы отобразить full photo
  document.body.classList.add('modal-open'); // Добавляем класс для всего документа, чтобы убрать прокрутку
  bigPictureCancelButton.addEventListener('click', onClickBtnClose); // Клик по крестику вызывает функцию закрытия большого изображения
  document.addEventListener('keydown', onClickEscape); // Нажатие на кнопку Escape на всем документе вызывает функцию закрытия большого изображения
};

// Вешаем обработчик на весь контейнер миниатюр
placeInsertThumbnail.addEventListener('click', (evt) => {
  // Ловим клик на элементе с классом ".picture".
  // evt.target.closest('.picture') - означает, что мы ловим клик в том числе на всех дочерних элементах, внутри этого класса
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    openFullPhoto(currentPicture.dataset.pictureId);
  }
});
