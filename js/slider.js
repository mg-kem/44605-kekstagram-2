import { imgUploadPreview } from './upload-form';
import { effectSettings, SliderValueDefault } from './const';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const effects = document.querySelectorAll('.effects__radio');
let settings = {};

noUiSlider.create(slider, {
  range: {
    min: SliderValueDefault.MIN,
    max: SliderValueDefault.MAX,
  },
  start: SliderValueDefault.START,
  step: SliderValueDefault.STEP,
  connect: 'lower',
});

const applyEffect = (minRange, maxRange, stepRange, startRange, effectName) => {
  slider.noUiSlider.off(); // удаляем предыдущий обработчик

  slider.noUiSlider.updateOptions({ // обновляем установки слайдера
    start: startRange, // начальная позиция слайдера
    range: { min: minRange, max: maxRange }, //диапазон настроек слайдера
    step: stepRange, // величина шага
  });

  // Обработчик изменения позиции ползунка
  slider.noUiSlider.on('update', (values) => {
    const effectValue = values; // получаем текущее значение слайдера
    switch (effectName) {
      case 'blur':
        imgUploadPreview.style.filter = `${effectName}(${effectValue}px)`; // применяем эффект фильтрации (фобос)
        sliderValue.value = parseFloat(effectValue, 1); // записываем новое значение в скрытое поле
        break;
      case 'invert':
        imgUploadPreview.style.filter = `${effectName}(${effectValue})`; // применяем эффект фильтрации (марвин)
        sliderValue.value = effectValue * 100; // записываем новое значение в скрытое поле
        break;
      default:
        imgUploadPreview.style.filter = `${effectName}(${effectValue})`; // применяем эффект фильтрации (хром, сепия, зной)
        sliderValue.value = parseFloat(effectValue, 1); // записываем новое значение в скрытое поле
    }
  });
};

// Сброс эффектов
const resetEffect = () => {
  slider.noUiSlider.off(); // удаляем предыдущий обработчик
  imgUploadPreview.style.removeProperty('filter'); // удаляем стиль наложения эффекта
  slider.setAttribute('disabled', true); // блокируем слайдер
  sliderValue.value = 0; // сбрасываем значение поля уровень эффекта

  slider.noUiSlider.updateOptions({ // сбрасываем установки слайдера
    start: SliderValueDefault.START,
    range: { min: SliderValueDefault.MIN, max: SliderValueDefault.MAX },
    step: SliderValueDefault.STEP,
  });

  sliderContainer.classList.add('hidden'); // скрываем слайдер
};

// Выбор эффекта
const selectEffect = () => {
  const effectValue = document.activeElement.value;

  switch (effectValue) {
    case 'none': resetEffect();
      break;
    default:
      slider.removeAttribute('disabled');
      sliderContainer.classList.remove('hidden');
      settings = effectSettings[effectValue];
      if (settings) {
        applyEffect(settings.min, settings.max, settings.step, settings.start, settings.filterType, effectValue); // применяем эффект с выбранными настройками
      }
      break;
  }
};

const onButtonEffectClick = () => {
  selectEffect();
};

// Добавление обработчика выбора эффекта
const addChangeEffect = () => {
  effects.forEach((effect) => effect.addEventListener('change', onButtonEffectClick));
};
// Удаление обработчика выбора эффекта
const removeChangeEffect = () => {
  effects.forEach((effect) => effect.removeEventListener('change', onButtonEffectClick));
};

export {
  addChangeEffect,
  removeChangeEffect,
  resetEffect,
  sliderContainer,
};
