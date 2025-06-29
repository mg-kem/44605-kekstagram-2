import { createRandomIdFromRangeGenerator } from './create-random-id-from-range-generator.js';
import { getRandomArrayElement } from './get-random-array-element.js';
import { getRandomInteger } from './get-random-element.js';
import { createComments } from './create-comments.js';
import { DESCRIPTION, LIKES_COUNT, OBJECT_COUNT, PHOTO_COUNT } from './data.js';

const generatePhotoId = createRandomIdFromRangeGenerator(
  PHOTO_COUNT.min,
  PHOTO_COUNT.max
);
const generatePhotoUrl = createRandomIdFromRangeGenerator(
  PHOTO_COUNT.min,
  PHOTO_COUNT.max
);

// создаем объект
const createObjectDescription = () => ({
  id: generatePhotoId(), // число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
  url: `photos/${generatePhotoUrl()}.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: getRandomArrayElement(DESCRIPTION), // строка — описание фотографии. Описание придумайте самостоятельно.
  likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: createComments(), // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.
});

// создаю массив "Array.from" из объектов, созданных с помощью функции создания одного объекта  "createObjectDescription"
const objectPhoto = Array.from(
  { length: OBJECT_COUNT }, // указываю длину массива (количество созданных объектов)
  createObjectDescription
);

export { objectPhoto };
