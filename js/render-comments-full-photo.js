import { COUNT_STEP } from './const';

let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const socialCommentsNode = bigPicture.querySelector('.social__comments'); // блок комментариев
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment'); // берем в качестве шаблона li элемент
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader'); // кнопка загрузки комментариев
const commentsCount = bigPicture.querySelector('.social__comment-count'); // блок с количеством комментариев
const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');
const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
socialCommentsNode.textContent = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment(); // создаю фрагмент комментария
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP); // отрендеренные комменты
  const renderedCommentsLength = renderedComments.length + currentCount; // сохраняю длину отрендеренных комментов

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar; // Присваиваю адрес аватара комментатора
    socialCommentNode.querySelector('.social__picture').alt = comment.name; // Присваиваю к описанию аватара имя комментатора
    socialCommentNode.querySelector('.social__text').textContent = comment.message; // Прописываю в параграф текст комментария

    commentsFragment.append(socialCommentNode); // Сохраняю полученный комментарий (элемент li) в фрагмент. Далее в цикле создаю новый и так же записываю в фрагмент
  });
  socialCommentsNode.append(commentsFragment);
  commentShownCount.textContent = renderedCommentsLength;
  commentTotalCount.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.textContent = '';
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoaderButton.addEventListener('click', renderNextComments);
};

export {
  clearComments,
  renderComments,
};
