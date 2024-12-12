
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        const q = query(collection(db, "posts"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        setUserPosts(snapshot.docs.map((doc) => doc.data()));
      };
      fetchUserPosts();
    }
  }, [user]);

  return (
    <div className="profile">
      {user && (
        <>
          <img src={user.photoURL} alt="Profile" />
          <h3>{user.displayName}</h3>
          <p>{user.email}</p>
        </>
      )}
      <div>
        {userPosts.map((post, idx) => (
          <p key={idx}>{post.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Profile;
