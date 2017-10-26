module.exports = {
  plugins: [
    {
      $name: 'static',
      staticPaths: __dirname,
    },
    function (app) {
      console.log('plugin installed'); // eslint-disable-line no-console

      app.get('/', (req, res, next) => {
        res.send('plugin valid');
      });
    },
  ],
};
