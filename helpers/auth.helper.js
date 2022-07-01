const Joi = require("joi");
const db = require("../shared/mongo");
const ObjectId = require("mongodb").ObjectId;


const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(15).required(),
    cPassword: Joi.ref("password"),
});

const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(15).required(),
});

const helper = {
    validateRegister(user){
        try {
            return registerSchema.validateAsync(user);
        } catch ({ details: [{ message }]}) {
            throw new Error(message);
        }
    },

    validateLogin(user){
        try {
            return LoginSchema.validateAsync(user);
        } catch ({ details: [{ message }]}) {
            throw new Error(message);
        }
    },

     findByEmail(email){
        return db.users.findOne({ email });
    },

     findById(_id){
        return db.users.findOne({ _id: ObjectId(_id)});
     },

     create(user){
        return db.users.insertOne(user);
    },

}

module.exports = helper;
