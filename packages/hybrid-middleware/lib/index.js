module.exports = () => {
  const fns = [];

  const use = (...fn) => {
    fns.push(...fn);
  };

  const run = (...args) => {
    let i = 0;
    let cb = () => null;

    if (typeof args[args.length - 1] === 'function') {
      cb = args[args.length - 1];
      args.splice(-1, 1);
    }

    const next = err => {
      if (err) return cb(err, ...args);

      if (i < fns.length) {
        fns[i++](...args, next);
      } else {
        cb(err || null, ...args);
      }
    };

    next();
  };

  return {
    use,
    run
  };
};
