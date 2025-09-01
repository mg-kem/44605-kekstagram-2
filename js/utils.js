import { TIMEOUT_DELAY_VALUE } from './const';

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = TIMEOUT_DELAY_VALUE) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const sortType = {
  sortRandom: () => 0.5 - Math.random(),
  sortDiscussed: (a, b) => b.comments.length - a.comments.length,
}; // filter-thumbmails.js

export {
  isEscapeKey,
  debounce,
  sortType,
};
