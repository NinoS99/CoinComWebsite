const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true, 
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:6,
    },

    age:{
        type: Number,
        required:true,
    },

    walletAddress:{
        type:String,
        default: "",
    },

    monthlyPrice:{
        type: Number,
        default: 20,
    },

    profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
    profilePicture:{
        type:String,
        default:"",
    },
    subscriptions:{
        type:Array,
        default:[],
    },
    subscriptionsWithTimeStamp:{
        type:Array,
        default:[],
    },
    subscribers:{
        type:Array,
        default:[],
    },
    pending:{
        type:String,
        default:"",
    },
    desc:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    creatorType:{
        type:String,
        max:50
    },


},
{timestamps:true}
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);