const { MongoClient } = require("mongodb");

const mongo = {

    db: null,
    comments: null,
    posts: null,
    users: null,

    async connect() {
        const client = new MongoClient(process.env.MONGO_DB_URL);
        await client.connect();
        console.log(`Mongo Connected Successfully - ${process.env.MONGO_DB_URL}`);

        this.db = await client.db(process.env.MONGO_DB_NAME);
        console.log(`DB Selected - ${process.env.MONGO_DB_NAME}`);

        this.comments =  this.db.collection("comments");
        this.posts =  this.db.collection("posts");
        this.users =  this.db.collection("users");
        console.log(`Collection Initiallized`);
    },
};

module.exports = mongo;