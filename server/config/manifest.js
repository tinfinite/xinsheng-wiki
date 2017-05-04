const envKey = (key) => {
  const env = process.env.NODE_ENV || 'development';

  const configuration = {
    development: {
      host: 'localhost',
      port: 8000,
      mongo: 'mongodb://localhost:27017/wiki'
    },
    uat: {
      host: 'localhost',
      port: 8010,
      mongo: 'mongodb://localhost:27017/wiki'
    },
    production: {
      host: process.env.HOST,
      port: process.env.PORT,
      mongo: 'mongodb://localhost:27017/wiki'
    }
  };

  return configuration[env][key];
};

const manifest = {
  connections: [
    {
      host: envKey('host'),
      port: envKey('port'),
      routes: {
        cors: true
      },
      router: {
        stripTrailingSlash: true
      }
    }
  ],
  registrations: [
    {
      plugin: 'hapi-auth-jwt2'
    },
    {
      plugin: './auth'
    },
    {
      plugin: 'inert'
    },
    {
      plugin: './api',
      options: { routes: { prefix: '/api' } }
    },
    {
      plugin: './home'
    },
    {
      plugin: {
        register: 'hapi-mongo-models',
        options: {
          mongodb: {
            uri: envKey('mongo'),
            options: {}
          },
          autoIndex: false,
          models: {
            Repo: './server/models/repo'
          }
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ error: '*' }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    }
  ]
};

module.exports = manifest;
