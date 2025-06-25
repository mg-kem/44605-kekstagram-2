/*
  ЗАДАЧА:
  напишите необходимые функции для создания массива из 25 сгенерированных объектов.
  Каждый объект массива — описание фотографии, опубликованной пользователем.
*/
const PHOTO_COUNT = 1;
const LIKES_COUNT = { min: 15, max: 200 };
const COMMENTS_COUNT = { min: 0, max: 30 };
const AVATAR_COUNT = { min: 0, max: 6 };

const DESCRIPTION = [
  'На Алтае',
  'В Москве',
  'На работе',
  'Отдыхаю',
  'Пишу код',
  'Учусь',
  'Путешествую',
  'Смотрю сериалы',
  'Гуляю',
  'Читаю',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHOR = [
  'Анна Петрова',
  'Сергей Иванов',
  'Мария Смирнова',
  'Дмитрий Кузнецов',
  'Екатерина Попова',
  'Алексей Соколов',
  'Татьяна Лебедева',
  'Михаил Новиков',
  'Наталья Волкова',
  'Андрей Морозов',
  'Ольга Федорович',
  'Денис Ковалев',
  'Юлия Алексеева',
  'Максим Степанов',
  'Ирина Орлова',
  'Владимир Сергеев',
  'Полина Голубева',
  'Антон Романов',
  'Александра Андреева',
  'Евгений Дмитриев',
  'Дарья Иванова',
  'Григорий Захаров',
  'Вероника Кузнецова',
  'Артем Карпов',
  'Ксения Васильева',
];

// функция генерирует случайное число из заданного диапазона
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// функция создает уникальный  идентификатор из диапазона значений
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      console.error(
        'Перебраны все числа из диапазона от ' + min + ' до ' + max
      );
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, 25);
const generateAuthorId = createRandomIdFromRangeGenerator(1000, 10000);

// функция для получения случайного элемента массива
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

// функция для получения комментариев
const createComment = () => ({
  id: generateAuthorId(100, 100000), // любое число. Идентификаторы не должны повторяться.
  avatar: `img/avatar-${getRandomInteger(
    AVATAR_COUNT.min,
    AVATAR_COUNT.max
  )}.svg`, //строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(AUTHOR),
});

const createComments = Array.from(
  { length: getRandomInteger(0, 30) },
  createComment
);

// создаем объект
const createObjectDescription = () => ({
  id: generatePhotoId(), // число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
  url: `photos/${generatePhotoUrl()}.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: getRandomArrayElement(DESCRIPTION), // строка — описание фотографии. Описание придумайте самостоятельно.
  likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: createComments, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.
});

// создаю массив "Array.from" из объектов, созданных с помощью функции создания одного объекта  "createObjectDescription"
const objectPhoto = Array.from(
  { length: PHOTO_COUNT }, // указываю длину массива (количество созданных объектов)
  createObjectDescription
);

console.log(objectPhoto); // вывожу в консоль массив, одновременно вызывая функцию
