// Builtin
const http = require('http');
const url = require('url');

// Packages
const routeParser = require('route-parser');
const hybridMiddleware = require('hybrid-middleware');

module.exports = () => {
  const middleware = hybridMiddleware();

  const use = (path, ...fns) => {
    if (typeof path === 'function') return middleware.use(path, ...fns);

    const route = new routeParser(path);

    for (const fn in fns) {
      middleware.use((req, res, next) => {
        const match = route.match(url.parse(req.url).pathname);

        if (match !== false) {
          req.params = match;
          fns[fn](req, res, next);
        } else {
          next();
        }
      });
    }
  };

  const server = http.createServer((req, res) => {
    req.params = {};
    middleware.run(req, res);
  });

  return Object.assign(server, { use });
};
