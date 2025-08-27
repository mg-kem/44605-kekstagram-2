import { openFullPhoto } from './rendering-full-photo';

// Нахожу шаблон для отрисовки миниатюр
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

// Находим место, куда будем вставлять миниатюры
const placeInsertThumbnail = document.querySelector('.pictures');

//создаем фрагмент для временной отрисовки в оперативной памяти
const pictureFragment = document.createDocumentFragment();

export const renderObjectPhoto = (objectsPhoto) => {
  clearThumbnails();
  objectsPhoto.forEach((objectPhoto) => {
    const cloneTemplate = pictureTemplate.cloneNode(true);
    cloneTemplate.dataset.pictureId = objectPhoto.id;
    cloneTemplate.children[0].src = objectPhoto.url;
    cloneTemplate.children[0].alt = objectPhoto.description;
    cloneTemplate.querySelector('.picture__likes').textContent = objectPhoto.likes;
    cloneTemplate.querySelector('.picture__comments').textContent = objectPhoto.comments.length;
    cloneTemplate.addEventListener('click', () => {
      openFullPhoto(objectPhoto);
    });

    pictureFragment.append(cloneTemplate);
  });

  placeInsertThumbnail.append(pictureFragment);
};

function clearThumbnails() {
  placeInsertThumbnail.querySelectorAll('a.picture').forEach((thumbnail) => thumbnail.remove());
}
