import { BASE_URL, Route, TIMEOUT_DISPLAYED_ERROR_MESSAGE } from './const';
import { isEscapeKey } from './utils';
import { showFilterObject } from './filter-thumbnails';

const remove = (elem) => {
  if (document.querySelector(`.${elem}`)) {
    document.querySelector(`.${elem}`).remove();
  }
};

const showMessageErrorGetData = () => {
  const messageTemplate = document
    .querySelector('#data-error')
    .content.querySelector('.data-error');
  const message = messageTemplate.cloneNode(true);
  message.classList('data-error-remove');
  document.body.insertAdjacentElement('beforeEnd', message);
  setTimeout(() => {
    document.querySelector('.data-error-remove').remove();
  }, TIMEOUT_DISPLAYED_ERROR_MESSAGE);
};

const showMessageSuccess = () => {
  const messageTemplate = document
    .querySelector('#success')
    .content.querySelector('.success');

  const message = messageTemplate.cloneNode(true);
  message.classList.add('success-remove');

  let isActive = true;

  const handleEvent = (evt) => {
    if (!isActive) {
      return;
    }

    if (evt.type === 'click') {
      remove('success-remove');
      isActive = false;
      document.removeEventListener('keydown', handleEvent);
      document.removeEventListener('click', handleEvent);
    } else if (evt.type === 'keydown' && isEscapeKey(evt)) {
      evt.preventDefault();
      remove('success-remove');
      isActive = false;
      document.removeEventListener('keydown', handleEvent);
      document.removeEventListener('click', handleEvent);
    }
  };

  document.addEventListener('click', handleEvent);
  document.addEventListener('keydown', handleEvent);
  document.body.insertAdjacentElement('beforeEnd', message);
};

const showMessageErrorSendData = () => {
  const messageTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');

  const message = messageTemplate.cloneNode(true);
  message.classList.add('error-remove');

  let isActive = true;

  const handleEvent = (evt) => {
    if (!isActive) {
      return;
    }

    if (evt.type === 'click') {
      remove('error-remove');
      isActive = false;
      document.removeEventListener('keydown', handleEvent);
      document.removeEventListener('click', handleEvent);
    } else if (evt.type === 'keydown' && isEscapeKey(evt)) {
      evt.preventDefault();
      remove('error-remove');
      isActive = false;
      document.removeEventListener('keydown', handleEvent);
      document.removeEventListener('click', handleEvent);
    }
  };

  document.addEventListener('click', handleEvent);
  document.addEventListener('keydown', handleEvent);

  document.body.insertAdjacentElement('beforeEnd', message);
};

export const getDataFromServer = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET}`)
    .then((response) => response.json())
    .then((objectsPhoto) => {
      showFilterObject(objectsPhoto);
      onSuccess(objectsPhoto);
    })
    .catch(() => {
      showMessageErrorGetData();
    });
};

export const sendDataToServer = (body, onSuccess) => {
  fetch(`${BASE_URL}${Route.SEND}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessageSuccess();
      }
      // else {
      //   showMessageErrorSendData();
      // }
      // return response.json();
    })
    .catch(() => {
      showMessageErrorSendData();
    })
    .finally(() => onSuccess());
};
