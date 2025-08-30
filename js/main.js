import { getDataFromServer } from './api-fetch.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { openWindowEditor } from './upload-form.js';

getDataFromServer(renderThumbnails);
openWindowEditor();

