const path = require('path');

const index = path.join(__dirname, '../client/dist/index.html');

exports.register = (plugin, options, next) => {
  plugin.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        file: index
      }
    },
    {
      method: 'GET',
      path: '/static/{file*}',
      handler: {
        directory: { 
          path: './client/dist/static'
        }
      }
    }]);

  next();
};

exports.register.attributes = {
  name: 'static'
};
