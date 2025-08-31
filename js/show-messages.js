import { TIMEOUT_DISPLAYED_ERROR_MESSAGE } from './const';
import { isEscapeKey } from './utils';

const removeMessage = (elem) => {
  const message = document.querySelector(`.${elem}`);
  if (message) {
    message.remove();
  }
};

const createMessageElement = (elem) => {
  const template = document.querySelector(`#${elem}`);
  const message = template.content.querySelector(`.${elem}`).cloneNode(true);
  message.classList.add(`${elem}--visible`);
  return message;
};

const setupMessageHandlers = (message, elem, messageContainer, closeButton) => {

  const clearEventListeners = () => {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const closeMessage = () => {
    removeMessage(elem);
    clearEventListeners();
  };

  function onDocumentClick(evt) {
    const isClickInsideContainer = messageContainer.contains(evt.target);
    const isClickOnCloseButton = closeButton && closeButton.contains(evt.target);

    if (!isClickInsideContainer || isClickOnCloseButton) {
      closeMessage();
    }
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  // Добавляю обработчик на сам closeButton если он существует
  if (closeButton) {
    closeButton.addEventListener('click', closeMessage);
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  return clearEventListeners;
};

const getErrorMessage = (errorName) => {
  const errorMessages = {
    TypeError: 'Проблемы с сетью. Проверьте подключение к интернету',
    SyntaxError: 'Ошибка обработки данных с сервера',
    NetworkError: 'Ошибка сети. Проверьте соединение',
    default: 'Не удалось загрузить данные. Попробуйте позже'
  };

  return errorMessages[errorName] || errorMessages.default;
};

const showMessage = (elem, errorName = null) => {
  const message = createMessageElement(elem);
  if (!message) {
    return;
  }
  // Нахожу элементы внутри блока сообщения
  const messageTitle = message.querySelector(`.${elem}__title`);
  const messageContainer = message.querySelector(`.${elem}__inner`);
  const closeButton = messageContainer?.querySelector(`.${elem}__button`);

  // Устанавливаю текст ошибки
  if (errorName && messageTitle) {
    messageTitle.textContent = getErrorMessage(errorName);
  }

  // Добавляю сообщение в DOM
  document.body.append(message);

  // Настраиваю обработчики
  const cleanup = setupMessageHandlers(message, elem, messageContainer, closeButton);

  // Особый случай для data-error (авто-закрытие)
  if (elem === 'data-error') {
    cleanup();
    setTimeout(() => {
      removeMessage(elem);
    }, TIMEOUT_DISPLAYED_ERROR_MESSAGE);
  }
};

export { showMessage };
