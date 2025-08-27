
import { getDataFromServer } from './api.js';
import { renderObjectPhoto } from './rendering-thumbnails.js';
import { sendingFile } from './upload-form.js'; // Загрузка изображений на сайт
// import './slider.js';

getDataFromServer(renderObjectPhoto);
sendingFile();
