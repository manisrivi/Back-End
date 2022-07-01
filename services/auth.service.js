const bcrypt = require("bcrypt");
const helper = require("../helpers/auth.helper");
const db = require("../shared/mongo");

const service = {
  async register(req, res) {
    try {
      // data validation
      const user = await helper.validateRegister(req.body);
      delete user.cPassword;
      res.send(user);

      // user exists validation
      const userExists = await helper.findByEmail(user.email);
      if (userExists)
        return res.status(400).send({ error: "User Already Exists" });

      //Generate Password Hash
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());

      // Insert User
      const { insertedId } = await helper.create(user);
      res.send({ message: "User registered", userId: insertedId });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      // data validation
      const user = await helper.validateLogin(req.body);

      // user exists validation
     const dbUser = await helper.findByEmail(user.email);
      if (!dbUser)
        return res.status(400).send({ error: "User Doesn't Exists" });

      // Password validation
      const isSame = await bcrypt.compare(user.password, dbUser.password);
        if (!isSame)
            return res.status(401).send({ error: "Password Mismatch"});
            res.send({ message: "User logged in", userId: dbUser._id });
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
  },
};

module.exports = service;
