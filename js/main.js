import { getPhotos } from './data.js';
import { renderGallery } from './gallery.js';
import { initvalidateForm } from './form.js';

renderGallery(getPhotos());
initvalidateForm();
