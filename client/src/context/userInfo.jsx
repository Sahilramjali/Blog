import { createContext, useState } from "react";

import Cookies from "js-cookie";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userCookie = Cookies.get("user");
  const user=userCookie?JSON.parse(userCookie):null;
  const [isLogin, setisLogin] = useState(user?.token ? true : false);
  console.log(isLogin);

  const handleLogin = () => {
    setisLogin(true);
  };

  const logout = () => {
    setisLogin(false);
    Cookies.remove('user');
    Cookies.remove('token');
  };
  return (
    <UserContext.Provider value={{ isLogin, logout, handleLogin, user }}>
      {children}
    </UserContext.Provider>
  );
};
