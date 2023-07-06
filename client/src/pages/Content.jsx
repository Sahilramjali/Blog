import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SINGLE_BLOG_API_URL } from "../constants/constant";


 const Content = () => {
    const[blogInfo,setBlogInfo]=useState('');
    const {id}=useParams();
    
    useEffect(()=>{
        axios.get(GET_SINGLE_BLOG_API_URL+id,).then(res=>{
            setBlogInfo(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[id])
    console.log(blogInfo);
  return (
    <div></div>
  )
}

export default Content;