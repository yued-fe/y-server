'use strict';

module.exports = {
  plugins: [
    function (app) {
      console.log('plugin installed'); // eslint-disable-line no-console

      app.use((req, res, next) => {
        console.log('plugin valid'); // eslint-disable-line no-console
        res.end();
      });
    },
  ],
};
