const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
        userId:{
            type:String,
            required: true,
        },
        desc:{
            type:String,
            max:500,
        },
        img: {
            type:String,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
{timestamps:true}
);

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);