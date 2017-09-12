const chalk = require('chalk');
const toLen = require('./toLen.js');

module.exports = (list) => {
  let maxlen = 0;

  for (const l in list) {
    if (list[l].key.length > maxlen)
      maxlen = list[l].key.length;
  }

  maxlen += 2;

  for (const l in list) {
    console.log(`  {dim ${ toLen(list[l].key, maxlen) }}  ${ list[l].value }`);
  }
};
