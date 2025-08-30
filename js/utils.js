import { TIMEOUT_DELAY_VALUE } from './const';

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = TIMEOUT_DELAY_VALUE) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  isEscapeKey,
  debounce,
};
