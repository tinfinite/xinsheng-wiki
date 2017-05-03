exports.register = (plugin, options, next) => {
  plugin.route([
    {
      method: 'GET',
      path: '/{dir*}',
      handler: {
        directory: {
          path: 'client/dist/'
        }
      }
    }
    // { method: 'GET', path: '/{path*}', config: Home.notFound }
  ]);

  next();
};

exports.register.attributes = {
  name: 'root'
};
