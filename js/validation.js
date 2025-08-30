import { MAX_LENGTH_DESCRIPTION, HashtagValue } from './const';

const uploadForm = document.querySelector('.img-upload__form'); // Форма отправки изображения
const commentArea = uploadForm.querySelector('.text__description'); // Inpit ввода комментариев
const hashtagInput = uploadForm.querySelector('.text__hashtags'); // Input ввода хэштегов

let errorMessage = '';

// Создаем PRISTINE и передаем переменную формы. Далее навешиваем на "форму"(pristine) валидацию
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// проверка длины комментария
const isValidCommentArea = (value) => {
  const commentLength = value.length <= MAX_LENGTH_DESCRIPTION;
  return commentLength;
};
pristine.addValidator(commentArea, isValidCommentArea, 'Длина комментария должна быть не более 140 символов');

// проверка хэштегов
const isArrayUnique = (arr) => new Set(arr).size === arr.length;


const isValidHashTag = (value) => {
  const regularString = /^#[a-zа-яё0-9]{0,19}$/i; // регулярное выражение
  const hashtags = value.split(/\s+/); // Сохраняю массив хэштегов
  const inputText = value.toLowerCase().trim();
  if (inputText.length === 0) {
    return true;
  }
  if (hashtags.length > HashtagValue.COUNT) {
    errorMessage = 'quantity';
    return false;
  }
  if (!isArrayUnique(hashtags)) {
    errorMessage = 'unique';
    return false;
  }
  for (const hashtag of hashtags) {
    if (hashtag[0] !== '#') {
      errorMessage = 'grid';
      return false;
    } else if (hashtag.length < HashtagValue.MIN || hashtag.length > HashtagValue.MAX) {
      errorMessage = 'length';
      return false;
    } else if (!regularString.test(hashtag)) {
      errorMessage = 'regex';
      return false;
    }
  }
  return true;
};

const getErrorMessage = () => {
  switch (errorMessage) {
    case 'length': return 'Размер хэштега от 1 до 20 символов';
    case 'quantity': return 'Количество хэштегов не больше 5';
    case 'grid': return 'Хэштег должен начинаться с символа #';
    case 'unique': return 'Хэштеги не должны повторяться';
    case 'regex': return 'Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;';
  }
};

pristine.addValidator(hashtagInput, isValidHashTag, getErrorMessage);

export { pristine };
