import React from 'react';
import Modal from 'react-modal';

const AppointmentDetailModal = ({ appointment, onClose }) => {
  const isOnlineAppointment = appointment.doctorId !== undefined;

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Appointment Detail"
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Appointment Detail</h2>
        {isOnlineAppointment ? (
          <div>
            <p><strong>Doctor Name:</strong> {appointment.doctorId.name}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Name:</strong> {appointment.userId.name}</p>
            <p><strong>Email:</strong> {appointment.userId.email}</p>
            <p><strong>Phone:</strong> {appointment.userId.phone}</p>
            <p><strong>Pet Name:</strong> {appointment.petName}</p>
            <p><strong>Disease:</strong> {appointment.disease}</p>
            {appointment.meetingLink && (
              <p><strong>Meeting Link:</strong> <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Join Meeting</a></p>
            )}
            <p><strong>Status:</strong> {appointment.approveByDoctor ? 'Approved' : 'Pending'}</p>
          </div>
        ) : (
          <div>
            <p><strong>Doctor Name:</strong> {appointment.doctorSlotId.doctorId.name}</p>
            <p><strong>Date:</strong> {appointment.doctorSlotId.slotId.date}</p>
            <p><strong>Time:</strong> {appointment.doctorSlotId.slotId.startTime} - {appointment.doctorSlotId.slotId.endTime}</p>
            <p><strong>Name:</strong> {appointment.userId.name}</p>
            <p><strong>Email:</strong> {appointment.userId.email}</p>
            <p><strong>Phone:</strong> {appointment.userId.phone}</p>
            <p><strong>Pet Name:</strong> {appointment.petName}</p>
            <p><strong>Disease:</strong> {appointment.disease}</p>
            {appointment.groomingServices && (
              <p><strong>Grooming Services:</strong> {appointment.groomingServices.join(', ')}</p>
            )}
            <p><strong>Status:</strong> {appointment.status}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AppointmentDetailModal;