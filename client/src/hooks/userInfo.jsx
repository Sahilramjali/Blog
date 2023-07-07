import { createContext,useState } from "react";

import Cookies from 'js-cookie';
export const UserContext=createContext();

export const UserProvider=({children})=>{
    const [isLogin,setisLogin]=useState(Cookies.get('token')?true:false);
    // const [user,setUserData]=useState({});
   const handleLogin=()=>{
    setisLogin(true);
   }
  //  console.log(localStorage.getItem('userData'));
  // console.log(userData);
      const logout = () => {
        // Remove the token from the cookie
        // localStorage.removeItem('userData');

        Cookies.remove('token');
        setisLogin(false);
      };
      return(
        <UserContext.Provider value={{isLogin,logout,handleLogin}}>
            {children}
        </UserContext.Provider>
      )
}