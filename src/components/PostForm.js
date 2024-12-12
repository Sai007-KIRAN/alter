
import { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostForm = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const handlePost = async () => {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        return await getDownloadURL(imageRef);
      })
    );

    let videoUrl = null;
    if (video) {
      const videoRef = ref(storage, `videos/${video.name}`);
      await uploadBytes(videoRef, video);
      videoUrl = await getDownloadURL(videoRef);
    }

    await addDoc(collection(db, "posts"), {
      text,
      images: imageUrls,
      video: videoUrl,
      timestamp: serverTimestamp(),
    });

    setText("");
    setImages([]);
    setVideo(null);
  };

  return (
    <div className="post-form">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
      <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default PostForm;
