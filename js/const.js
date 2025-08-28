// api.js
export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
export const TIMEOUT_DISPLAYED_ERROR_MESSAGE = 5000;
export const Route = {
  GET: '/data',
  SEND: '/'
};

// slider.js
export const EffectSettings = {
  none: null, // эффект "Оригинальный"
  chrome: { min: 0, max: 1, step: 0.1, start: 0.5, filterType: 'grayscale' }, // эффект "Хром"
  sepia: { min: 0, max: 1, step: 0.1, start: 0.5, filterType: 'sepia' }, // эффект "Сепия"
  marvin: { min: 0, max: 1, step: 0.1, start: 0.5, filterType: 'invert' }, // эффект "Марвин"
  phobos: { min: 0, max: 3, step: 0.1, start: 1.5, filterType: 'blur' }, // эффект "Фобос"
  heat: { min: 1, max: 3, step: 0.1, start: 2, filterType: 'brightness' }, // эффект "Зной"
};

// render-comments-full-photo.js
export const COUNT_STEP = 5;

// upload-from.js
export const SCALE_STEP = 0.25;

// validation.js
export const MAX_LENGTH_DESCRIPTION = 140;

// filter-thumbmails.js
export const Filter = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

export const SortFunc = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};
