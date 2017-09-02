const ava = require('ava');
const { join } = require('path');
const answer = require('the-answer');
const bundle = require('../lib/index.js');

const functions = [
  {
    entry: join(__dirname, 'helpers/functions/more/hyper-fun.js'),
    shouldReturn: 'hyper'
  },
  {
    entry: join(__dirname, 'helpers/functions/answer-fun.js'),
    shouldReturn: answer // it's 42 (https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy)
  }
];

for (const func in functions) {
  const fun = functions[func];

  ava('Builds function ' + func, t => {
    const dest = join(__dirname, 'helpers/functions-export/');

    return bundle(fun.entry, dest)
      .then(stats => {
        if (stats.warning !== undefined) {
          t.fail(stats.warning.message);
        }

        // eslint-disable-next-line global-require
        const fn = require(stats.dest);

        t.is(fn(), fun.shouldReturn);
      })
      .catch(err => {
        t.fail(err);
      });
  });
}

ava('Builds function 2', t => {
  const entry = join(__dirname, 'helpers/functions/more/super-fun.js');
  const dest = join(__dirname, 'helpers/functions-export/');

  return bundle(entry, dest)
    .then(stats => {
      if (stats.warning !== undefined) {
        t.fail(stats.warning.message);
      }

      // eslint-disable-next-line global-require
      const fn = require(stats.dest);

      fn().then(r => {
        t.is(r, 'super');
      });
    })
    .catch(err => {
      t.fail(err);
    });
});

ava('Warns for NON_EXISTENT_EXPORT', t => {
  const entry = join(__dirname, 'helpers/functions/err/NON_EXISTENT_EXPORT.js');
  const dest = join(__dirname, 'helpers/functions-export/');

  return bundle(entry, dest)
    .then(stats => {
      if (stats.warning !== undefined) {
        if (stats.warning.message.indexOf('nothing') !== -1) {
          t.true(true);
        } else {
          t.fail();
        }
      }

      // eslint-disable-next-line global-require
      const fn = require(stats.dest);

      fn().then(r => {
        t.is(r, 'super');
      });
    })
    .catch(err => {
      t.is(err.code, 'MODULE_NOT_FOUND');
    });
});
