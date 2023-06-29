import BlogClick from "./components/BlogClick"
import Login from "./components/authComponents/Login";
import Register from "./components/authComponents/Register";
import {  Route, Routes } from 'react-router-dom';
import Layout from "./layout";



function App() {


  return (
    
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<BlogClick />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    


  )
}

export default App
