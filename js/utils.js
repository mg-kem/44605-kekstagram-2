export const isEscapeKey = (evt) => evt.key === 'Escape';

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...arguments), timeoutDelay);
  };
}
