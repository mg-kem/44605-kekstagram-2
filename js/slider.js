import { imgUploadPrewiev } from './upload-form';
import { EFFECT_SETTINGS } from './const';

export const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementValue = document.querySelector('.effect-level__value');
const effectElements = document.querySelectorAll('.effects__radio');
let settings = {};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});

const applyEffect = (minRange, maxRange, stepRange, startRange, effectName) => {
  sliderElement.noUiSlider.off(); // удаляем предыдущий обработчик

  sliderElement.noUiSlider.updateOptions({ // обновляем установки слайдера
    start: startRange, // начальная позиция слайдера
    range: { min: minRange, max: maxRange }, //диапазон настроек слайдера
    step: stepRange, // величина шага
  });

  // Обработчик изменения позиции ползунка
  sliderElement.noUiSlider.on('update', (values) => {
    const effectValue = values; // получаем текущее значение слайдера
    switch (effectName) {
      case 'blur':
        imgUploadPrewiev.style.filter = `${effectName}(${effectValue}px)`; // применяем эффект фильтрации (фобос)
        sliderElementValue.value = parseFloat(effectValue, 1); // записываем новое значение в скрытое поле
        break;
      case 'invert':
        imgUploadPrewiev.style.filter = `${effectName}(${effectValue})`; // применяем эффект фильтрации (марвин)
        sliderElementValue.value = effectValue * 100; // записываем новое значение в скрытое поле
        break;
      default:
        imgUploadPrewiev.style.filter = `${effectName}(${effectValue})`; // применяем эффект фильтрации (хром, сепия, зной)
        sliderElementValue.value = parseFloat(effectValue, 1); // записываем новое значение в скрытое поле
    }
  });
};

// Сброс эффектов
const noneEffect = () => {
  sliderElement.noUiSlider.off(); // удаляем предыдущий обработчик
  imgUploadPrewiev.style.removeProperty('filter'); // удаляем стиль наложения эффекта
  sliderElement.setAttribute('disabled', true); // блокируем слайдер
  sliderElementValue.value = 0; // сбрасываем значение поля уровень эффекта

  sliderElement.noUiSlider.updateOptions({ // сбрасываем установки слайдера
    start: 0,
    range: { min: 0, max: 100 },
    step: 1,
  });

  sliderContainer.classList.add('hidden'); // скрываем слайдер
};

// Выбор эффекта
const selectEffect = () => {
  const effectValue = document.activeElement.value;

  switch (effectValue) {
    case 'none': noneEffect();
      break;
    default:
      sliderElement.removeAttribute('disabled');
      sliderContainer.classList.remove('hidden');
      settings = EFFECT_SETTINGS[effectValue];
      if (settings) {
        applyEffect(settings.min, settings.max, settings.step, settings.start, settings.filterType, effectValue); // применяем эффект с выбранными настройками
      }
      break;
  }
};

// Добавление обработчика выбора эффекта
export const addChangeEffect = () => {
  effectElements.forEach((effectElement) => effectElement.addEventListener('change', selectEffect));
};
// Удаление обработчика выбора эффекта
export const removeChangeEffect = () => {
  effectElements.forEach((effectElement) => effectElement.removeEventListener('change', selectEffect));
};
