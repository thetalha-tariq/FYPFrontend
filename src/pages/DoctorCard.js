import React from 'react';

const DoctorCard = ({ doctor, onMakeAppointment }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => onMakeAppointment(doctor._id)}
                
            >
                Make Appointment
            </button>
        </div>
    );
};

export default DoctorCard;