const express=require('express');
const router=express.Router();


const cors=require("cors");
const {signup, login}=require("../Controllers/authController");

//middleware
// router.use(
//     cors({
//         credentials:true,
//         // origin:"http://localhost:5173",
//         origin:process.env.FRONTENT_WEBSITE,
//     })
// );
router.post('/signup',signup);
router.post('/login',login);
module.exports=router;