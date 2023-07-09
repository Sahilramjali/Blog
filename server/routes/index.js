const express=require('express');

const router=express.Router();

router.use('/auth',require('./auth.route.js'));
router.use('/blog',require("./blog.route.js"))

module.exports=router;