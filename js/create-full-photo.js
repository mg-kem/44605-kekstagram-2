import { placeInsertImage } from './create-thumbnails-photo.js';
import { objectPhoto } from './create-object-description.js';

const bigPictureNode = document.querySelector('.big-picture'); // блок FullPhoto
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel'); // крестик закрытия FullPhoto
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img'); // Тег внутри блока FullPhoto
const likesCountNode = bigPictureNode.querySelector('.likes-count'); // количество лайков
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption'); // блок с описанием
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count'); // блок с количеством комментариев
const commentShownCount = commentsCountNode.querySelector('.social__comment-shown-count'); // количество отображаемых комментариев
const commentTotalCount = commentsCountNode.querySelector('.social__comment-total-count'); // общее количество комментариев
const socialCommentsNode = bigPictureNode.querySelector('.social__comments'); // блок комментариев
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment'); // берем в качестве шаблона li элемент
const commentsLoaderButton = bigPictureNode.querySelector('.social__comments-loader'); // кнопка загрузки комментариев

// 1. Вешаем обработчик на весь контейнер миниатюр
placeInsertImage.addEventListener('click', (evt) => {
  // Ловим клик на элементе с классом ".picture".
  // evt.target.closest('.picture') - означает, что мы ловим клик в том числе на всех дочерних элементах, внутри этого класса
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    openFullPhoto(currentPicture.dataset.pictureId);
  }
});

// 2. Функция открытия большого изображения
const openFullPhoto = (pictureId) => {
  bigPictureNode.classList.remove('hidden'); // скрываю класс, чтобы отобразить full photo
  const currentPhoto = objectPhoto.find((photo) => photo.id === Number(pictureId)); // Поиск в массиве объектов элемента по условию отловленного на 1 шаге клика (picture-id)
  bigPictureImgNode.src = currentPhoto.url;
  likesCountNode.textContent = currentPhoto.likes;
  commentTotalCount.textContent = currentPhoto.comments.length;
  commentsCaptionNode.textContent = currentPhoto.description;
  commentsLoaderButton.classList.add('hidden');
  commentsCountNode.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  const commentsObjectPhoto = currentPhoto.comments; // получаю массив комментариев

  socialCommentsNode.textContent = '';


  const commentsFragment = document.createDocumentFragment();
  commentsObjectPhoto.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.children[0].src = comment.avatar;
    socialCommentNode.children[1].textContent = comment.message;
    commentsFragment.append(socialCommentNode);
  });
  socialCommentsNode.append(commentsFragment);


  // socialCommentNode.children.src = commentsObjectPhoto.url;
  // commentsFragment.append(socialCommentNode);
  // socialCommentsNode.append(socialCommentNode);// Сюда я буду добавлять комментарии из массива commentsObjectPhoto
};

// 3. Клик по крестику вызывает функцию закрытия большого изображения
bigPictureCancelNode.addEventListener('click', (evt) => {
  closeFullPicture();
});
// 4. Нажатие на кнопку Escape вызывает функцию закрытия большого изображения
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeFullPicture();
  }
});
// 5. Функция закрытия большого изображения
const closeFullPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};
