const UserModel=require('../Models/user');
const { hashPassword,verifyPassword } = require('../util/password');
const jwt=require('jsonwebtoken');
const signup=async(req,res)=>{
    try{
      const {username,email,password}=req.body;
      
      const exist=await UserModel.findOne({email:email.toLowerCase()});
      if(exist){
        return res.json({
          error:"Email already exist"
        });
      }
      const hashedPassword= await hashPassword(password);

      const user=new UserModel({
        username,
        email,
        password:hashedPassword
      })
      const result=await user.save();
      // const user=await UserModel.save({
      //   username,
      //   email,
      //   password:hashedPassword
      // });

      const object=result.toObject();
      delete object.password;
      return res.json(object);
    }catch(err){
      console.log("error occurs in server");
      res.status(500).json({
        error:"Internal Server error"
      })
    }
}

const login=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await UserModel.findOne({
      email:email.toLowerCase()
    }).select('+password');
    if(user){
     console.log(user);
      const isMatch=await verifyPassword(password,user.password)
      if(isMatch){
        const result=user.toObject();
        delete result.password;
        const token=jwt.sign(result,process.env.JWT_SECERET_KEY);
      res.cookie('token',token,{
        maxAge: 24*60*60 * 1000,
      });
      
      res.json({Status: "Success",...result});

      }else{
        res.json({error:"Email or passwor is wrong"})
      }
    }else{
      res.json({
        error:"User email is not registered"
      })
    }
  }catch(err){
    console.log("error occurs in server");
    console.log(err);
      res.status(500).json({
        error:"Internal Server error"
      })
  }
}

module.exports={
  signup,
  login
}