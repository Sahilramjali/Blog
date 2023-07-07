import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SINGLE_BLOG_API_URL,IMG_URL,DELETE_BLOG_BY_ID } from "../constants/constant";
import {toast} from 'react-hot-toast';

import Cookies from "js-cookie";

 const Content = () => {
   const naviagte=useNavigate();
    const[blogInfo,setBlogInfo]=useState('');
    const {id}=useParams();
    const userId=localStorage.getItem('userId');
    useEffect(()=>{
    
        axios.get(GET_SINGLE_BLOG_API_URL+id,).then(res=>{
            setBlogInfo(res.data);

        }).catch(err=>{
            console.log(err);
        })
    },[id])
    
    const handleDelete=()=>{
      console.log(DELETE_BLOG_BY_ID+id);
      axios.delete(DELETE_BLOG_BY_ID+id, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
           'Authorization':`bearer ${Cookies.get('token')}`
        }}).then(res=>{
        if(res.data.error){
          toast.error(res.data.error);
        }else{
          toast.success("Deleted successfully");
          naviagte('/');
        }
        
      }).catch(err=>{
        console.log(err);
        toast.error('Internal Server Error');
      })
    }
 
  return (
    <section className="content">
      <div className="content-image">
        <img
        src={IMG_URL+blogInfo.image}
        />
      </div>
      <h2>{blogInfo.title}</h2>
      
      <main className="main-content" dangerouslySetInnerHTML={{__html:blogInfo.content}}/>
       {userId===blogInfo.author&&<div className="buttons">
          <button  className="update">Update</button>
          <button onClick={handleDelete}className="delete">Delete</button>
       </div>}
     
    </section>
  )
}

export default Content;