import { clearComments, renderComments } from './render-comments-full-photo.js';
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture'); // блок FullPhoto
const buttonCloseBigPicture = bigPicture.querySelector('.big-picture__cancel'); // крестик закрытия FullPhoto
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Тег внутри блока FullPhoto
const likesCount = bigPicture.querySelector('.likes-count'); // количество лайков
const commentsCaption = bigPicture.querySelector('.social__caption'); // блок с описанием

const onClickBtnClose = (evt) => {
  evt.preventDefault();
  closeFullPhoto();
};

const onClickEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

function closeFullPhoto() {
  clearComments();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonCloseBigPicture.removeEventListener('click', onClickBtnClose);
  document.removeEventListener('keydown', onClickEscape);
}

const openFullPhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonCloseBigPicture.addEventListener('click', onClickBtnClose);
  document.addEventListener('keydown', onClickEscape);

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCaption.textContent = photo.description;
  renderComments(photo.comments);
};

export {
  openFullPhoto,
  bigPicture
};
