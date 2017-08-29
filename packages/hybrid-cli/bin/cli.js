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
  console.error(chalk`{red { error }} ${ msg }`);
};

architected(config).then((result) => {
  const { run, add, ctx } = result;

  if (ctx) {
    if (!fs.existsSync(ctx.path)) {
      add('create project directory', (ctx, task) => {
        mkdirp(ctx.path)
      });
    }

    add('create package.json', async () => {
      const pkg = ``;

      return await writeFile(path.join(ctx.path, 'package.json'), pkg);
    });

    add('create hybrid.json', async () => {
      const hybrid = ``;

      return await writeFile(path.join(ctx.path, 'hybrid.json'), hybrid);
    });

    add('create functions directory', () => {
      fs.mkdirSync(path.join(ctx.path, 'functions'));
    });

    add('create functions directory', () => {
      fs.mkdirSync(path.join(ctx.path, 'functions'));
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
