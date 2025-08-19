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

const showMessageErrorSendData = () => {
  const messageError = document
    .querySelector('#error')
    .content.querySelector('.error');

  document.body.insertAdjacentElement('beforeEnd', messageError);

  const deleteMessage = () => {
    document.querySelector('.error').remove();
  };

  document.addEventListener('click', deleteMessage());
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      deleteMessage();
    }
  });
};

const successMessage = () => {
  const messageSuccess = document
    .querySelector('#success')
    .content.querySelector('.success');

  document.body.insertAdjacentElement('beforeEnd', messageSuccess);
  document.addEventListener('click', () => {
    document.querySelector('.success').remove();
  });
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
// загрузка данных
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
      }
    })
    .catch(() => {
      onSuccess();
      showMessageErrorSendData(); // ???
    });
};

export { getData, sendData };
