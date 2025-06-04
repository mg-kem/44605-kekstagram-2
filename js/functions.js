// Функция для проверки длины строки
const checkLenghtSting = (string = "", maxSimbols = 1) =>
  string.lenght <= maxSimbols;

checkLenghtSting("проверяемая строка", 20);

// Проверка на палиндром
const isPalindrom = (string) {
  string = string.replaseAll(' ', '');
  string = string.toLowerCase();

  let reversed ='';

  for (i = string.lenght; i < string.lenght - 1; i-- ) {
    reversed += string[i];
  }

  return string === reversed;
};
