const router = require("express").Router();
const req = require("express/lib/request");
const Post = require("../models/post");
const User = require("../models/user");

//Create a post

router.post("/", async (req,res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
        
    } catch (err) {
        res.status(500).json(err)
        
    }
});

//Update a post

router.put("/:id", async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){ //Check if post belong to user trying to update it
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated!");

        } else {
        res.status(403).json("You can only update your own post!");
        }
    } catch(err){
        res.status(500).json(err);

    }
});

//Delete a post

router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){ //Check if post belong to user trying to update it
            await post.deleteOne();
            res.status(200).json("The post has been deleted!");

        } else {
        res.status(403).json("You can only delete your own post!");
        }
    } catch(err){
        res.status(500).json(err);

    }
});

//Like / dislike a post

router.put("/:id/like", async (req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){ //If the user does not exist in the likes column for this particular post
            await post.updateOne({ $push: {likes: req.body.userId } });
            res.status(200).json("The post has been liked!")
        } else {
            await post.updateOne({ $pull: {likes: req.body.userId } });
            res.status(200).json("The post has been disliked!")
        }
    } catch (err) {
        res.status(500).json(err);
        
    }
});

//Get a post

router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
        
    }
});

//Get all posts of users subscriptions (timeline)

router.get("/timeline/:userId", async (req,res) => {

    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const subbedPosts = await Promise.all(
            currentUser.subscriptions.map((subbedId) => {
                return Post.find({ userId: subbedId });
            })
        );
        res.status(200).json(userPosts.concat(... subbedPosts))
    } catch(err)  {
        res.status(500).json(err);
    }
});

//Get creator's all posts

router.get("/profile/:username", async (req,res) => {

    try {
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch(err)  {
        res.status(500).json(err);
    }
});

module.exports = router; 