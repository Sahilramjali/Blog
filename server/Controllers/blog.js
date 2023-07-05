
const fs = require('fs');
const blogModel = require("../Models/blog")
const blogPost = async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension
        fs.renameSync(path, newPath);
       
        const data = new blogModel({
            title,
            summary,
            content,
            image: newPath,
        });
        const result = await data.save();
        return res.json(result);
    } catch (err) {
        console.log("error occurs in server");
        res.status(500).json({
            error: "Internal Server error"
        })
    }


}

const getBlog = async(req, res) => {
    try {
         const data=await blogModel.find();
         console.log(data);   
         res.json({data});
    } catch (err) {
        console.log("error occurs in server");
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}

module.exports = {
    blogPost,
    getBlog
}