const router = require("express").Router();
const User = require("../models/user");

//REGISTER USER
router.get("/register", async(req,res)=>{
    const user = await new User({
        username: "john",
        email:"john@gmail.com",
        password:"1232"
    })
   await user.save();
   res.send("ok")
});

module.exports = router 