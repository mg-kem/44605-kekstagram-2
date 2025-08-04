// Импортирую временные данные для отрисовки миниатюр
import { objectPhoto } from './create-object-description.js';

// Нахожу шаблон для отрисовки миниатюр
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

// Находим место, куда будем вставлять миниатюры
const placeInsertImage = document.querySelector('.pictures');

//создаем фрагмент для временной отрисовки в оперативной памяти
const pictureFragment = document.createDocumentFragment();

objectPhoto.forEach(({ id, url, description, likes, comments }) => {
  const cloneTemplate = pictureTemplate.cloneNode(true);

  cloneTemplate.dataset.pictureId = id;
  cloneTemplate.children[0].src = url;
  cloneTemplate.children[0].alt = description;
  cloneTemplate.querySelector('.picture__likes').textContent = likes;
  cloneTemplate.querySelector('.picture__comments').textContent =
    comments.length;

  pictureFragment.append(cloneTemplate);
});

placeInsertImage.append(pictureFragment);

export { placeInsertImage };
