import { renderGallery } from './gallery.js';
import { initValidateForm } from './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilter } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

initValidateForm();
bootstrap();
