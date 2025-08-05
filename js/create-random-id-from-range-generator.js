import { getRandomInteger } from './get-random-element.js';

// функция создает уникальный  идентификатор из диапазона значений
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      // console.error(
      //   'Перебраны все числа из диапазона от ' + min + ' до ' + max
      // );
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export { createRandomIdFromRangeGenerator };
