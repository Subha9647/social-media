import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPost } = useContext(PostListData);
  const [fatching, setFatching] = useState(false);

  useEffect(() => {
    setFatching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        setFatching(false);
      });
  }, []);

  return (
    <>
      {fatching && <LoadingSpinner />}
      {!fatching && postList.length === 0 && <WelcomeMessage />}
      {!fatching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
