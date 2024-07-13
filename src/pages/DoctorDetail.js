import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorEditForm from './DoctorEditForm';

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor/668947a8b9ba356446d41ba4');
        setDoctor(response.data.data);

        // Fetch slot details
        await fetchSlotDetails(response.data.data.timings);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, []);

  const fetchSlotDetails = async (timings) => {
    try {
      const slotIds = [];
      Object.keys(timings).forEach((day) => {
        Object.keys(timings[day]).forEach((slot) => {
          if (timings[day][slot]) {
            slotIds.push(timings[day][slot]);
          }
        });
      });

      const slotResponses = await Promise.all(
        slotIds.map((id) => axios.get(`http://localhost:5000/api/slot/${id}`))
      );

      const slotDetails = {};
      slotResponses.forEach((response) => {
        slotDetails[response.data.data._id] = response.data.data;
      });

      setSlots(slotDetails);
    } catch (error) {
      console.error('Error fetching slot details:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (updatedDoctor) => {
    setDoctor(updatedDoctor);
    setIsEditing(false);

    // Fetch slot details for updated timings
    await fetchSlotDetails(updatedDoctor.timings);
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
                {Object.keys(doctor.timings[day]).map((slot) => (
                  <p key={slot}>
                    {`${slot}: ${
                      slots[doctor.timings[day][slot]]
                        ? `${slots[doctor.timings[day][slot]].startTime} - ${slots[doctor.timings[day][slot]].endTime}`
                        : doctor.timings[day][slot]
                    }`}
                  </p>
                ))}
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
        <DoctorEditForm doctor={doctor} onSave={handleSave} onCancel={handleEditToggle} />
      )}
    </div>
  );
};

export default DoctorDetail;
