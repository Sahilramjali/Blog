
const express=require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {mongoose}=require('mongoose');
const app=express();
const cloudinary = require('cloudinary').v2;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
app.use('/api',require("./routes/index"));
// app.use('/uploads',express.static('uploads'));

//connect mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb");
}).catch(err=>{
    console.log("database connection error");
})

app.listen(4000,()=>{
    console.log("sever connected to 4000 port")
})
module.exports = app;