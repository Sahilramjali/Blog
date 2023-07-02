const UserModel=require('../Models/user');

const signup=async(req,res)=>{
    try{
      const {username,email,password}=req.body;
      
      const exist=await UserModel.findOne({email});
      if(exist){
        return res.json({
          error:"Email already exist"
        });
      }
      const user=await UserModel.create({
        username,
        email,
        password
      });
      return res.json(user);
    }catch(err){
      console.log("error occurs in server");
      res.status(500).json({
        error:"Internal Server error"
      })
    }
}

module.exports={
  signup
}