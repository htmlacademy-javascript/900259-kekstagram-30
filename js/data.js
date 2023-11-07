import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';
import {createRandomId} from './util.js';

const DESCRIPTION = [
  'Лето',
  'Море',
  'Осень',
  'Зима',
  'Утро',
  'Веселье',
  'Дача',
  'Друзья',
  'Любимая',
  'Дорога',
  'Отдых',
  'Работа',
  'Воспоминания',
  'Покупки',
  'Встреча',
  'Прощание',
  'Радость',
  'Подарок',
  'Учеба',
  'Выходные',
  'Пятница',
  'Выбор',
  'Свобода',
  'Улыбка',
  'Поход',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Аарон',
  'Ерофей',
  'Никанор',
  'Наум',
  'Август',
  'Саддам',
  'Ратмир',
  'Винцас',
  'Милорад',
  'Гарет',
  'Гельмут',
  'Барни',
  'Аттик',
  'Афинагор',
  'Данакт',
  'Валвел',
  'Андокид',
  'Амадис',
  'Жан',
  'Квинт',
  'Марк',
  'Маний',
  'Лиам',
  'Иохим',
  'Диодор1',
];

const PHOTO_COUNT = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENT = 0;
const MAX_COUNT_COMMENT = 30;
const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;
const COUNT_COMMENT = 30;


const createCommentId = createRandomId();
const createPhotoId = createRandomId();

const createMessage = () => Array.from({length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGES),).join(' ');

const createComments = () => ({
  id: getRandomInteger(MIN_COUNT_COMMENT, MAX_COUNT_COMMENT),
  avatar: `img/avatar-${getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: createCommentId(),
  url: `photos/${createPhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({ length: getRandomInteger(0, COUNT_COMMENT)}, createComments),
});

const getPhotos = () => Array.from({length: PHOTO_COUNT}, createPhotoDescription);

export {getPhotos};
