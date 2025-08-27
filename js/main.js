
import { getDataFromServer } from './api.js';
import { renderObjectPhoto } from './rendering-thumbnails.js';
import { sendingFile } from './upload-form.js';

getDataFromServer(renderObjectPhoto);
sendingFile();
