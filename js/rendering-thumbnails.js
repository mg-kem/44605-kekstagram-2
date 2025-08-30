import { openFullPhoto } from './rendering-full-photo';

// Нахожу шаблон для отрисовки миниатюр
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

// Находим место, куда будем вставлять миниатюры
const placeInsertThumbnail = document.querySelector('.pictures');

//создаем фрагмент для временной отрисовки в оперативной памяти
const pictureFragment = document.createDocumentFragment();

const renderThumbnails = (photos) => {
  clearThumbnails();
  photos.forEach((photo) => {
    const cloneTemplate = pictureTemplate.cloneNode(true);
    cloneTemplate.dataset.pictureId = photo.id;
    cloneTemplate.querySelector('.picture__img').src = photo.url;
    cloneTemplate.querySelector('.picture__img').alt = photo.description;
    cloneTemplate.querySelector('.picture__likes').textContent = photo.likes;
    cloneTemplate.querySelector('.picture__comments').textContent = photo.comments.length;
    cloneTemplate.addEventListener('click', () => {
      openFullPhoto(photo);
    });

    pictureFragment.append(cloneTemplate);
  });

  placeInsertThumbnail.append(pictureFragment);
};

function clearThumbnails() {
  placeInsertThumbnail.querySelectorAll('a.picture').forEach((thumbnail) => thumbnail.remove());
}

export { renderThumbnails };
