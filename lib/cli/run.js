const path = require('path');
const spawn = require('child_process').spawn;

const abs = file => path.join(__dirname, file);

const bins = {
  'y-server': abs('./index'),
};

module.exports = (script) => {
  const args = script.split(' ').map(arg => bins[arg] || arg);
  const child = spawn('node', args, { stdio: 'inherit' });

  process.once('SIGINT', () => process.exit(0));
  process.once('exit', () => child.kill());
};
