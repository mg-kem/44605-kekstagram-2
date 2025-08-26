
import { BASE_URL, ROUTE, TIMEOUT_DISPLAYED_ERROR_MESSAGE } from './const';
import { isEscapeKey } from './utils';

const remove = (elem) => document.querySelector(`.${elem}`).remove();

const showMessageErrorGetData = () => {
  const messageError = document
    .querySelector('#data-error')
    .content.querySelector('.data-error');

  document.body.insertAdjacentElement('beforeEnd', messageError);

  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, TIMEOUT_DISPLAYED_ERROR_MESSAGE);
};

const showMessageErrorSendData = () => {
  const messageError = document
    .querySelector('#error')
    .content.querySelector('.error');

  document.body.insertAdjacentElement('beforeEnd', messageError);

  document.addEventListener('click', () => remove('error'));
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (isEscapeKey(evt)) {
      remove('error');
    }
  });
};

const showMessageSuccess = () => {
  const messageSuccess = document
    .querySelector('#success')
    .content.querySelector('.success');

  document.body.insertAdjacentElement('beforeEnd', messageSuccess);
  document.addEventListener('click', () => remove('success'));
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (isEscapeKey(evt)) {
      remove('success');
    }
  });
};

export const getDataFromServer = (onSuccess) => {
  fetch(`${BASE_URL}${ROUTE.GET}`)
    .then((response) => response.json())
    .then((objectsPhoto) => {
      onSuccess(objectsPhoto);
    })
    .catch(() => {
      showMessageErrorGetData();
    });
};

export const sendDataToServer = (body, onSuccess) => {

  fetch(`${BASE_URL}${ROUTE.SEND}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessageSuccess();
      } else {
        showMessageErrorSendData();
      }
      return response.json();
    })
    .catch(() => {
      showMessageErrorSendData();
    })
    .finally(() => onSuccess());
};
