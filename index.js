// import dotenv
const { config } = require("dotenv");

// import express
const express = require("express");

// Folder pathway
const mongo = require("./shared/mongo");
const routes = require("./routes/index");
const middleware = require("./shared/middleware");


// port
const app = express();
config();

(async () => {
    try {
        await mongo.connect();

        // middleware
        app.use(express.json());
        app.use(middleware.logging);
        app.use(middleware.maintenance);
        console.log("Middleware Initiallized");
      
        // routes
        app.get("/", (req, res) => res.send("Welcome To API World"));
        app.use("/users", routes.usersRoutes);
        app.use("/posts", routes.postsRoutes);
        app.use("/comments", routes.commentsRoutes);
        console.log("Routes Initiallized");
      
        // Running Port
        app.listen(process.env.PORT, () => console.log(`SERVER LISTENING AT PORT ${process.env.PORT}`));
    } catch (error) {
        console.log("Error Starting Application - ", error.message);
    }
 
})();
