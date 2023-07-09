const express=require('express');
const cors=require("cors");
const router=express.Router();
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173",
        // origin:process.env.FRONTENT_WEBSITE,
    })
);
router.use('/auth',require('./auth.route.js'));
router.use('/blog',require("./blog.route.js"))

module.exports=router;