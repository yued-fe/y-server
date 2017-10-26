require('colors');

const path = require('path');

const express = require('express');

const run = require('./cli/run.js');

function yServer(options) {
  if (!options) {
    options = {};
  }

  const plugins = options.plugins;
  const port = options.port || 10024;

  const app = express();

  app.set('port', port);

  if (Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      if (plugin.$name) {
        const pluginOptions = Object.assign({}, plugin);
        delete pluginOptions.$name;

        try {
          plugin = require(`y-server-plugin-${plugin.$name}`)(pluginOptions);
        } catch (ex) {
          console.log(`[使用插件出错],插件名: "y-server-plugin-${plugin.$name}"`.red);
        }
      }
      if (typeof plugin === 'function') {
        plugin(app);
      }
    });
  }

  app.server = app.listen(port, () => {
    console.log(`[服务器启动],端口: ${port}`.green);
    console.log('');
  });

  return app;
}

yServer.run = (config) => {
  config = path.resolve(config);
  return run(`y-server --config ${config} --hot`);
};

exports = module.exports = yServer;
