import React from 'react';
import { Timestamp } from 'firebase/firestore';

interface PostProps {
  post: { id: string; content: string; timestamp: Timestamp; /* Add other fields */ };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div key={post.id} className="post-item">
      <p>{post.content}</p>
      <p>Posted at: {post.timestamp.toDate().toLocaleString()}</p> {/* Use toDate() */}
      {/* Add other post details here */}
    </div>
  );
};

export default Post;
