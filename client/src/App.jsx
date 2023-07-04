

import {  Navigate, Route, Routes } from 'react-router-dom';
import Layout from "./layout";
import HomePage from "./pages/HomePage";
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { UserContext } from './hooks/userInfo';




function App() {

const {isLogin}=useContext(UserContext);

  return (
    
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={isLogin?<Navigate to='/'/>:<Login/>} />
          <Route path="register" element={isLogin?<Navigate to='/'/>:<Register/>} />
        </Route>
      </Routes>
    


  )
}

export default App
