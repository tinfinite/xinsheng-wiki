const admin = require('../.admin');
const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/secret');
const Joi = require('joi');
const Git = require("nodegit");
const path = require('path');
const shell = require("shelljs");

module.exports.login = {
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const { username, password } = request.payload;
    if (username === admin.username && hash.verify(password, admin.password)) {
      const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY);
      return reply({ statusCode: 1, result: token });
    }
    return reply({ statusCode: 0, message: 'who are you' });
  }
};


module.exports.add = {
  auth: 'jwt',
  validate: {
    payload: {
      url: Joi.string().required(),
      author: Joi.string().required()
    }
  },
  handler: async (request, reply) => {
    try {
      const Repo = request.server.plugins['hapi-mongo-models'].Repo;      
      const { url, author } = request.payload;      
      const repo = await Repo.create(url, author);
      
      const dir = path.join(__dirname, '..', 'repos', repo._id.toString());
      
      await Git.Clone(repo.url, dir, {
        fetchOpts: {
          callbacks: {
            certificateCheck: function() {
              // github will fail cert check on some OSX machines
              // this overrides that check
              return 1;
            }
          }
        }
      });

      const configFile = path.join(dir, 'config.json');
      repo.config = require(configFile);
      await Repo.updateById(repo._id, repo);

      process.nextTick(() => {
        shell.exec(`cp ${__dirname}/book.json ${dir}`);
        shell.exec(`cp ${__dirname}/website.css ${dir}`);      
        shell.exec(`gitbook build ${dir}`);
      });
      
      return reply(repo);
    } catch (err) {
      console.log('=======', err);
      return reply({ statusCode: 400, message: 'Add repo failed' });
    }
  }
};
