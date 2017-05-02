const path = require('path');
const Git = require('nodegit');

module.exports.payload = {
  handler: (request, reply) => {
    try {
      process.nextTick(async () => {
        try {

        const Repo = request.server.plugins['hapi-mongo-models'].Repo;
        const { payload } = request.payload;
        const push = JSON.parse(payload);
        const { html_url } = push.repository;
        console.log(push.repository);
        const repo = await Repo.findByUrl(html_url);
        if (!repo) {
          throw new Error('Cannot found html_url');
        }
        
        const repoDir = path.join(__dirname, '..', 'repos', repo._id.toString());
        const repository = await Git.Repository.open(repoDir);

        await repository.fetchAll();
        await repository.mergeBranches('master', 'origin/master');

        const configFile = path.join(repoDir, 'config.json');
        repo.config = require(configFile);
        Repo.updateById(repo._id, repo);
        } catch (e) {
          console.log('=========', e);
        }

      })
      
      reply('ok');
    } catch (err) {
      console.log('=========', err);
      return reply();
    }
  }
};
