import { TIMEOUT_DISPLAYED_ERROR_MESSAGE } from './const';
import { isEscapeKey } from './utils';

const removeMessage = (elem) => {
  if (document.querySelector(`.${elem}`)) {
    document.querySelector(`.${elem}`).remove();
  }
};

const showMessage = (elem, errorName = null) => {

  const messageTemplate = document
    .querySelector(`#${elem}`)
    .content.querySelector(`.${elem}`);
  const message = messageTemplate.cloneNode(true);
  message.classList.add(`${elem}-remove`);

  if (errorName) {
    switch (errorName) {
      case 'TypeError':
        message.querySelector(`.${elem}__title`).textContent = 'Проблемы с сетью. Проверьте подключение к интернету';
        break;
      case 'SyntaxError':
        message.querySelector(`.${elem}__title`).textContent = 'Ошибка обработки данных с сервера';
        break;
      default:
        message.querySelector(`.${elem}__title`).textContent = 'Не удалось загрузить данные. Попробуйте позже';
    }
  }

  function onClickFunc(evt) {
    evt.preventDefault();
    if (evt.type === 'click') {
      if (!document.querySelector(`.${elem}__inner`).contains(evt.target)) {
        removeMessage(elem);
        document.removeEventListener('click', onClickFunc);
      } else if (document.querySelector(`.${elem}__inner`).contains(evt.target) && document.querySelector(`.${elem}__button`).contains(evt.target)) {
        removeMessage(elem);
        document.removeEventListener('click', onClickFunc);
      }
    } else if (evt.type === 'keydown' && isEscapeKey(evt)) {
      removeMessage(elem);
      document.removeEventListener('keydown', onClickFunc);
    }
  }

  document.body.append(message);
  document.addEventListener('click', onClickFunc);
  document.addEventListener('keydown', onClickFunc);

  if (elem === 'data-error') {
    document.removeEventListener('click', onClickFunc);
    document.removeEventListener('keydown', onClickFunc);
    setTimeout(() => {
      removeMessage(elem);
    }, TIMEOUT_DISPLAYED_ERROR_MESSAGE);
  }
};

export { showMessage };
