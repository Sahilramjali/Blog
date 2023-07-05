

const blogPost=(req,res)=>{
 const {title,summary,content}=req.body;
 
 console.log(req.body);
 console.log(req.file);
 res.json("submitted");
}

module.exports={
    blogPost
}