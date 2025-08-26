
import { COUNT_STEP } from './const';

let currentCount = 0;
let comments = [];


const bigPicture = document.querySelector('.big-picture');
const socialCommentsNode = bigPicture.querySelector('.social__comments'); // блок комментариев
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment'); // берем в качестве шаблона li элемент
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader'); // кнопка загрузки комментариев
const commentsCount = bigPicture.querySelector('.social__comment-count'); // блок с количеством комментариев
socialCommentsNode.textContent = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment(); // создаю фрагмент комментария
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP); // отрендеренные комменты
  const renderedCommentsLength = renderedComments.length + currentCount; // сохраняю длину отрендеренных комментов

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.children[0].src = comment.avatar; // Присваиваю адрес аватара комментатора
    socialCommentNode.children[0].alt = comment.name; // Присваиваю к описанию аватара имя комментатора
    socialCommentNode.children[1].textContent = comment.message; // Прописываю в параграф текст комментария

    commentsFragment.append(socialCommentNode); // Сохраняю полученный комментарий (элемент li) в фрагмент. Далее в цикле создаю новый и так же записываю в фрагмент
  });
  socialCommentsNode.append(commentsFragment);
  commentsCount.querySelector('.social__comment-shown-count').textContent = renderedCommentsLength;
  commentsCount.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

export const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.textContent = '';
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.removeEventListener('click', renderNextComments);
};

export const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoaderButton.addEventListener('click', renderNextComments);
};
