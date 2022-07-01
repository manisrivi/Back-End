// Folder pathway
const helper = require("../helpers/user.helper");

const service = {

   async getAllUsers(req, res){
        try {
            const data = await helper.find();
            res.send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Users" });
        }
    },

  async getUsersById(req, res){
        try {
            const data = await helper.findById(req.params.id);
            res.send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Users" });
        }
    }

}

module.exports = service;