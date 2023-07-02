
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import { useState } from 'react';
import { REGISTER_API_URL } from '../constants/constant';
const InitialData = {
  username:"",
  email: "",
  password: "",
};
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Data, setData] = useState(InitialData);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleInput = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmitHandler = async(e) => {
    
    e.preventDefault();
    console.log(Data);
    const {username,email,password}=Data
    
   try{
    await axios.post(REGISTER_API_URL,{
      username,email,password
     });
   }catch(err){
    console.log(err);
   }
    setData(InitialData);
  };
  return (
    <section className="login-div">
      <div className="Form-div">
        <h2>Register</h2>
        <form onSubmit={onSubmitHandler}>
        <div className='input-div'>
        <input
            onChange={handleInput}
            type="text"
            placeholder="username"
            value={Data.username}
            name="username"
          />
        </div>
        <div className='input-div'>
        <input
            onChange={handleInput}
            type="email"
            placeholder="email"
            value={Data.email}
            name="email"
          />
        </div>
          
          <div className="input-div">
            <input
              onChange={handleInput}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={Data.password}
              name="password"
            />
            <div onClick={handleShowPassword}>
              {showPassword ? <VisibilityOffIcon sx={{ color:"grey",fontSize: 20 }}/> : <VisibilityIcon sx={{ color:"grey",fontSize: 20 }}/>}
            </div>
          </div>
          <div className='button-div'>
          <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;