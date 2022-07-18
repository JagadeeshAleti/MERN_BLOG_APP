import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [empty, setEmpty] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      console.log(res.data.length);
      res.data.length === 0 ? setEmpty(true) : setEmpty(false);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        {empty ? (
          <div className="no-posts">
            <h1 className="message">
              No post yet, Please browse some other category for more posts!! Or
              write your post !!
            </h1>
            <img
              src="https://cdn.dribbble.com/users/2460221/screenshots/14347554/media/6ad1d1eba400880e3c3de062fcb13576.png?compress=1&resize=400x300&vertical=top"
              alt=""
            />
          </div>
        ) : (
          <Posts posts={posts} />
        )}

        <Sidebar />
      </div>
    </>
  );
}
