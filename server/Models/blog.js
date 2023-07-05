const mongoose=require('mongoose');
const{Schema}=mongoose;

const blogSchema=new Schema({
    title:{type:String,required:[true,"is required"]},
    summary:{type:String,required:[true,'is required']},
    content:{type:String,required:[true,"is required"]},
    file:{type:String,required:[true,"is required"]},

},{
    timestamps:true
})
const blogModel=mongoose.model("Blog",blogSchema);
module.exports=blogModel;