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

const makeStringNumber = (string = '') => {
  let stringOfNumbers = 'Пустая строка';
  for (let i = 0; i < string.length; i++) {
    console.log(string[i]);
    if (Number.isNaN(string[i])) {
      stringOfNumbers += string[i];
    }
  }
  return stringOfNumbers;
};

makeStringNumber('23rwesdv-1');
