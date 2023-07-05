import { useEffect, useState } from "react";
import BlogClick from "../components/BlogClick";
import axios from "axios";
import { GET_BLOG_API_URL } from "../constants/constant";

const HomePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchdata = async () => {
      try {
        const response = await axios.get(GET_BLOG_API_URL, {
          cancelToken: source.token,
        });

        setData(response.data.data);
      } catch (errr) {
        console.log(errr);
      }
    };
    fetchdata();
    return () => {
      source.cancel("get request rebert");
    };
  }, []);
  console.log(data);
  return (
    <>
      {data.map((blog, index) => (
        <BlogClick
          key={blog.id}
          {...blog}
        />
      ))}
    </>
  );
};

export default HomePage;
