const descriptions = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
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
  'Диодор',
];

const photoCount = 4;
const minCountLikes = 15;
const maxCountLikes = 200;
const minCountUsers = 1;
const maxCountUsers = 25;
const minCountComment = 0;
const maxCountComment = 30;
const minCountAvatar = 1;
const maxCountAvatar = 6;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createPhotoDescription = () => ({
  id: getRandomInteger(minCountUsers, maxCountUsers),
  url: `photos/${getRandomInteger(minCountUsers, maxCountUsers)}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(minCountLikes, maxCountLikes),
  comments: {
    id: getRandomInteger(minCountComment, maxCountComment),
    avatar: `img/avatar-'${getRandomInteger(minCountAvatar, maxCountAvatar)}'.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names),
  },
});

const getPhotos = Array.from({length: photoCount}, createPhotoDescription);
