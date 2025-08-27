
import { renderObjectPhoto } from './rendering-thumbnails';
import { FILTER, SORTFUNC } from './const';
import { debounce } from './utils';

const filterThumbnails = document.querySelector('.img-filters'); // section
const filterButtons = filterThumbnails.querySelectorAll('.img-filters__button'); // кнопки внутри section
let objectsData = []; // обозначаю пустой массив

const debounceRender = debounce(renderObjectPhoto);

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
    case FILTER.random:
      filteredPhoto = objectsData.sort(SORTFUNC.random).slice(0, 10);
      break;
    case FILTER.discussed:
      filteredPhoto = objectsData.sort(SORTFUNC.discussed);
      break;
    case FILTER.default:
      filteredPhoto = objectsData;
      break;
  }
  // renderObjectPhoto(filteredPhoto);
  debounceRender(filteredPhoto);
};

export const showFilterObject = (data) => {
  if (data) {
    objectsData = data;
    filterThumbnails.classList.remove('img-filters--inactive');
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', onClickButtonFilter);
    });
  }
};

