# hybrid-middleware [![Codestyle fyi](https://img.shields.io/badge/code%20style-fyi-E91E63.svg)](https://github.com/tobihrbr/fyi) [![Package hybrid](https://img.shields.io/badge/package-hybrid-69F0AE.svg)](https://github.com/tobihrbr/hybrid)

> A simple middleware function for hybrid.<br/>
> This has **nothing** to do with http! But you can use it for a http server.

## Installation

```bash
npm install --save hybrid-middleware
```

## Usage

```js
const middleware = require('hybrid-middleware');

const m = middleware();

m.use((arg1, arg2, next) => {
  arg2.res = arg1.a + arg1.b;
  next();
});

m.use((arg1, arg2, next) => {
  try {
    const json = JSON.stringify(arg2);
    console.log(json);
  } catch(err) {
    return next(err);
  }

  next();
});

m.run({ a: 2, b: 5 }, { res: '' }, (err, arg1, arg2) => {
  if (err) throw err;

  console.log(arg2.res);
  // => 7
});
```

## Api

### middleware()

Create a new middleware instance.

#### .use(...functions)

Add middleware functions

Example:

```js
...
// Three functions
m.use((next) => {
  // 1
  next();
}, (next) => {
  // 2
  next();
}, (next) => {
  // 3
  next();
})

// One function
m.use((next) => {
  // 1
  next();
})
...
```

#### .run(...args[, final])

Execute registered functions.

##### args

Arguments that should be passed to functions.

##### final

The final function that will be called after all middleware functions are executed.

The first argument will always be an error, the arguments after are the arguments you passed to `.run`.

Example:

```js
...
run(arg1, arg2, arg3, (err, arg1, arg2, arg3) => {
  if (err) // handle it
})
...
```

## License

MIT © [Tobias Herber](https://tobihrbr.com)
