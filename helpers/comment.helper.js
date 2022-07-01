const ObjectId = require("mongodb").ObjectId;
const db = require("../shared/mongo");

const helper = {

    find(){
        return db.comments.find().toArray();
    },

    findById(){
        return db.comments.findOone({ _id: ObjectId(_id) });
    },
};

module.exports = helper;