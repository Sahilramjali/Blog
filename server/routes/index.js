const express=require('express');
const cors=require("cors");
const router=express.Router();
// router.use(
//     cors({
//         credentials:true,
//         origin:process.env.FRONTENT_WEBSITE,
//     })
// );
router.use('/auth',require('./auth.route.js'));
router.use('/blog',require("./blog.route.js"))

module.exports=router;