import { isEscapeKey } from './util.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effect.js';
import { resetScale } from './scale.js';
import { sendPictures } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Хэштеги должен начинаться c #, состоять из букв и чисел без пробелов, длинной до 20 символов'
};

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileField = form.querySelector('.img-upload__input');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonCaption.SUBMITTING
    : SubmitButtonCaption.IDLE;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  const fileExtension = FILE_TYPES.map((type) => type.toLowerCase());

  return fileExtension.includes(fileName.split('.').pop());
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isErrorMessageExist = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExist()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModal();
};
const sendForm = async (formElement) => {
  if (! pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }

};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

const initValidateForm = () => {
  pristine.addValidator(
    hashtagField,
    hasValidTags,
    ErrorText.INVALID_PATTERN,
    1,
    true,
  );

  pristine.addValidator(
    hashtagField,
    hasValidCount,
    ErrorText.INVALID_COUNT,
    3,
    true,
  );

  pristine.addValidator(
    hashtagField,
    hasUniqueTags,
    ErrorText.NOT_UNIQUE,
    2,
    true,
  );

  fileField.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  form.addEventListener('submit', onFormSubmit);
  initEffect();
};

export {initValidateForm};
