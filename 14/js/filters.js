import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;

const filterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [filterEnum.DEFAULT]: (data) => data,
  [filterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [filterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

let currentFilter = filterEnum.DEFAULT;

const repaint = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const filterdData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filterdData);
    currentFilter = filter;
  }
};

const debounceRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    const currentActiveEL = filterForm.querySelector('.img-filters__button--active');
    currentActiveEL.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    debounceRepaint(evt, filterEnum.DEFAULT, data);
  });
  randomButton.addEventListener('click', (evt) => {
    const currentActiveEL = filterForm.querySelector('.img-filters__button--active');
    currentActiveEL.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    debounceRepaint(evt, filterEnum.RANDOM, data);
  });
  discussedButton.addEventListener('click', (evt) => {
    const currentActiveEL = filterForm.querySelector('.img-filters__button--active');
    currentActiveEL.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    debounceRepaint(evt, filterEnum.DISCUSSED, data);
  });
};

export { initFilter };
