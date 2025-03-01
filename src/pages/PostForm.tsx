import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface PostFormProps {
  onPostSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSuccess }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (content.trim() === '') {
      setError('Please enter some content.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        content,
        timestamp: serverTimestamp(),
        userId: 'userId' // Replace with actual user ID
      });
      setContent('');
      onPostSuccess();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your post content..."
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;