const boxen = require('boxen');
const chalk = require('chalk');

module.exports = (name, more) => {
  return boxen(chalk`{green ${ name }}\n\n${more}`, { padding: 1, margin: 2, borderColor: 'green' });
};
