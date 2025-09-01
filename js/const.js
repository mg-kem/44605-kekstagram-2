// Константы
const TIMEOUT_DELAY_VALUE = 500; // utils.js
const TIMEOUT_DISPLAYED_ERROR_MESSAGE = 5000; // api-fetch.js
const COUNT_STEP = 5; // render-comments-full-photo.js
const SCALE_STEP = 0.25; // upload-from.js
const MAX_LENGTH_DESCRIPTION = 140; // validation.js
const MAX_COUNT_PHOTO_RANDOM_FILTER = 10; // filter-thumbmails.js
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram'; // api-fetch.js

// Перечисления
const Route = {
  GET: '/data',
  SEND: '/'
}; // api-fetch.js

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
}; // filter-thumbmails.js

const SliderValueDefault = {
  MIN: 0,
  MAX: 100,
  START: 50,
  STEP: 1,
}; // slider.js

const HashtagValue = {
  MIN: 2,
  MAX: 20,
  COUNT: 5,
};

// словарь
const effectSettings = {
  none: null, // эффект "Оригинальный"
  chrome: { min: 0, max: 1, step: 0.1, start: 1, filterType: 'grayscale' }, // эффект "Хром"
  sepia: { min: 0, max: 1, step: 0.1, start: 1, filterType: 'sepia' }, // эффект "Сепия"
  marvin: { min: 0, max: 1, step: 0.01, start: 1, filterType: 'invert' }, // эффект "Марвин"
  phobos: { min: 0, max: 3, step: 0.1, start: 3, filterType: 'blur' }, // эффект "Фобос"
  heat: { min: 1, max: 3, step: 0.1, start: 3, filterType: 'brightness' }, // эффект "Зной"
};// slider.js

export {
  TIMEOUT_DELAY_VALUE,
  BASE_URL,
  TIMEOUT_DISPLAYED_ERROR_MESSAGE,
  Route,
  COUNT_STEP,
  SCALE_STEP,
  MAX_LENGTH_DESCRIPTION,
  MAX_COUNT_PHOTO_RANDOM_FILTER,
  Filter,
  effectSettings,
  SliderValueDefault,
  HashtagValue,
};
