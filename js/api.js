const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  SEND: '/',
};

const showMessageErrorGetData = () => {
  const messageError = document
    .querySelector('#data-error')
    .content.querySelector('.data-error');

  document.body.insertAdjacentElement('beforeEnd', messageError);

  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, 5000);
};

const remove = (elem) => document.querySelector(`.${elem}`).remove();

const showMessageErrorSendData = () => {
  const messageError = document
    .querySelector('#error')
    .content.querySelector('.error');

  document.body.insertAdjacentElement('beforeEnd', messageError);
  document.addEventListener('click', remove('error'));
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
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
};

// получение данных
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
// отправка данных
const sendData = (onSuccess, body) => {
  fetch(`${BASE_URL}${Route.SEND}`,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        successMessage();
      } else {
        showMessageErrorSendData();
      }
    })
    .catch(() => {
      showMessageErrorSendData(); // ???
    });
};

export { getData, sendData };
