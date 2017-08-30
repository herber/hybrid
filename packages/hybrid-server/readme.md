# hybrid-server [![Codestyle fyi](https://img.shields.io/badge/code%20style-fyi-E91E63.svg)](https://github.com/tobihrbr/fyi) [![Package hybrid](https://img.shields.io/badge/package-hybrid-69F0AE.svg)](https://github.com/tobihrbr/hybrid)

> A simple middleware based http server for hybrid

## Installation

```bash
npm install --save hybrid-server
```

## Usage

```js
const server = require('hybrid-server')();

// Executed for every request
server.use((req, res, next) => {
  // do stuff
  next();
});

// Only executes for a specific route
server.use('/route/:param/more/:params', (req, res, next) => {
  // :* is a placeholder.
  // the value is stored in req.params.*
  console.log(req.params.param);
  console.log(req.params.params);

  next();
});

server.listen(3000);
```

## License

MIT © [Tobias Herber](https://tobihrbr.com)
