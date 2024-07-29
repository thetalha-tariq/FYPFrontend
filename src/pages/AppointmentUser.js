import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentUser = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [promptMessage, setPromptMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/user/${userId}`);
        console.log(response.data.data);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleAction = (message) => {
    setPromptMessage(message);
    setShowPrompt(true);
    setTimeout(() => {
      setShowPrompt(false);
    }, 5000);
  };

  return (
    <div className="mt-6 pl-6">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
      {showPrompt && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {promptMessage}
        </div>
      )}
      {appointments.length === 0 ? (
        <div className="text-center mt-4">No appointments found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className={`p-4 border rounded-lg shadow-md mb-2 ${appointment.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'}`}
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">{appointment.petName}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-white ${appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}
                >
                  {appointment.status}
                </span>
              </div>
              <p className="mt-2">
                <strong>Doctor:</strong> {appointment.doctorSlotId.doctorId.name}
              </p>
              <p>
                <strong>Time:</strong> {appointment.doctorSlotId.slotId.startTime} - {appointment.doctorSlotId.slotId.endTime}
              </p>
              <p>
                <strong>Disease:</strong> {appointment.disease}
              </p>
              {appointment.groomingService && (
                <p>
                  <strong>Grooming Service:</strong> {appointment.groomingService}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentUser;
