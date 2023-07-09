const express=require('express');
const router=express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const cors=require("cors");
const {blogPost,getBlog,getSingleBlog,deleteBlog,updateBlog}=require("../Controllers/blog");

//middleware
// router.use(
//     cors({
//         credentials:true,
//         origin:process.env.FRONTENT_WEBSITE,
//     })
// );
// upload.single('file')
router.post('/post',blogPost);
router.get('/getblog',getBlog);
router.get('/getblog/:id',getSingleBlog);
router.delete('/deleteblog/:id',deleteBlog);
router.put('/updateblog/:id',upload.single('file'),updateBlog)
module.exports=router;