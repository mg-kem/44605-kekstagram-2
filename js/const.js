// api-fetch.js
export const BASE_URL = 'https://31.javadscript.htmlacademy.pro/kekstagram';
export const TIMEOUT_DISPLAYED_ERROR_MESSAGE = 5000;
export const Route = {
  GET: '/data',
  SEND: '/'
};

// render-comments-full-photo.js
export const COUNT_STEP = 5;

// upload-from.js
export const SCALE_STEP = 0.25;

// validation.js
export const MAX_LENGTH_DESCRIPTION = 140;

// filter-thumbmails.js
export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

export const SortFunc = {
  RANDOM: () => 0.5 - Math.random(),
  DISCUSSED: (a, b) => b.comments.length - a.comments.length,
};

// slider.js
export const EffectSettings = {
  none: null, // эффект "Оригинальный"
  chrome: { min: 0, max: 1, step: 0.1, start: 1, filterType: 'grayscale' }, // эффект "Хром"
  sepia: { min: 0, max: 1, step: 0.1, start: 1, filterType: 'sepia' }, // эффект "Сепия"
  marvin: { min: 0, max: 1, step: 0.01, start: 1, filterType: 'invert' }, // эффект "Марвин"
  phobos: { min: 0, max: 3, step: 0.1, start: 3, filterType: 'blur' }, // эффект "Фобос"
  heat: { min: 1, max: 3, step: 0.1, start: 3, filterType: 'brightness' }, // эффект "Зной"
};
