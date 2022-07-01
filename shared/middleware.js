const IsMaintenance = false;

const middleware = {

    logging(req, res, next){
        console.log(`${new Date()} - ${req.method} - ${req.url}`);
        next();
    },

    maintenance(req, res, next){
        IsMaintenance ? res.send({message: "Site Under Maintenance"}) : next();
    }

}

module.exports = middleware;