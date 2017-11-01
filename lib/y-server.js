require('colors');

const path = require('path');

const express = require('express');
const requireRelative = require('require-relative');

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
        const pluginName = `y-server-plugin-${plugin.$name}`;
        const pluginOptions = Object.assign({}, plugin);
        delete pluginOptions.$name;

        try {
          // 使用 process.cwd() 下的 require, 避免 y-server 和插件不在同一 node_modules 带来的问题
          plugin = requireRelative(pluginName)(pluginOptions);
        } catch (ex) {
          console.log('[y-server]'.gray, `使用插件 "${pluginName}" 出错，${ex}`.red);
        }
      }
      if (typeof plugin === 'function') {
        plugin(app);
      }
    });
  }

  app.server = app.listen(port, () => {
    console.log('[y-server]'.gray, `服务器启动，端口：${port}`.green);
    console.log('');
  });

  return app;
}

yServer.run = (config) => {
  config = path.resolve(config);
  return run(`y-server --config ${config} --hot`);
};

exports = module.exports = yServer;
