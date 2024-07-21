import React, { useState } from 'react';
import axios from 'axios';

const AddSlot = () => {
  const [slot, setSlot] = useState({
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlot((prevSlot) => ({ ...prevSlot, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/slot/create', slot);
      alert('Slot added successfully!');
      setSlot({
        startTime: '',
        endTime: ''
      });
    } catch (error) {
      console.error('Error adding slot:', error);
      alert('Failed to add slot.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Slot</h2>
      <form onSubmit={handleSubmit}>
        {['startTime', 'endTime'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="time"
              name={field}
              value={slot[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Slot</button>
      </form>
    </div>
  );
};

export default AddSlot;
