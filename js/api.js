const BASE_URL = 'https://31.javascript.htmlacadem.pro/kekstagram';
const Route = {
  GET: '/data',
  SEND: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

// получение данных
const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET}`)
    .then((response) => response.json())
    .then((objectsPhoto) => {
      onSuccess(objectsPhoto);
    })
    .catch(() => {
      alert('Не удалось загрузить данные. Попробуйте еще раз');
    });
};

// // отправка данных
// const sendData = (onSuccess, onFail, body) => {
//   fetch('https://31.javascript.htmlacademy.pro/kekstagram/',
//     {
//       method: 'POST',
//       body: body,
//     },
//   )
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//       } else {
//         onFail('Не удалось отправить форму. Попробуйте еще раз');
//       }
//     })
//     .catch(() => {
//       onFail('Не удалось отправить форму. Попробуйте еще раз');
//     });
// };

export { getData };
