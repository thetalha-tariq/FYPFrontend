import React from 'react';

const DoctorCard = ({ doctor, onMakeAppointment, onOnlineConsulting }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <img 
                src={doctor.image} 
                alt={`${doctor.name}`} 
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Address:</strong> {doctor.address}</p>
            
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => onMakeAppointment(doctor._id)}
            >
                Make Appointment
            </button>
            {doctor.role === 'doctor' && (
                <button
                    className="mt-4 p-2 bg-green-500 text-white rounded ml-2"
                    onClick={onOnlineConsulting}
                >
                    Online Consulting
                </button>
            )}
        </div>
    );
};

export default DoctorCard;
