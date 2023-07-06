
const fs = require('fs');
const blogModel = require("../Models/blog")
const jwt=require('jsonwebtoken')
const blogPost = async (req, res) => {
    try {
        const { title, summary, content } = req.body;
       

        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension
        fs.renameSync(path, newPath);
       
        console.log(req.headers.authorization);
       const token= jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECERET_KEY)

        const data = new blogModel({
            title,
            summary,
            content,
            image: newPath,
            author:token._id,
        });
        const result = await data.save();
       
        return res.json(result);
    } catch (err) {
        console.log(err);
        console.log("error occurs in server");
        res.status(500).json({
            error: "Internal Server error"
        })
    }


}

const getBlog = async(req, res) => {
    try {
         const data=await blogModel.find().populate('author', ['username']).sort({createdAt:-1}).limit(20);
           
         res.json({data});
    } catch (err) {
        console.log("error occurs in server");
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}
const getSingleBlog=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        if(id){
            const data=await blogModel.findOne({"_id":id})
            console.log(data);
            res.json(data);
        }else{
            res.json({error:"Invalid id"})
        }
       
    }
    catch (err) {
        console.log("error occurs in server");
        console.log(err);
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}

module.exports = {
    blogPost,
    getBlog,
    getSingleBlog
}