import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveAppointment = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [promptMessage, setPromptMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/doctor/${doctorId}`);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleApprove = async (appointmentId) => {
    if (window.confirm('Are you sure you want to approve this appointment?')) {
      try {
        const response = await axios.put(`http://localhost:5000/api/appointment/${appointmentId}`, {
          status: 'Confirmed'
        });
        console.log('Appointment approved:', response.data);
        // Update the appointment status in the state
        setAppointments(appointments.map(appointment => 
          appointment._id === appointmentId ? { ...appointment, status: 'Confirmed' } : appointment
        ));

        // Show prompt message
        setPromptMessage('Confirmation Email Sent to User');
        setShowPrompt(true);
        // Hide prompt message after 5 seconds
        setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
      } catch (error) {
        console.error("Error approving appointment:", error);
      }
    }
  };

  if (appointments.length === 0) {
    return <div className="text-center mt-4">No appointments found.</div>;
  }

  return (
    <div className="mt-6 pl-6">
      <h2 className="text-xl font-bold mb-4">Approve Appointments</h2>
      {showPrompt && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{promptMessage}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className={`p-4 border rounded-lg shadow-md mb-2 ${appointment.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'}`}>
            <p><strong>Pet Owner Name:</strong> {appointment.name}</p>
            <p><strong>Pet Owner Email:</strong> {appointment.userId.email}</p>
            <p><strong>Pet Name:</strong> {appointment.petName}</p>
            <p><strong>Disease:</strong> {appointment.disease}</p>
            <p><strong>Status:</strong> <span className={`font-semibold ${appointment.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>{appointment.status}</span></p>
            <p><strong>Appointment Time:</strong> {appointment.doctorSlotId.slotId.startTime} - {appointment.doctorSlotId.slotId.endTime}</p>
            {appointment.status === 'Pending' && (
              <button
                onClick={() => handleApprove(appointment._id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Approve Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveAppointment;
