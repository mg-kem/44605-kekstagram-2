const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  SEND: '/',
};

const errorShowMessage = () => {
  const messageTemplate = document
    .querySelector('#data-error')
    .content.querySelector('.data-error');

  document.body.insertAdjacentElement('beforeEnd', messageTemplate);

  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, 5000);
};

// получение данных
const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET}`)
    .then((response) => response.json())
    .then((objectsPhoto) => {
      onSuccess(objectsPhoto);
    })
    .catch(() => {
      errorShowMessage();
    });
};

export { getData };
