const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("hey bud")
})

module.exports = router 