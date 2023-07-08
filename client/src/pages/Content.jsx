import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SINGLE_BLOG_API_URL,DELETE_BLOG_BY_ID } from "../constants/constant";
import {toast} from 'react-hot-toast';

import Cookies from "js-cookie";

 const Content = () => {
   const naviagte=useNavigate();
    const[blogInfo,setBlogInfo]=useState('');
    const {id}=useParams();
    
    const userId=Cookies.get('userId');
    useEffect(()=>{
      const source = axios.CancelToken.source();
      const fetchdata = async () => {
        try {
          const response = await axios.get(GET_SINGLE_BLOG_API_URL+id, {
            cancelToken: source.token,
          });
  
          setBlogInfo(response.data);
        } catch (errr) {
          console.log(errr);
        }
      };
      fetchdata();
      return () => {
        source.cancel("get request rebert");
      };
        
    },[id])
    const handleUpdate=()=>{
      if(userId===blogInfo?.author?._id){
        naviagte(`/edit/${id}`)
      }else{
        toast.error("You cannot edit this post");
      }
    
    }
    const handleDelete=()=>{
      
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
       <h2>{blogInfo.title}</h2>
       <p className="info">
            <span className="author">{blogInfo?.author?.username}</span>
            {/* {format(new Date(blogInfo.createdAt),'MMM d, yyyy HH:mm')} */}
          </p>
      <div className="content-image">
        <img
        src={blogInfo.url}
        />
      </div>
     
      
      <main className="main-content" dangerouslySetInnerHTML={{__html:blogInfo.content}}/>
       {userId===blogInfo?.author?._id &&<div className="buttons">
          <button onClick={handleUpdate} className="update">Update</button>
          <button onClick={handleDelete}className="delete">Delete</button>
       </div>}
     
    </section>
  )
}

export default Content;