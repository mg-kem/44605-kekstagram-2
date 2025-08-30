import { renderThumbnails } from './rendering-thumbnails';
import { Filter, SortFunc } from './const';
import { debounce } from './utils';

const filterThumbnails = document.querySelector('.img-filters'); // section
const filterButtons = filterThumbnails.querySelectorAll('.img-filters__button'); // кнопки внутри section
let originalPhotos = []; // обозначаю пустой массив

const debounceRender = debounce(renderThumbnails);

const onClickButtonFilter = (evt) => {
  const currentButton = evt.target;
  const activeButton = document.querySelector('.img-filters__button--active');

  if (activeButton === currentButton) {
    return;
  } else {
    activeButton.classList.toggle('img-filters__button--active');
    currentButton.classList.toggle('img-filters__button--active');
  }
  let filteredPhoto = [];

  switch (evt.target.id) {
    case Filter.RANDOM:
      filteredPhoto = originalPhotos.sort(SortFunc.RANDOM).slice(0, 10);
      break;
    case Filter.DISCUSSED:
      filteredPhoto = originalPhotos.sort(SortFunc.DISCUSSED);
      break;
    case Filter.DEFAULT:
      filteredPhoto = originalPhotos;
      break;
  }
  debounceRender(filteredPhoto);
};

export const showFilterObject = (data) => {
  if (data) {
    originalPhotos = data;
    filterThumbnails.classList.remove('img-filters--inactive');
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', onClickButtonFilter);
    });
  }
};

