// Импортирую временные данные для отрисовки миниатюр
import { objectPhoto } from './create-object-description.js';
console.log(objectPhoto); // вывожу в консоль массив, одновременно вызывая функцию

// Нахожу шаблон для отрисовки миниатюр
let template = document
  .querySelector('#picture')
  .content.querySelector('.picture');

// Находим место, куда будем вставлять миниатюры
const placeInsertImage = document.querySelector('.pictures');

//создаем фрагмент для временной отрисовки в оперативной памяти
const fragment = document.createDocumentFragment();

objectPhoto.forEach(({ url, description, likes, comments }) => {
  // console.log(url, description, likes, comments);
  let cloneTemplate = template.cloneNode(true);
  cloneTemplate.children[0].src = url;
  cloneTemplate.children[0].alt = description;
  cloneTemplate.querySelector('.picture__likes').textContent = likes;
  cloneTemplate.querySelector('.picture__comments').textContent =
    comments.length;
  console.log(cloneTemplate);
  fragment.append(cloneTemplate);
});

placeInsertImage.append(fragment);
