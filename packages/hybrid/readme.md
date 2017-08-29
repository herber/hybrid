# hybrid

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
