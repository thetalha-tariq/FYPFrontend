import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    phone: '',
    address: '',
    experience: '',
    qualifications: [],
    timings: {
      monday: { slot1: '', slot2: '' },
      tuesday: { slot1: '', slot2: '' },
    },
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor/668947a8b9ba356446d41ba4');
        setDoctor(response.data.data);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [day, slot] = name.split('.');
      setFormData((prevFormData) => ({
        ...prevFormData,
        timings: {
          ...prevFormData.timings,
          [day]: {
            ...prevFormData.timings[day],
            [slot]: value,
          },
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/doctor/${doctor._id}`, formData);
      setIsEditing(false);
      setDoctor(formData);
    } catch (error) {
      console.error('Error updating doctor details:', error);
    }
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <p>{doctor.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <p>{doctor.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Specialization:</label>
          <p>{doctor.specialization}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone:</label>
          <p>{doctor.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address:</label>
          <p>{doctor.address}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience:</label>
          <p>{doctor.experience} years</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Qualifications:</label>
          <ul>
            {doctor.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Timings:</label>
          <div>
            {Object.keys(doctor.timings).map((day) => (
              <div key={day} className="mb-2">
                <p className="font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}:</p>
                <p>Slot 1: {doctor.timings[day].slot1}</p>
                <p>Slot 2: {doctor.timings[day].slot2}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleEditToggle}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Edit Doctor Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Experience:</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Qualifications:</label>
            <textarea
              name="qualifications"
              value={formData.qualifications.join('\n')}
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value.split('\n') })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Timings:</label>
            {Object.keys(formData.timings).map((day) => (
              <div key={day} className="mb-2">
                <p className="font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}:</p>
                <div className="flex gap-2">
                  <div>
                    <label className="block text-sm">Slot 1:</label>
                    <input
                      type="text"
                      name={`${day}.slot1`}
                      value={formData.timings[day].slot1}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Slot 2:</label>
                    <input
                      type="text"
                      name={`${day}.slot2`}
                      value={formData.timings[day].slot2}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default DoctorDetail;
