import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!itemName || !category || !location || !description) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'itemReports'), {
        itemName,
        category,
        location,
        timestamp: serverTimestamp(),
        description,
      });
      setItemName('');
      setCategory('');
      setLocation('');
      setDescription('');
      navigate('/home'); // Redirect to home page after successful submission
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report an Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Item Name:
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;