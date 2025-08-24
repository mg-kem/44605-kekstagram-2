const isEscapeKey = (evt) => evt.key === 'Escape';

// API.JS
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const TIMEOUT_DISPLAYED_ERROR_MESSAGE = 5000;

const Route = {
  GET: '/data',
  SEND: '/',
};


export {
  isEscapeKey,
  BASE_URL,
  TIMEOUT_DISPLAYED_ERROR_MESSAGE,
  Route,
};
