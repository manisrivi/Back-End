// Express router
const router = require("express").Router();

// Folder Pathway
const service = require("../services/posts.service");


router.get("/", service.getAllPosts);

router.get("/:id", service.getPostById);

router.get("/:id/comments", service.getCommentsPostById);

router.post("/", service.createPost);

router.put("/:id", service.updatePost);

router.delete("/:id", service.deletePost);


module.exports = router;