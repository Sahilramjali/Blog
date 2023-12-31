import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { POST_API_URL, formats, modules } from "../constants/constant";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import useCookeiProvider from "../hooks/useCookeiProvider";
import Seo from "../components/SEO";
const InitialData = {
  title: "",
  summary: "",
};

const CreateBlog = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState(InitialData);
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [user] = useCookeiProvider();
  console.log("create blog page " + user.token);
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFileChange = (e) => {
    const tempFile = e.target.files[0];
    if (tempFile) {
      const reader = new FileReader();
      reader.readAsDataURL(tempFile);
      reader.onloadend = () => {
        console.log(reader.result);
        setFile(reader.result);
      };
    }
  };

  const submitCreatePost = (e) => {
    const { title, summary } = Data;
    e.preventDefault();

    if (file && Data && content) {
      axios
        .post(
          POST_API_URL,
          {
            title,
            summary,
            file,
            content,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            toast.success("blog posted");
            navigate("/");
            setData();
          }
        })
        .catch(() => {
          toast.error("Server error");
        });
    } else {
      toast("Choose file");
    }
  };
  return (
    <>
      <Seo
        title="Blog || create"
        content="create blog title summmary content post file "
        Link="/create"
      />
      <section className="createBlog">
        <h3>Create your new Post</h3>
        <form onSubmit={submitCreatePost}>
          <div className="create-input">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={Data.title}
              onChange={handleChange}
            />
          </div>
          <div className="create-input">
            <input
              type="text"
              name="summary"
              placeholder="summary"
              value={Data.summary}
              onChange={handleChange}
            />
          </div>
          <div className="create-input">
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
          <div className="">
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              name="content"
              onChange={(newVal) => setContent(newVal)}
            />
          </div>
          <div className="post">
            <button type="submit">Post</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateBlog;
