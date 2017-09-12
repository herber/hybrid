const boxen = require('boxen');
const chalk = require('chalk');

module.exports = (name, more) => {
  console.log(boxen(chalk`{green ${ name }}\n\n${more}`, { padding: 1, margin: 2, borderColor: 'green' }));
};
