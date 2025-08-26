const isEscapeKey = (evt) => evt.key === 'Escape';

// API.JS
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const TIMEOUT_DISPLAYED_ERROR_MESSAGE = 5000;

const Route = {
  GET: '/data',
  SEND: '/',
};

// SETTINGS.JS
const effectSettings = {
  none: null, // эффект "Оригинальный"
  chrome: { min: 0, max: 1, step: 0.1, start: 0.5, filterType: 'grayscale' }, // эффект "Хром"
  sepia: { min: 0, max: 1, step: 0.1, start: 0.5, filterType: 'sepia' }, // эффект "Сепия"
  marvin: { min: 0, max: 1, step: 0.1, start: 0.5, filterType: 'invert' }, // эффект "Марвин"
  phobos: { min: 0, max: 3, step: 0.1, start: 1.5, filterType: 'blur' }, // эффект "Фобос"
  heat: { min: 1, max: 3, step: 0.1, start: 2, filterType: 'brightness' }, // эффект "Зной"
};

export {
  isEscapeKey,
  BASE_URL,
  TIMEOUT_DISPLAYED_ERROR_MESSAGE,
  Route,
  effectSettings
};
