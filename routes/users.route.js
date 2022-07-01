// Express router
const router = require("express").Router();

// Folder pathway
const service = require("../services/users.service");


router.get("/", service.getAllUsers);

router.get("/:id", service.getUsersById);

module.exports = router;