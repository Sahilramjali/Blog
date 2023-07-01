import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const InitialData = {
  email: "",
  password: "",
};
const Login = () => {
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
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(Data);
    setData(InitialData);
  };
  return (
    <section className="login-div">
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