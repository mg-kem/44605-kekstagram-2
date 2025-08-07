import { getRandomInteger } from './get-random-number.js';
import { getRandomArrayElement } from './get-random-array-element.js';
import { createRandomIdFromRangeGenerator } from './create-random-id-from-range-generator.js';
import { MESSAGES, AVATAR_COUNT, COMMENTS_COUNT, AUTHOR } from './data.js';

const generateAuthorId = createRandomIdFromRangeGenerator(1000, 10000);

// функция для получения комментариев
const createComment = () => ({
  id: generateAuthorId(999, 9999), // любое число. Идентификаторы не должны повторяться.
  avatar: `img/avatar-${getRandomInteger(
    AVATAR_COUNT.min,
    AVATAR_COUNT.max
  )}.svg`, //строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(AUTHOR),
});

const createComments = () =>
  Array.from(
    { length: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max) },
    createComment
  );

export { createComments };
