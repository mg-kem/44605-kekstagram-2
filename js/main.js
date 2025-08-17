import { renderObjectPhoto } from './rendering-thumbnails.js';
import './upload-photo-users.js';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((objectsPhoto) => {
    renderObjectPhoto(objectsPhoto);
  });

