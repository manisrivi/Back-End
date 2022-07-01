// Folder pathway
const helper =  require("../helpers/post.helper");
const userHelper =  require("../helpers/user.helper"); 

const service = {

   async getAllPosts(req, res) {
    try {
        const data = await helper.find();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: "Cannot Fetch All Posts" });
    }
    },

   async getPostById(req, res){
    try {
        const data = await helper.findById(req.params.id);
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: "Cannot Fetch All Posts" });
    }
    },

   async getCommentsPostById(req, res){  
    try {
        const data = await db.comments.find({ post_id: ObjectId(req.params.id) }).toArray();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: `Cannot Fetch All Posts -  ${req.params.id}` });
    }    
    },

   async createPost(req, res){
        try {
        // data validation    
        const post = await helper.validate(req.body);

        // user validation
        const user =  await userHelper.findById(post.userId);
        if (!user) return res.status(400).send({ error: "User Invalid" });

        // Insert Data
        const { insertedId: _id } = await helper.create(post);

        res.send({ _id, ...post });
        } catch (error) {
            res.status(500).send({error: error.message});
        }   
    },

    async updatePost(req, res){
        try {
        // data validation
        const newpost = await helper.validate(req.body);
        // Posts validation
        const oldPost = await helper.findById(req.params.id);
        if(!oldPost) return res.status(400).send({ error: "Post Invalid"});
        // user validation
        const user =  await userHelper.findById(newpost.userId);
        if (!user) return res.status(400).send({ error: "User Invalid" });
        // Update data
        const updatedData = await helper.update({ _id: oldPost._id, ...newpost });

        res.send(updatedData);
        } catch (error) {
            
        }
    },

   async deletePost(req, res){
        try {
            // Posts validation
            const post = await helper.findById(req.params.id);
            if(!post) return res.status(400).send({ error: "Post Invalid"});
            //  Delete data
            await helper.deleteById(post._id);

            res.end();
            } catch (error) {
                res.status(500).send({ error: error.message});
            }
    }

}

module.exports = service;