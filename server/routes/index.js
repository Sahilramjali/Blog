const express=require('express');

const router=express.Router();
router.use(
    cors({
        credentials:true,
        origin:process.env.FRONTENT_WEBSITE,
    })
);
router.use('/auth',require('./auth.route.js'));
router.use('/blog',require("./blog.route.js"))

module.exports=router;