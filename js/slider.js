const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');

sliderValue.value = 50;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

slider.noUiSlider.on('update', (...rest) => {
  sliderValue.value = slider.noUiSlider.get();
});
