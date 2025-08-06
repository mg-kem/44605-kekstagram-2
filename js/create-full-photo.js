import { placeInsertImage } from './create-thumbnails-photo.js';
import { objectPhoto } from './create-object-description.js';

const bigPictureNode = document.querySelector('.big-picture'); // блок FullPhoto
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel'); // крестик закрытия FullPhoto
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img'); // Тег внутри блока FullPhoto
const likesCountNode = bigPictureNode.querySelector('.likes-count'); // количество лайков
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption'); // блок с описанием
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count'); // блок с количеством комментариев
// const commentShownCount = commentsCountNode.querySelector('.social__comment-shown-count'); // количество отображаемых комментариев
// const commentTotalCount = commentsCountNode.querySelector('.social__comment-total-count'); // общее количество комментариев
const socialCommentsNode = bigPictureNode.querySelector('.social__comments'); // блок комментариев
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment'); // берем в качестве шаблона li элемент
const commentsLoaderButton = bigPictureNode.querySelector('.social__comments-loader'); // кнопка загрузки комментариев

// 5. Функция закрытия большого изображения
const closeFullPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

// 2. Функция открытия большого изображения
const openFullPhoto = (pictureId) => {
  const currentPhoto = objectPhoto.find((photo) => photo.id === Number(pictureId)); // Поиск в массиве объектов элемента по условию отловленного на 1 шаге клика (picture-id)

  bigPictureNode.classList.remove('hidden'); // скрываю класс, чтобы отобразить full photo

  bigPictureImgNode.src = currentPhoto.url; // Присваиваем путь к полноразмерному изображению из объекта миниатюры
  likesCountNode.textContent = currentPhoto.likes; // Присваиваем количество лайков к полноразмерному изображению из объекта миниатюры
  // commentTotalCount.textContent = currentPhoto.comments.length;
  commentsCaptionNode.textContent = currentPhoto.description; // Присваиваем описание фотографии из объекта миниатюры


  socialCommentsNode.textContent = ''; // обнуляю контент ul - список комментариев
  const commentsFragment = document.createDocumentFragment(); // Создаю фрагмент для временной отрисовки комментариев

  currentPhoto.comments.forEach((comment) => { // Перебираю весь массив комментариев объекта миниатюры
    const socialCommentNode = socialCommentTemplate.cloneNode(true); // Создаю переменную для клонирования шаблона комментария

    socialCommentNode.children[0].src = comment.avatar; // Присваиваю адрес аватара комментатора
    socialCommentNode.children[0].alt = comment.name; // Присваиваю к описанию аватара имя комментатора
    socialCommentNode.children[1].textContent = comment.message; // Прописываю в параграф текст комментария
    commentsFragment.append(socialCommentNode); // Сохраняю полученный комментарий (элемент li) в фрагмент. Далее в цикле создаю новый и так же записываю в фрагмент
  });
  socialCommentsNode.append(commentsFragment); // Добавляю фрагмент целиком, содержащий все комментарии в список ul, который ранее обнулил(стр 40)

  commentsLoaderButton.classList.add('hidden'); // Скрываем кнопку загрузки комментариев
  commentsCountNode.classList.add('hidden'); // Скрываем блок с количеством комментариев
  document.querySelector('body').classList.add('modal-open'); // Добавляем класс для всего документа, чтобы убрать прокрутку

  // 3. Клик по крестику вызывает функцию закрытия большого изображения
  bigPictureCancelNode.addEventListener('click', () => {
    closeFullPicture();
  });

  // 4. Нажатие на кнопку Escape на всем документе вызывает функцию закрытия большого изображения
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      console.log()
      closeFullPicture();
    }
  });
};

// 1. Вешаем обработчик на весь контейнер миниатюр
placeInsertImage.addEventListener('click', (evt) => {
  // Ловим клик на элементе с классом ".picture".
  // evt.target.closest('.picture') - означает, что мы ловим клик в том числе на всех дочерних элементах, внутри этого класса
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    openFullPhoto(currentPicture.dataset.pictureId);
  }
});
