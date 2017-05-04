const path = require('path');

const list = path.join(__dirname, '../../client/dist/BookList.html');
const config = path.join(__dirname, '../../client/dist/WikiConfig.html');

exports.register = (plugin, options, next) => {
  plugin.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        file: list
      }
    },
    {
      method: 'GET',
      path: '/config',
      handler: {
        file: config
      }
    },
    {
      method: 'GET',
      path: '/static/{file*}',
      handler: {
        directory: { 
          path: path.join(__dirname, '../../client/dist/static')
        }
      }
    }]);

  next();
};

exports.register.attributes = {
  name: 'home'
};
