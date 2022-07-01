const routes ={
    authRoutes: require("./auth.route"),
    usersRoutes : require("../routes/users.route"),
    postsRoutes : require("../routes/posts.route"),
    commentsRoutes : require("../routes/comments.route")
};

module.exports = routes;