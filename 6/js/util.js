const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomId = () => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandomInteger, createRandomId, isEscapeKey};

