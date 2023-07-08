import { useState,useEffect } from "react"
import { GET_SINGLE_BLOG_API_URL,formats, modules,UPDATE_BLOG_BY_ID } from './../constants/constant';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie"; 

const EditBlog = () => {
  const navigate=useNavigate();
    const[blogData,setBlogData]=useState({});
    const {id}=useParams();
    useEffect(()=>{
      const source = axios.CancelToken.source();
      const fetchblogData = async () => {
        try {
          const response = await axios.get(GET_SINGLE_BLOG_API_URL+id, {
            cancelToken: source.token,
          });
  
          setBlogData(response.data);
        } catch (errr) {
          console.log(errr);
        }
      };
      fetchblogData();
      return () => {
        source.cancel("get request rebert");
      };
    },[id]);
    const submitEditedPost=(e)=>{
      e.preventDefault();
      axios.put(UPDATE_BLOG_BY_ID+id, {
        blogData
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
           'Authorization':`bearer ${Cookies.get('token')}`
        },
      }).then(res => {
        if (res.data.error) {
          toast.error(res.data.error)
        } else {
          toast.success("blog posted");
          navigate('/');
          setBlogData({});

        }
      }).catch(() => {
        toast.error("Server error");
      })
    



    }

    const handleFileChange=(e)=>{
      const tempFile=e.target.files[0];
      if(tempFile){
        const reader=new FileReader();
        reader.readAsDataURL(tempFile);
        reader.onloadend(()=>{
          setBlogData(prev=>({
            ...prev,
           url:reader.result
          }));
        })
      }
    }
    const handleChange=(e)=>{
      setBlogData(prev=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }
  return (
    <section className="createBlog">
      <h3>Create your new Post</h3>
      <form onSubmit={submitEditedPost} >
        <div className="create-input">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={blogData?.title}
            onChange={handleChange}
          />
        </div>
        <div className="create-input">
          <input
            type="text"
            name="summary"
            placeholder="summary"
            value={blogData?.summary}
            onChange={handleChange}
          />
        </div>
        <div className="create-input">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="">
          <ReactQuill
            value={blogData?.content}
            modules={modules}
            formats={formats}
            name="content"
            onChange={(newVal) => setBlogData(prev=>({...prev,
            content:newVal
            }))}
          />
        </div>
        <div className="post">  
          <button type="submit">Post</button>
        </div>
      </form>
    </section>
  )
}

export default EditBlog