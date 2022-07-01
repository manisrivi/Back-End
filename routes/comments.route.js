const router = require("express").Router();

const service = require("../services/comments.service");

router.get("/",  service.getAllComments);

router.get("/:id", service.getCommentsById);

module.exports = router;