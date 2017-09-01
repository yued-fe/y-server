'use strict';

const path = require('path');

const nodemon = require('nodemon');

const argv = require('./argv.js');
const config = require('./config.js');

const abs = file => path.join(__dirname, file);

let watchFiles = [config.__filename];

if (Array.isArray(config.watch)) {
  watchFiles = watchFiles.concat(config.watch);
} else if (typeof config.watch === 'string') {
  watchFiles.push(config.watch);
}

const server = nodemon({
  script: abs('./cli.js'),
  watch: watchFiles,
  ext: 'js html',
  env: {
    argv: argv.__string,
  },
  legacyWatch: true, // 防止监听文件触发多次启动
  delay: 250, // 延迟 250ms 重启
}).on('restart', (changedFiles) => {
  console.log('');
  if (Array.isArray(changedFiles)) {
    changedFiles.forEach(file => console.log('[文件变动]'.red, `"${file}"`));
  }
});

process.once('exit', () => server.emit('exit'));
process.once('SIGINT', () => process.exit(0));
