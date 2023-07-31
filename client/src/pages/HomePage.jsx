import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { GET_BLOG_API_URL } from "../constants/constant";
import Loading from "../components/Loading";
import BlogComponent from "./../components/BlogComponent";
import Seo from "../components/SEO";
// import LoadingSpinner from "./../components/LoadingSpinner";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const[tempData,setTempData]=useState(0);
  const fetchMoreData = useCallback(async () => {
    try {
      if (page <= totalPage) {
        setLoading(true);
        const response = await axios.get(
          `${GET_BLOG_API_URL}?limit=3&page=${page}`
        );
        setData((prevData) => [new Set([...prevData, ...response.data.data])]);
        setTotalPage(response.data.totalPages);
        setLoading(false);
        console.log("useeffect 1");
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, totalPage]);
  useEffect(() => {
    setIsLoading(true);
    fetchMoreData().then(() => setIsLoading(false));
  }, [fetchMoreData]);

  const handleInfiniteScroll = useCallback(async () => {
    try {
      // console.log(document.documentElement.scrollHeight);

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        if (totalPage !== page && page < totalPage) {
          setPage((prev) => prev + 1);
        } else {
          setPage((prev) => prev);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [totalPage, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);
  return (
    // <>
    //   {isLoading ? (
    //     <LoadingSpinner />
    //   ) : (
    <>
      <Seo
        title="Blog"
        content="list of blogs along with its title,data of updated, author name,summary and image which redirect to its individual page"
        link="/"
      />
      <section className="home-wrapper">
        <BlogComponent items={data} />
        {loading && page !== 1 ? <Loading /> : null}
      </section>
    </>
  );
};

export default HomePage;
