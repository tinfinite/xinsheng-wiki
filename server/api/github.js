const path = require('path');
const Git = require('nodegit');
const shell = require("shelljs");

module.exports.payload = {
  handler: async (request, reply) => {
    try {
      const Repo = request.server.plugins['hapi-mongo-models'].Repo;
      const { payload } = request.payload;
      const push = JSON.parse(payload);
      const { html_url } = push.repository;
      const repo = await Repo.findByUrl(html_url);
      if (!repo) {
        throw new Error('Cannot found html_url');
      }
      
      const repoDir = path.join(__dirname, '..', 'repos', repo._id.toString());
      const out = path.join(repoDir, 'wiki');
      const repository = await Git.Repository.open(repoDir);

      await repository.fetchAll();
      await repository.mergeBranches('master', 'origin/master');

      shell.exec(`gitbook build ${repoDir} --out=${out}`);
      
      reply('ok');
    } catch (err) {
      console.log('=========', err);
      return reply();
    }
  }
};