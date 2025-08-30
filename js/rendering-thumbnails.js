import { openFullPhoto } from './rendering-full-photo';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const placeInsertThumbnail = document.querySelector('.pictures');

const pictureFragment = document.createDocumentFragment();

const clearThumbnails = () => {
  placeInsertThumbnail.querySelectorAll('a.picture').forEach((thumbnail) => thumbnail.remove());
};

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

export { renderThumbnails };
