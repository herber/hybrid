const ava = require('ava');
const middleware = require('../lib');

ava('runs middleware', t => {
  t.plan(7);

  const m = middleware();

  m.use((a, b, next) => {
    t.is(a, '1');
    t.is(b.a, '2');
    next();
  });

  m.use((a, b, next) => {
    t.is(a, '1');
    t.is(b.a, '2');
    b.b = '3';
    next();
  });

  m.run('1', { a: '2' }, (err, a, b) => {
    t.is(a, '1');
    t.is(b.a, '2');
    t.is(b.b, '3');
  });
});

ava('runs middleware with no callback', t => {
  t.plan(2);

  const m = middleware();

  m.use((a, next) => {
    t.is(a, '1');
    next();
  });

  m.use((a, next) => {
    t.is(a, '1');
    next();
  });

  m.run('1');
});

ava('runs middleware with multiple functions passed by m.use', t => {
  t.plan(7);

  const m = middleware();

  m.use(
    (a, next) => {
      t.is(a, '1');
      next();
    },
    (a, next) => {
      t.is(a, '1');
      next();
    },
    (a, next) => {
      t.is(a, '1');
      next();
    }
  );

  m.use((a, next) => {
    t.is(a, '1');
    next();
  });

  m.use(
    (a, next) => {
      t.is(a, '1');
      next();
    },
    (a, next) => {
      t.is(a, '1');
      next();
    }
  );

  m.run('1', (err, a) => {
    t.is(a, '1');
  });
});

ava('runs middleware with error', t => {
  t.plan(4);

  const m = middleware();

  m.use((a, next) => {
    t.is(a, '1');
    next();
  });

  m.use((a, next) => {
    t.is(a, '1');
    next(new Error('We are going to die.'));
  });

  m.use((a, next) => {
    t.fail();
    next();
  });

  m.run('1', (err, a) => {
    t.true(err instanceof Error);
    t.is(a, '1');
  });
});
