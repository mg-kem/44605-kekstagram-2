// Проверка длины строки
const checkLengthString = (string = '', lengthString = 1) =>
  string.length <= lengthString;

checkLengthString('Проверка строки', 16);

// Проверка строки на палиндром
const isPalindrom = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();

  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return reverseString === string;
};

isPalindrom('Топот');

// Делаем строку положительным числом
// Получаем какую-то строку. Неизвестно, число ли это, либо цифра
// Переводим ее в строку через функцию string ?
// Идем с первого до последнего элемента
// Проверяем, цифра ли это
// Если цифра, то записываем в новую строку эту цифру с помощью конкатенации
// Если буква, переходим к новому элементу строки
// Возвращаем новую строку цифр

const extractNumbers = (string = '') => {
  let numberString = ''; // Строка в которую буду записывать цифры
  let str = string.toString(); // переводим в строчный формат, если вдруг у нас число

  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      numberString += str[i];
    }
  }
  if (numberString === '') {
    return NaN;
  }
  return numberString;
};

extractNumbers('2q4-17.2');
