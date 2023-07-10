import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { GET_BLOG_API_URL } from "../constants/constant";
import Loading from "../components/Loading";
import BlogComponent from './../components/BlogComponent';
const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [totalPage,setTotalPage]=useState(1);
  // const[tempData,setTempData]=useState(0);
  useEffect(() => {
    // const source = axios.CancelToken.source();
    // const fetchdata = async () => {
    //   try {
    //     const response = await axios.get(GET_BLOG_API_URL, {
    //       cancelToken: source.token,
    //     });

    //     setData(response.data.data);
    //   } catch (errr) {
    //     console.log(errr);
    //   }
    // };
    const fetchdata=async()=>{
      try {
        const response = await axios.get(`${GET_BLOG_API_URL}?limit=2&page=${page}` 
        // ,{
        //   // cancelToken: source.token,
        // }
        );
        console.log(response.data.data);
        
        setData(prev=>[...prev,...response.data.data]);
        setTotalPage(response.data.totalPages);
        // setTempData(response.data.data.length);
        setLoading(false);
      } catch (errr) {
        console.log(errr);
      }
    }
    fetchdata();
    return () => {
      console.log("finished");
      // source.cancel("get request rebert");
    };
  }, [page]);

  const handleInfiniteScroll =useCallback( async () => {
    try {
      // console.log(document.documentElement.scrollHeight);
      if (window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
    
          setLoading(true);
          if(totalPage!==page &&page<totalPage){
            setPage(prev=>prev+1);
          }else{
            setPage(prev=>prev)
            setLoading(false);
          }
         
        
        
      }
    } catch (err) {
      console.log(err);
    }
  },[totalPage,page])

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll)
    return () => window.removeEventListener("scroll", handleInfiniteScroll);

  }, [handleInfiniteScroll])
  return (
    <section className="home-wrapper">
      
      <BlogComponent items={data}/>
      {loading? <Loading />:null}
    </section>


  );
};

export default HomePage;
