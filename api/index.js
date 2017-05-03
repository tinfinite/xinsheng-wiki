const admin = require('./admin');
const github = require('./github');
const wiki = require('./wiki');

exports.register = (plugin, options, next) => {
  plugin.route([
    {
      method: 'POST',
      path: '/login',
      config: admin.login
    },
    {
      method: 'POST',
      path: '/add',
      config: admin.add
    },
    {
      method: 'POST',
      path: '/payload',
      config: github.payload
    },
    {
      method: 'GET',
      path: '/wiki',
      config: wiki.list
    },
    {
      method: 'GET',
      path: '/repos/{dir*}',
      handler: {
        directory: { 
          path: 'repos/'
        }
      }
    }
    // { method: 'GET', path: '/{path*}', config: Home.notFound }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
