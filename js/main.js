import { getPhotos } from './data.js';
import { renderGallery } from './gallery.js';
import {validateForm} from './form.js';

renderGallery(getPhotos());
validateForm();
