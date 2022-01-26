//Initialize Express Server
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const res = require("express/lib/response");

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port(s):', PORT)))
    .catch((error) => console.log(error.message));

//Middleware and such test
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);

app.listen(8000,()=>{
    console.log("Backend Server is Running!..")
})

