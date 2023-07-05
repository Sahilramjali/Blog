
const express=require('express');

require('dotenv').config();
const {mongoose}=require('mongoose');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',require("./routes/authRoute"));
app.use('/api/blog',require("./routes/blog"));


//connect mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb");
}).catch(err=>{
    console.log("database connection error");
})

app.listen(4000,()=>{
    console.log("sever connected to 4000 port")
})