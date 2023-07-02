

const mongoose=require("mongoose");

const {Schema}=mongoose;

const userSchema=new Schema({
    username:{type:String,required:[true,"is required field"]},
    email:{type:String,
        required:[true,'is required field'],
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'is required field'],
        select:false,
    }
},{
    timestamps:true
});

const userModel=mongoose.model("Users",userSchema);
module.exports=userModel;