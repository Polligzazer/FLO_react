import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase instance
import { useNavigate } from 'react-router-dom';

export interface LostItem {
  item: string;
  category: string;
  location: string;
  date: string;
  description: string;
  userId: string;
  createdAt: string;
  id?: string; // Add optional ID if you have one
}

const ReportPage: React.FC = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();

  const [item, setItem] = useState('');
  const [category, setCategory] = useState('Gadgets');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You need to be logged in to report an item.');
      return;
    }

    try {
      const newItem: LostItem = {
        item,
        category,
        location,
        date,
        description,
        userId: user?.uid ?? '',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'lost-items'), newItem);
      alert('Lost item reported successfully!');
      navigate('/'); // Redirect to home page after successful submission
    } catch (error) {
      console.error('Error reporting lost item:', error);
      alert('Failed to report lost item.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Report a Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Gadgets">Gadgets</option>
            <option value="Accessories/Personal Belongings">Accessories/Personal Belongings</option>
            <option value="School Belongings">School Belongings</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Lost Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Loss</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportPage;