import axios from "axios";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SINGLE_BLOG_API_URL,IMG_URL } from "../constants/constant";

import Cookies from 'js-cookie';

 const Content = () => {
    const[blogInfo,setBlogInfo]=useState('');
    const {id}=useParams();
    const userId=Cookies.get('userId');
    useEffect(()=>{
        axios.get(GET_SINGLE_BLOG_API_URL+id,).then(res=>{
            setBlogInfo(res.data);

        }).catch(err=>{
            console.log(err);
        })
    },[id])
    console.log(blogInfo.author
      )
 
  return (
    <section className="content">
      <div className="content-image">
        <img
        src={IMG_URL+blogInfo.image}
        />
      </div>
      <h2>{blogInfo.title}</h2>
      
      <main className="main-content" dangerouslySetInnerHTML={{__html:blogInfo.content}}/>
       {userId===blogInfo.author?<div className="buttons">
          <button className="update">Update</button>
          <button className="delete">Delete</button>
       </div>:null}
     
    </section>
  )
}

export default Content;