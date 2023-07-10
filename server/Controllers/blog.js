const fs = require("fs");
const blogModel = require("../Models/blog");
const jwt = require("jsonwebtoken");
const uploadImage = require("../util/generateUrl");
const { v4: uuidv4 } = require("uuid");
const blogPost = async (req, res) => {
  try {
    const { title, summary, content, file } = req.body;
    const contentLength = req.headers['content-length'];
    console.log('Request entity size:', contentLength);
    // const { originalname, path } = req.file;
    // console.log(req.file);
    // const parts = originalname.split('.');
    // const extension = parts[parts.length - 1];
    // const newPath = path + '.' + extension
    // fs.renameSync(path, newPath);

    const imageId = uuidv4().split("-")[0];
    console.log("image Id " + imageId);
    const imageUrl = await uploadImage(file, imageId);
    if (typeof imageUrl !== "string") {
      return res.status(500).json({
        error: "Internal Server error",
      });
    }

    const token = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECERET_KEY
    );
  console.log("create post token "+ req.headers.authorization.split(" ")[1]);
  console.log('Token user id :'+token._id)
    const data = new blogModel({
      title,
      summary,
      content,
      url: imageUrl,
      author: token._id,
    });
    const result = await data.save();

    return res.json(result);
  } catch (err) {
    console.log(err);
    console.log("error occurs in server");
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||5;
    const skip=(page-1)*limit;
    const totalData=await blogModel.find();
    
    const data = await blogModel
      .find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 }).skip(skip).limit(limit);
      
    const  totalPages= Math.ceil(totalData.length / limit);
    res.json({ data,totalPages });
  } catch (err) {
    console.log(err);
    console.log("error occurs in server");
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const data = await blogModel
        .findOne({ _id: id })
        .populate("author", ["username", "_id"]);
      console.log(data);
      res.json(data);
    } else {
      res.json({ error: "Invalid id" });
    }
  } catch (err) {
    console.log("error occurs in server");
    console.log(err);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const token = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECERET_KEY
    );
    const { userId } = req.cookies;
    const params = req.params.id;
    console.log(userId);
    if (params && token._id === userId) {
      const data = await blogModel.findOne({ _id: params }).populate("author");
      console.log(data.author._id.toString());

      if (data.author._id.toString() === userId) {
        blogModel
          .deleteOne({ _id: params })
          .then(() => {
            res.json("item deleted");
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ error: "delete operation cannot be performed by you" });
      }
    } else {
      res.json({ error: "You cannot delete" });
    }
  } catch (err) {
    console.log("error occurs in server");
    console.log(err);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const token = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECERET_KEY
    );
    const { userId } = req.cookies;
    const params = req.params.id;
    let imageUrl;
    const { title, summary, content, file } = req.body.blogData;
  
    if (file) {
      const imageId = uuidv4().split("-")[0];
      console.log("image Id " + imageId);
      imageUrl = await uploadImage(file, imageId);
      if (typeof imageUrl !== "string") {
        return res.status(500).json({
          error: "Internal Server error",
        });
      }
    }

    if (params && token._id === userId) {
      const data = await blogModel.findOne({ _id: params }).populate("author");
      console.log(data.author._id.toString());

      if (data.author._id.toString() === userId) {
        blogModel
          .findOneAndUpdate(
            { _id: params },
            {
              title,
              summary,
              content,
              url: imageUrl ? imageUrl : data.url,
            }
          )
          .then((item) => {
            res.json({ status: "item updated", ...item });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ error: "update operation cannot be performed by you" });
      }
    } else {
      res.json({ error: "You cannot update" });
    }
  } catch (err) {
    console.log("error occurs in server");
    console.log(err);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

module.exports = {
  blogPost,
  getBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
