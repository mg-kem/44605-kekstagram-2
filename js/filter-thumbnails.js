import { renderThumbnails } from './rendering-thumbnails';
import { Filter, MAX_COUNT_PHOTO_RANDOM_FILTER } from './const';
import { debounce, sortType } from './utils';

const filterThumbnails = document.querySelector('.img-filters'); // section
const filterButtons = filterThumbnails.querySelectorAll('.img-filters__button'); // кнопки внутри section
let originalPhotos = []; // обозначаю пустой массив

const debounceRender = debounce(renderThumbnails);

const onFilterButtonClick = (evt) => {
  const currentButton = evt.target;
  const activeButton = document.querySelector('.img-filters__button--active');

  if (activeButton === currentButton) {
    return;
  } else {
    activeButton.classList.toggle('img-filters__button--active');
    currentButton.classList.toggle('img-filters__button--active');
  }
  let filteredPhotos = [];

  switch (evt.target.id) {
    case Filter.RANDOM:
      filteredPhotos = originalPhotos.toSorted(sortType.sortRandom).slice(0, MAX_COUNT_PHOTO_RANDOM_FILTER);
      break;
    case Filter.DISCUSSED:
      filteredPhotos = originalPhotos.toSorted(sortType.sortDiscussed);
      break;
    case Filter.DEFAULT:
      filteredPhotos = originalPhotos;
      break;
  }
  debounceRender(filteredPhotos);
};

const showFilterObject = (data) => {
  if (data) {
    originalPhotos = data;
    filterThumbnails.classList.remove('img-filters--inactive');
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', onFilterButtonClick);
    });
  }
};

export { showFilterObject };
