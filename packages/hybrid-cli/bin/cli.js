#!/usr/bin/env node

const architected = require('architected');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const writeFile = util.promisify(fs.writeFile);

const config = {
  config: {
    name: 'hybrid-init'
  },
  input: {
    path: {
      message: 'The project folder',
      type: 'input',
      default: process.cwd(),
      forceCli: true
    },
    name: {
      message: 'What\'s your projects name',
      type: 'input',
      default: path.basename(process.cwd())
    }
  },
  commands: {
    init: {
      message: 'Create new hybrid project'
    }
  }
};

const error = (msg) => {
  msg = msg.split('\n');
  for (const m in msg) {
    console.error(chalk`{red \{ error \}} ${ msg[m] }`);
  }
};

architected(config).then((result) => {
  const { run, add, ctx } = result;

  if (ctx.init) {
    if (!fs.existsSync(ctx.path)) {
      add('create project directory', (ctx, task) => {
        mkdirp(ctx.path)
      });
    }

    add('check directory', () => {
      const ex = [];

      if (fs.existsSync(path.join(ctx.path, 'package.json'))) ex.push('package.json');
      if (fs.existsSync(path.join(ctx.path, 'hybrid.json'))) ex.push('hybrid.json');
      if (fs.existsSync(path.join(ctx.path, 'functions'))) ex.push('/functions');
      if (fs.existsSync(path.join(ctx.path, 'public'))) ex.push('/public');

      str = ex[0] || '';

      if (ex.length > 1) {
        for (let i = 1; i < (ex.length - 1); i++)
          str += `, ${ ex[i] }`;

        str += ` and ${ ex[ex.length -1] }`;
      }

      if (str !== '')
        throw new Error(`${ str } already exist${ ex.length > 1 ? '' : 's' }`);
    });

    add('create package.json', async () => {
      const pkg = { name: ctx.name, version: '1.0.0', scripts: { build: 'hybrid build', start: 'hybrid', dev: 'hybrid dev' }, license: 'MIT', dependencies: { hybrid: 'latest' } };

      return await writeFile(path.join(ctx.path, 'package.json'), JSON.stringify(pkg, null, 2));
    });

    add('create hybrid.json', async () => {
      const hybrid = ``;

      return await writeFile(path.join(ctx.path, 'hybrid.json'), hybrid);
    });

    add('create functions directory', () => {
      fs.mkdirSync(path.join(ctx.path, 'functions'));
    });

    add('create public directory', () => {
      fs.mkdirSync(path.join(ctx.path, 'public'));
    });

    add('npm install', async () => {
      const { stderr } = await exec('npm install', { cwd: ctx.path });

      if (stderr) {
        console.log(stderr);
      }
    });
  } else {
    error('No command\nUse `hybrid-cli --help` to get a list of all the commands');
  }

  run().catch((err) => {
    error(err.message);
  });
}).catch((err) => {
  error(err.message);
})
