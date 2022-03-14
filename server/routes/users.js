const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id){
        if(req.body.password){ //Update user password
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated!");
        } catch(err){
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("You can update only your account!");
    }
});

//Delete user
router.delete("/:id", async (req,res)=>{
    if(req.body.userId == req.params.id){

        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted!");
        } catch(err){
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("You can delete only your account!");
    }
});

//Get a user with username
router.get("/:username", async (req,res)=> {

    try {
        const user = await User.findOne({username:req.params.username});
        const {password, ...other} = user._doc; //Hide the password in the response 
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get a user with user id
router.get("/id/:id", async (req,res)=> {

    try {
        const user = await User.findById(req.params.id);
        const {password, ...other} = user._doc; //Hide the password in the response 
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//TODO: Implement logic to add a time stamp to when user has subscribed to another user, change model to store time stamp as well
//Subscribe to a user
router.put("/:id/subscribe", async (req,res)=>{
    if(req.body.userId !== req.params.id){ //Check to see if logged in user (currentUser) is on their own page (Cannot subscribe to themselves)
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            const date = new Date().toLocaleDateString();
            const subscriptionString = req.params.id + '-' + date;

            if(!user.subscribers.includes(req.body.userId)){ //Check to see if user is already subscribed to this user
                await user.updateOne({$push:{subscribers:req.body.userId}}); //Update creators subscribers (currentUsers ID added)
                await currentUser.updateOne({$push:{subscriptionsWithTimeStamp: subscriptionString}}); //Update users subscriptions with Time Stamp
                await currentUser.updateOne({$push:{subscriptions : req.params.id}}); // Update users subscriptions without Time Stamp
                //await currentUser.updateOne({$push:{subscriptions: date}}); //Update time of when user has subscribed
                res.status(200).json("Succesfully subscribed to user!");

            } else{
                res.status(403).json("You are already subscribed to this creator!")
            }
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("Cannot subscribe to yourself!");
    }
});

//Get subscriptions
router.get("/subscriptions/:userId", async (req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const subscriptions = await Promise.all(
            user.subscriptions.map(subscriptionId=>{
                return User.findById(subscriptionId)
            })
        )
        let subscriptionList = [];
        subscriptions.map(subscription=>{
            const {_id,username,profilePicture} = subscription;
            subscriptionList.push({_id, username, profilePicture});
        });
        res.status(200).json(subscriptionList)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get subscribers
router.get("/subscribers/:userId", async (req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const subscribers = await Promise.all(
            user.subscribers.map(subscriberId=>{
                return User.findById(subscriberId)
            })
        )
        let subscribersList = [];
        subscribers.map(subscriber=>{
            const {_id,username,profilePicture} = subscriber;
            subscribersList.push({_id, username, profilePicture});
        });
        res.status(200).json(subscribersList)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Unsubscribe to a user
router.put("/:id/unsubscribe", async (req,res)=>{

    if(req.body.userId !== req.params.id){ //Check to see if logged in user (currentUser) is on their own page (Cannot subscribe to themselves)
        try {
            const user = await User.findById(req.params.id); //User that the page belongs to
            const currentUser = await User.findById(req.body.userId); //User logged in and navigating the website
            const date = Date.now();

            if(user.subscribers.includes(req.body.userId)){ //Check to see if user is already subscribed to this user
               // const subEntry = await currentUser.find({subscriptions:  /req.params.id/ });

                await user.updateOne({$pull:{subscribers:req.body.userId}}); //Remove currentUser's ID from creators subscribers list (currentUsers ID added)
                await currentUser.updateOne({$pull:{subscriptionsWithTimeStamp: {$regex : req.params.id}}}); //Remove user from currentUser's subscription list with time stamp
                await currentUser.updateOne({$pull:{subscriptions: req.params.id}}); //Remove user from currentUser's subscription list without time stamp
                res.status(200).json("Succesfully unsubscribed to user!");

            } else{
                res.status(403).json("You are already not subscribed to this creator!")
            }
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("Cannot unsubscribe to yourself!");
    }
});

module.exports = router 