const ObjectId = require("mongodb").ObjectId;

const Joi = require("joi");

const db = require("../shared/mongo");

const schema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const helper = {
  validate(post) {
    try {
      return schema.validateAsync(post);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },

  find() {
    return db.posts.find().toArray();
  },

  findById(_id) {
    return db.posts.findOne({ _id: ObjectId(_id) });
  },

  create(post) {
    return db.posts.insertOne(post);
  },

  update({ _id, ...post }) {
    return db.posts.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: post },
      { returnDocument: "after" }
    );
  },

  deleteById(_id) {
    return db.posts.deleteOne({ _id: ObjectId(_id) });
  },
};

module.exports = helper;
