const Joi = require('joi');
const MongoModels = require('mongo-models');

class Repo extends MongoModels {
  static create(url, author) {
    return new Promise((resolve, reject) => {
      const doc = {
        author,
        url,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      };

      this.insertOne(doc, (err, docs) => {
        if (err) {
          return reject(err);
        }
        return resolve(docs[0]);
      });
    });
  }

  static updateById(id, doc) {
    return new Promise((resolve, reject) => {
      this.findByIdAndUpdate(id, doc, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
  
  static findByUrl(url, cb) {
    return new Promise((resolve, reject) => {
      const query = { url };
      this.findOne(query, (err, doc) => {
        if (err) {
          return reject(err);
        }
        return resolve(doc);
      });
    });
  }
}

Repo.collection = 'repos';

Repo.schema = Joi.object().keys({
  _id: Joi.object(),
  url: Joi.string().required(),
  status: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date()
});

Repo.indexes = [
  { key: { 'url': 1 }, unique: true }
];


module.exports = Repo;
