import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorEditForm = ({ doctor, onSave, onCancel }) => {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    phone: '',
    address: '',
    experience: '',
    qualifications: [],
    timings: {},
  });

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  useEffect(() => {
    setFormData(doctor);

    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/slot');
        setSlots(response.data.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [day, index] = name.split('.');
      setFormData((prevFormData) => ({
        ...prevFormData,
        timings: {
          ...prevFormData.timings,
          [day]: prevFormData.timings[day].map((slotId, idx) =>
            idx === parseInt(index, 10) ? value : slotId
          ),
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleDaySelection = (day) => {
    setFormData((prevFormData) => {
      const newTimings = { ...prevFormData.timings };
      if (newTimings[day]) {
        delete newTimings[day];
      } else {
        newTimings[day] = ['', '', '', ''];
      }
      return {
        ...prevFormData,
        timings: newTimings,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/doctor/${doctor._id}`, formData);
      onSave(formData);
    } catch (error) {
      console.error('Error updating doctor details:', error);
    }
  };

  return (
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
        {daysOfWeek.map((day) => (
          <div key={day} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={!!formData.timings[day]}
                onChange={() => handleDaySelection(day)}
                className="mr-2"
              />
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
            {formData.timings[day] && (
              <div className="flex gap-2 mt-2">
                {formData.timings[day].map((slotId, index) => (
                  <div key={index}>
                    <label className="block text-sm">Slot {index + 1}:</label>
                    <select
                      name={`${day}.${index}`}
                      value={slotId}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md"
                    >
                      <option value="">Select Slot</option>
                      {slots.map((slotOption) => (
                        <option key={slotOption._id} value={slotOption._id}>
                          {slotOption.startTime} - {slotOption.endTime}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DoctorEditForm;
