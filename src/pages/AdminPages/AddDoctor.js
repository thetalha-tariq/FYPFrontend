import React, { useState } from 'react';
import axios from 'axios';

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    slotsPerDay: 4
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/doctor/create', doctor);
      alert('Doctor added successfully!');
      setDoctor({
        name: '',
        specialization: '',
        email: '',
        phone: '',
        role:'',
        slotsPerDay: 4
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor.');
    }
  };

  return (
    <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'specialization', 'email', 'phone','role', 'slotsPerDay'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'slotsPerDay' ? 'number' : 'text'}
              name={field}
              value={doctor[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required={field !== 'phone'}
            />
          </div>
        ))}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
