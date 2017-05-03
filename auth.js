const hash = require('password-hash');

const SECRET_KEY = require('./config/secret');
const admin = require('./.admin');

exports.register = (plugin, options, next) => {
  plugin.auth.strategy('jwt', 'jwt', {
    key: SECRET_KEY,
    verifyOptions: {
      algorithms: ['HS256']
    },

    validateFunc: (decoded, request, cb) => {
      if (admin.id === decoded.id) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    }
  });

  //plugin.auth.default('jwt');

  next();
};

exports.register.attributes = {
  name: 'auth'
};
