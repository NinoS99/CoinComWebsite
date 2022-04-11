const mongoose = require("mongoose");

const ReportsSchema = new mongoose.Schema({
        postId:{
            type:String,
            required: true,
        },
        desc:{
            type:String,
            max:500,
        },
        userReporting: {
            type:String,
        },
    },
{timestamps:true}
);

module.exports = mongoose.models.Reports || mongoose.model("Reports", ReportsSchema);