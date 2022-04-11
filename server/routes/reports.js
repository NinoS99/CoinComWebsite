const router = require("express").Router();
const req = require("express/lib/request");
const Post = require("../models/post");
const User = require("../models/user");
const Reports = require("../models/reports");

//Create a report

router.post("/", async (req,res) => {
    const newReport = new Reports(req.body)
    try {
        const savedReport = await newReport.save();
        res.status(200).json(savedReport);
        
    } catch (err) {
        res.status(500).json(err)
        
    }
});

module.exports = router; 