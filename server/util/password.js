
const bcrypt=require("bcrypt")
const saltround=11;
const hashPassword= async(password)=>{
        try{
          const hash=await bcrypt.hash(password,saltround);
            return hash;
        }catch(err){
            throw new Error("Encryption failed");
        }
}

const verifyPassword=async(password,hashedPassword)=>{
 try{
    const isMatch=await bcrypt.compare(password,hashedPassword)
    if(isMatch){
        return true;
    }
    else{
        return false;
    }
 }catch(err){
    console.log(err)
    throw new Error("password comparison error")
 }
}
module.exports={
    hashPassword,
    verifyPassword
}