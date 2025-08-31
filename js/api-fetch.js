import { BASE_URL, Route } from './const';
import { showFilterObject } from './filter-thumbnails';
import { showMessage } from './show-messages';
import { imgUploadButton } from './upload-form';

let errorName = '';

const getDataFromServer = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((objectsPhoto) => {
      showFilterObject(objectsPhoto);
      onSuccess(objectsPhoto);
    })
    .catch((error) => {
      errorName = error.name;
      showMessage('data-error', errorName);
    });
};

const sendDataToServer = (body, onSuccess) => {
  fetch(`${BASE_URL}${Route.SEND}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showMessage('success');
      } else if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
      }
    })
    .catch((error) => {
      errorName = error.name;
      showMessage('error', errorName);
      imgUploadButton.disabled = false;
      imgUploadButton.textContent = 'Опубликовать';
    });
};

export { sendDataToServer, getDataFromServer };
