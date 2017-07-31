'use strict';
require('colors');

const path = require('path');

const express = require('express');

const run = require('./cli/run.js');

function yServer(options) {
  if (!options) {
    options = {};
  }

  const setup = options.setup;
  const plugins = options.plugins;
  const port = options.port || 10024;

  const app = express();

  if (typeof setup === 'function') {
    setup(app);
  }

  if (Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      if (typeof plugin === 'function') {
        plugin(app);
      }
    });
  }

  app.listen(port, () => {
    console.log(`[服务器启动],端口: ${port}`.green); // eslint-disable-line no-console
  });

  return app;
}

yServer.run = (config) => {
  config = path.resolve(config);
  return run(`y-server --config ${config} --hot`);
};

exports = module.exports = yServer;
