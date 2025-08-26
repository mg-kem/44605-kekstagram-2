
import {
  BASE_URL,
  TIMEOUT_DISPLAYED_ERROR_MESSAGE,
  Route,
  isEscapeKey,
} from './support';

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

const successMessage = () => {
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

const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET}`)
    .then((response) => response.json())
    .then((objectsPhoto) => {
      onSuccess(objectsPhoto);
    })
    .catch(() => {
      showMessageErrorGetData();
    });
};

const sendData = (body, onSuccess) => {

  fetch(`${BASE_URL}${Route.SEND}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        successMessage();
      } else {
        showMessageErrorSendData();
      }
      return response.json();
    })
    .catch(() => {
      showMessageErrorSendData(); // ???
    })
    .finally(() => onSuccess());
};

export { getData, sendData };
