import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { LOGIN_API_URL } from '../constants/constant';
import { ValidateEmail } from "../utils/validation";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/userInfo";
import {useCookies} from 'react-cookie';
import Cookies from "js-cookie";
import SEO from '../components/SEO';


const InitialData = {
  email: "",
  password: "",
};
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Data, setData] = useState(InitialData);
  const {handleLogin}=useContext(UserContext);
  const [cookie,setCookie]=useCookies(['user']);
  const navigate=useNavigate();
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
    try{
      const{email,password}=Data;
      if(ValidateEmail(email)){
        const result=await axios.post(LOGIN_API_URL,{email,password},{
          withCredentials:true
        })
        console.log(result);
        if(result.data.error){

          toast.error(result.data.error)
        }else{
          // localStorage.setItem('userData', result.data.result);
          // setUserData(result.data.result);
          handleLogin();
          const token=Cookies.get('token');
          console.log(token);
          console.log(result.data);
          setCookie("user",{
             token:result.data?.token,
             id:result.data?.result?._id,
             username:result.data?.result?.username
          },{
            maxAge:60*60*24
          });
          
          // localStorage.setItem('userId',Cookies.get('userId'));
          // console.log(userData);
          toast.success("login successfully")
          navigate("/")
        }

      }
      
    }catch(error){
      console.log(error);
    }
  
  };
  return (
    <section className="login-div">
      <SEO
      title="Blog || Login"
      content="login page which contain user email password and login button and toast to reflect weather user get login or not"
     link="/login"
     />
      
      <div className="Form-div">
        <h2>Login</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="input-div">
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
              {showPassword ? <VisibilityOffIcon sx={{color:"grey", fontSize: 20}}/> : <VisibilityIcon sx={{color:"grey",fontSize: 20}}/>}
            </div>
          </div >
          <div className="button-div">
          <button type="submit">Login</button>
          </div>
         
        </form>
      </div>
    </section>
  );
};

export default Login;
