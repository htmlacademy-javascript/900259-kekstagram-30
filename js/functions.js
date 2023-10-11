
const checkStringLength = (string, maxLength) => {
  const result = string.length <= maxLength;
  return result;
};


const checkString = (palindrom) => {
  const normalazeString = palindrom.toLowerCase().replaceAll(' ','');
  let newStringReverse = '';
  for (let i = normalazeString.length - 1; i >= 0; i--) {
    newStringReverse += normalazeString[i];
  }
  const result = normalazeString === newStringReverse;
  return result;
};


const makeNumber = (string) => {
  const exactString = string.toString();
  let newNumber = '';

  for (let i = 0; i < exactString.length; i++) {
    if (!Number.isNaN(parseInt(exactString[i], 10))) {
      newNumber += exactString[i];
    }
  }
  return parseInt(newNumber, 10);
};

