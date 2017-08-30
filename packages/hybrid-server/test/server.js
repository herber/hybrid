const ava = require('ava');
const fetch = require('node-fetch');
const server = require('../lib/index.js');

ava('listens to requests / parses routes', (t) => {
  const port = Math.floor(Math.random() * 60000 + 1025);
  const s = server();

  t.plan(8);

  s.use('/test/route/:id/:id2/end', (req, res, next) => {
    t.is(req.params.id, 'id-1-str');
    t.is(req.params.id2, 'id-2-str');

    res.end('middleware 1');

    next();
  }, () => { t.true(true); });

  s.use((req, res, next) => {
    t.true(true);

    res.end('middleware 2');

    next();
  }, () => { t.true(true); });

  s.listen(port, () => {
    t.true(true);
  });

  return fetch(`http://localhost:${ port }`).then(function(res) {
    return res.text();
  }).then(function(text) {
    t.is(text, 'middleware 2');
  }).then(() => {
    return fetch(`http://localhost:${ port }/test/route/id-1-str/id-2-str/end`).then(function(res) {
        return res.text();
    }).then(function(text) {
        t.is(text, 'middleware 1');
    });
  });
});
