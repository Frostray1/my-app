let initialized = false;

function initialize() {
  if (!initialized) {
    console.log('Library "to-upper-case-mini-js-library" has been initialized');
    initialized = true;
  }
}

function toUpperCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  console.log('Function "toUpperCase" has been called');
  return str.toUpperCase();
}

initialize();

const mylibrary = {
  toUpperCase,
};

const myObject = {
  name: () => {
    console.log(123);
    return 'my_name';
  },
  status: 'finish',
};

const additionalLibrary = {
  toLowerCase: (str) => {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    console.log('Function "toLowerCase" has been called');
    return str.toLowerCase();
  },
};

const utilityLibrary = {
  reverseString: (str) => {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    console.log('Function "reverseString" has been called');
    return str.split('').reverse().join('');
  },
};

// Использование exports для экспорта нескольких объектов
exports.mylibrary = mylibrary;
exports.myObject = myObject;
exports.additionalLibrary = additionalLibrary;
exports.utilityLibrary = utilityLibrary;
