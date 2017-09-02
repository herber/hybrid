# hybrid-build [![Codestyle fyi](https://img.shields.io/badge/code%20style-fyi-E91E63.svg)](https://github.com/tobihrbr/fyi) [![Package hybrid](https://img.shields.io/badge/package-hybrid-69F0AE.svg)](https://github.com/tobihrbr/hybrid)

> The part of hybrid that builds things

## Installation

```bash
npm install --save hybrid-build
```

## Usage

```js
const build = require('hybrid-build');

build('entry.js', 'output-dir').then((stats) => {
  // Get destination file
  console.log(stats.dest);

  // Handel warnings
  if (stats.warning !== undefined) {
    console.error(stats.warning.message);
  }
})
```

## Api

build(entry, dest)

### entry

Type: `string`

The file you want to build

### dest

Type: `string`

The output directory. `hybrid-build` will put the output file in there.

## License

MIT © [Tobias Herber](https://tobihrbr.com)
