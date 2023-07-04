
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import {  useState } from 'react';
import { REGISTER_API_URL } from '../constants/constant';
import { ValidateEmail, ValidatePassword, ValidateUsername } from '../utils/validation';
import { useNavigate,Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';
const InitialData = {
  username:"",
  email: "",
  password: "",
};
const InitialError={
  nameError:'',
  emailError:'',
  passwordError:''

}
const Register = () => {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [Data, setData] = useState(InitialData);
  const[error,setError]=useState(InitialError);
  
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
    if(username.length===0){
      setError(prev=>({
        ...prev,
        nameError:"Username Required"
      }))
    }else{
      setError(prev=>({
        ...prev,
        nameError:''
      }))
    }
    if(email.length===0||!ValidateEmail(email)){
      setError(prev=>({
        ...prev,
        emailError:email.length===0?"Email Required":"Enter a valid email"
      }))
    }else{
      setError(prev=>({
        ...prev,
        emailError:''
      }))
    }
    if(password.length===0){
      setError(prev=>({
        ...prev,
        passwordError:"Password Required"
      }))
    }else{
      setError(prev=>({
        ...prev,
        passwordError:''
      }))
    }
    if(ValidateEmail(email)&&ValidateUsername(username)){
      
   const result=await axios.post(REGISTER_API_URL,{
        username,email,password
       });
       console.log(result);
       if (result.data.error) {
        return toast.error(result.data.error);
    }else{
      toast.success('Success');
      navigate('/login'); 
    }
   
    }
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
        {error.nameError?<div className='error'>
            {error.nameError}
        </div>:null}
        <div className='input-div'>
        <input
            onChange={handleInput}
            type="text"
            placeholder="email"
            value={Data.email}
            name="email"
          />
        </div>
        {error.emailError?<div className='error'>
            {error.emailError}
        </div>:null}
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
          {error.passwordError?<div className='error'>
            {error.passwordError}
        </div>:null}
          <div className='button-div'>
          <button type="submit">Register</button>
          </div>
        </form>
        <div className='text'>
      Already have account? <Link to="/login"><span>Login</span> </Link>       
      </div>
      </div>
      
    </section>
  );
}

export default Register;