import { getDataFromServer } from './api-fetch.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { sendingFile } from './upload-form.js';

getDataFromServer(renderThumbnails);
sendingFile();

