const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//REGISTER USER
router.post("/register", async(req,res)=>{

    try {
        //Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            password: hashedPassword,
        });

        //Save user to DB and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

//LOGIN USER
router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({ email:req.body.email });
        !user && res.status(404).send("User not found!")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")

        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router 