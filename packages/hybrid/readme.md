# hybrid [![Codestyle fyi](https://img.shields.io/badge/code%20style-fyi-E91E63.svg)](https://github.com/tobihrbr/fyi) [![Package hybrid](https://img.shields.io/badge/package-hybrid-69F0AE.svg)](https://github.com/tobihrbr/hybrid)

> A new type of webserver

## Setup

```bash
npm install --global hybrid-cli
```

In your project's directory

```bash
hybrid-cli init
```

## Usage

### File structure

Hybrid init will set up two directories: `functions` and `static`. The microservices will live in `/functions` and all your static assets will be in `/static`.

Hybrid's configuration is in `hybrid.json`.

```
/
  package.json
  hybrid.json
  /functions
    signup.js
    login.js
    logout.js
    dashboard.js
  /static
    index.html
    404.html
    signup.html
    login.html
    dashboard.html
    /assets
      ...
```

### functions

Functions must export a function. This function gets called by hybrid when it is requested. The function should have two arguments: `req` and `res`(request and response).

Example:

```js
module.exports = (req, res) => {
  res.json({ body: 'hi!' });
};
```

### Static assets

Rewrites for static assets can be configured in `hybrid.json`.

## License

MIT © [Tobias Herber](https://tobihrbr.com)
