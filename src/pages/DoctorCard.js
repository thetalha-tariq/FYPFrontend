import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
    const navigate = useNavigate();

    const handleMakeAppointment = () => {
        navigate(`/makeAppointment/${doctor._id}`);
    };

    return (
        <div className="border rounded-lg p-4 mb-4">
            <img 
                src={`http://localhost:5000/uploads/DoctorImage/${doctor.image}`} 
                alt={`${doctor.name}`} 
                className="w-full h-auto object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Address:</strong> {doctor.address}</p>
            <p><strong>Payment: </strong>{doctor.payment}</p>
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={handleMakeAppointment}
            >
                Make Appointment
            </button>
            {doctor.role === 'doctor' && (
                <button
                    className="mt-4 p-2 bg-green-500 text-white rounded ml-2"
                    onClick={() => navigate('/onlineAppointment', { state: { doctorId: doctor._id } })}
                >
                    Online Consulting
                </button>
            )}
        </div>
    );
};

export default DoctorCard;
