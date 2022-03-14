//Initialize Express Server
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const res = require("express/lib/response");
const router = express.Router();

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require("multer")
const path = require("path")

dotenv.config();

//const PORT = process.env.PORT || 5000;

//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log('Server running on port(s):', PORT)))
//    .catch((error) => console.log(error.message));

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//Middleware and such test
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "public/images");
    },
    filename: (req, file, cb)=> {
        cb(null, req.body.name);
    },
});

const upload = multer({storage});

app.post("/server/upload", upload.single("file"), (req,res)=> {
    try {
        return res.status(200).json("File uploaded successfully!")
    } catch (err) {
        console.log(err)
    }
})

app.use("/server/users" , userRoute);
app.use("/server/auth" , authRoute);
app.use("/server/posts" , postRoute);

app.listen(8800,()=>{
    console.log("Backend Server is Running!..")
})

