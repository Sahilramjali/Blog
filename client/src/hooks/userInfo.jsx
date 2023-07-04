import { createContext,useState } from "react";

import Cookies from 'js-cookie';
export const UserContext=createContext();

export const UserProvider=({children})=>{
    const [isLogin,setisLogin]=useState(Cookies.get('token')?true:false);
   const handleLogin=()=>{
    setisLogin(true);
   }

      const logout = () => {
        // Remove the token from the cookie
        Cookies.remove('token');
        setisLogin(false);
      };
      return(
        <UserContext.Provider value={{isLogin,logout,handleLogin}}>
            {children}
        </UserContext.Provider>
      )
}