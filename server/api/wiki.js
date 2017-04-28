module.exports.list = {
  handler: (request, reply) => {
    const Repo = request.server.plugins['hapi-mongo-models'].Repo;
    Repo.find({}, (err, repos) => {
      if (err) {
        console.log(err);
        return reply({ statusCode: 200, result: [] });
      }
      return reply({ statusCode: 200, result: repos });
    });
  }
};
