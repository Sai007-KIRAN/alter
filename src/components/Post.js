
const Post = ({ post }) => {
    return (
      <div className="post">
        <p>{post.text}</p>
        {post.images && post.images.map((url, idx) => <img key={idx} src={url} alt={`Post ${idx}`} />)}
        {post.video && <video controls src={post.video}></video>}
      </div>
    );
  };
  
  export default Post;
  