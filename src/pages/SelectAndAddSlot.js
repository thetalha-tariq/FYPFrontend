import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectAndAddSlots = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/slot')
      .then(response => {
        setSlots(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching slots:', error);
      });
  }, []);

 
  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  
  const handleAddSlot = (event) => {
    event.preventDefault();
    const newSlot = { startTime, endTime };

    axios.post('http://localhost:5000/api/slot/createSlot', newSlot)
      .then(response => {
        if (response.data.success) {
          setSlots([...slots, response.data.data]);
          setStartTime('');
          setEndTime('');
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error adding slot:', error);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Select and Add Slots</h1>
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Select Slot:</label>
        <select
          value={selectedSlot}
          onChange={handleSlotChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {slots.map((slot, index) => (
            <option key={index} value={slot._id}>
              {slot.startTime} - {slot.endTime}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold mb-4">Add New Slot</h2>
      <form onSubmit={handleAddSlot} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default SelectAndAddSlots;
