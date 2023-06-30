
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const InitialData={
  username:'',
  email:"",
  password:'',
}
const Login = () => {
  
  const[showPassword,setShowPassword]=useState(false);
  const[Data,setData]=useState(InitialData)
  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  const handleInput=(e)=>{
      
      setData(prev=>({
        ...prev,
        [e.target.name]:e.target.value,
      }));
  
    
  }
  const onSubmitHandler=(e)=>{
    e.preventDefault();
      console.log(Data) ;
      setData(InitialData)
  }
  return (
    <section className="login-div">
      <div className="Form-div">
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <input onChange={handleInput} type="text" placeholder="Username" value={Data.username} name='username'/>
        <input onChange={handleInput} type="email" placeholder="email" value={Data.email} name='email'/>
        <div className='password'>
        <input onChange={handleInput} type={showPassword?"text":"password"} placeholder="password" value={Data.password} name='password'/>
        <div onClick={handleShowPassword}>
        {
          showPassword?<VisibilityOffIcon/>:<VisibilityIcon/>
        }
        </div>
        </div>
        <button type='submit'>Login</button>
      </form>
      </div>
    </section>
  )
}

export default Login