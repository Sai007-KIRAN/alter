import { useState, useEffect, useCallback } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(20),
      lastDoc ? startAfter(lastDoc) : undefined
    );

    try {
      const snapshot = await getDocs(q);
      const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts((prev) => [...prev, ...newPosts]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [lastDoc]);


  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isLoading && <p>Loading...</p>}
      <button onClick={fetchPosts} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default Feed;
