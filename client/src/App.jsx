

import {  Route, Routes } from 'react-router-dom';
import Layout from "./layout";
import HomePage from "./pages/HomePage";
import Login from './pages/Login';
import Register from './pages/Register';



function App() {


  return (
    
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    


  )
}

export default App
