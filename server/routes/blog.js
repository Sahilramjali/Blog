const express=require('express');
const router=express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const cors=require("cors");
const {blogPost,getBlog,getSingleBlog,deleteBlog,updateBlog}=require("../Controllers/blog");

//middleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173",
    })
);

router.post('/post',upload.single('file'),blogPost);
router.get('/getblog',getBlog);
router.get('/getblog/:id',getSingleBlog);
router.delete('/deleteblog/:id',deleteBlog);
router.put('/updateblog/:id',upload.single('file'),updateBlog)
module.exports=router;