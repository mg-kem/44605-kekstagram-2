
import { renderObjectPhoto } from './rendering-thumbnails.js';
import { getData } from './api.js'; // Получаем данные, рендерим объекты, навешиваем обработчик открытия FullPhoto
import './upload-photo-users.js'; // Загрузка изображений на сайт

getData(renderObjectPhoto);

