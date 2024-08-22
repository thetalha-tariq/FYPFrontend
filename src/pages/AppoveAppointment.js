import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveAppointment = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [onlineConsultations, setOnlineConsultations] = useState([]);
  const [promptMessage, setPromptMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [loadingIds, setLoadingIds] = useState([]); // Track loading for each item

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/doctor/${doctorId}`);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchOnlineConsultations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/onlineConsulting/doctor/${doctorId}`);
        setOnlineConsultations(response.data.data);
      } catch (error) {
        console.error("Error fetching online consultations:", error);
      }
    };

    fetchAppointments();
    fetchOnlineConsultations();
  }, [doctorId]);

  const handleApprove = async (appointmentId, isOnlineConsultation = false) => {
    if (window.confirm('Are you sure you want to approve this appointment?')) {
      setLoadingIds((prev) => [...prev, appointmentId]); // Mark as loading
      try {
        const response = await axios.put(`http://localhost:5000/api/${isOnlineConsultation ? 'onlineConsulting' : 'appointment'}/${appointmentId}`, {
          status: isOnlineConsultation ? undefined : 'Confirmed',
          approveByDoctor: isOnlineConsultation ? true : undefined,
        });
        console.log('Appointment approved:', response.data);

        // Update the appointment status in the state
        if (isOnlineConsultation) {
          setOnlineConsultations(onlineConsultations.map(consultation => 
            consultation._id === appointmentId ? { ...consultation, approveByDoctor: true } : consultation
          ));
        } else {
          setAppointments(appointments.map(appointment => 
            appointment._id === appointmentId ? { ...appointment, status: 'Confirmed' } : appointment
          ));
        }

        // Show prompt message
        setPromptMessage('Confirmation Email Sent to User');
        setShowPrompt(true);
        // Hide prompt message after 5 seconds
        setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
      } catch (error) {
        console.error("Error approving appointment:", error);
      } finally {
        setLoadingIds((prev) => prev.filter(id => id !== appointmentId)); // Remove from loading
      }
    }
  };

  return (
    <div className="mt-6 pl-6">
      {showPrompt && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{promptMessage}</div>}
      {appointments.length === 0 && onlineConsultations.length === 0 ? (
        <div className="text-center mt-4">No appointments found.</div>
      ) : (
        <div>
          
          <h2 className="text-xl font-bold mt-6 mb-4">Approve Online Consultations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {onlineConsultations.map((consultation) => (
              <div key={consultation._id} className={`p-4 border rounded-lg shadow-md mb-2 ${consultation.approveByDoctor ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <p><strong>Pet Owner Name:</strong> {consultation.name}</p>
                <p><strong>Pet Owner Email:</strong> {consultation.userId.email}</p>
                <p><strong>Pet Name:</strong> {consultation.petName}</p>
                <p><strong>Disease:</strong> {consultation.disease}</p>
                <p><strong>Status:</strong> <span className={`font-semibold ${consultation.approveByDoctor ? 'text-green-500' : 'text-yellow-500'}`}>{consultation.approveByDoctor ? 'Approved' : 'Pending'}</span></p>
                <p><strong>Consultation Time:</strong> {consultation.time}</p>
                <p><strong>Consultation Date:</strong> {consultation.date}</p>
                {consultation.approveByDoctor ? null : (
                  <button
                    onClick={() => handleApprove(consultation._id, true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    disabled={loadingIds.includes(consultation._id)} // Disable button if loading
                  >
                    {loadingIds.includes(consultation._id) ? 'Processing...' : 'Approve Consultation'}
                  </button>
                )}
              </div>
            ))}
          </div>
      <h2 className="text-xl font-bold mb-4">Approve Physical Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <div key={appointment._id} className={`p-4 border rounded-lg shadow-md mb-2 ${appointment.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                <p><strong>Pet Owner Name:</strong> {appointment.name}</p>
                <p><strong>Pet Owner Email:</strong> {appointment.userId.email}</p>
                <p><strong>Pet Name:</strong> {appointment.petName}</p>
                <p><strong>Disease:</strong> {appointment.disease}</p>
                <p><strong>Status:</strong> <span className={`font-semibold ${appointment.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>{appointment.status}</span></p>
                <p><strong>Appointment Time:</strong> {appointment.doctorSlotId.slotId.startTime} - {appointment.doctorSlotId.slotId.endTime}</p>
                <p><strong>Appointment Date:</strong>{appointment.doctorSlotId.slotId.date} </p>
                {appointment.status === 'Pending' && (
                  <button
                    onClick={() => handleApprove(appointment._id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    disabled={loadingIds.includes(appointment._id)} // Disable button if loading
                  >
                    {loadingIds.includes(appointment._id) ? 'Processing...' : 'Approve Appointment'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveAppointment;
