import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDoctorDetails from './EditDoctorDetails';

const DoctorDetail = ({ doctorId }) => {
    const [doctor, setDoctor] = useState(null);
    const [showEditDoctor, setShowEditDoctor] = useState(false);

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
                setDoctor(response.data.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchDoctorDetail();
    }, [doctorId]);

    const handleDoctorDetailsUpdated = () => {
        const fetchDoctorDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
                setDoctor(response.data.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchDoctorDetail();
    };

    if (!doctor) {
        return <div className="text-center">Loading doctor details...</div>;
    }

    return (
        <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{doctor.role === 'doctor' ? 'Doctor' : 'Groomer'} Details</h1>
                <div className="bg-white shadow-md rounded-lg p-4 flex">
                    <div className="flex-grow">
                        <p><strong>Name:</strong> {doctor.name}</p>
                        <p><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p><strong>Phone:</strong> {doctor.phone}</p>
                        <p><strong>Email:</strong> {doctor.email}</p>
                        <p><strong>Address:</strong> {doctor.address}</p>

                        <button
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                            onClick={() => setShowEditDoctor(true)}
                        >
                            Edit Doctor Details
                        </button>
                    </div>
                    {doctor.image && (
                        <div className="flex-shrink-0 ml-4">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="rounded-full w-32 h-32 object-cover"
                            />
                        </div>
                    )}
                </div>
                {showEditDoctor && (
                    <EditDoctorDetails
                        doctorId={doctorId}
                        onClose={() => setShowEditDoctor(false)}
                        onDoctorDetailsUpdated={handleDoctorDetailsUpdated}
                    />
                )}
            
        </div>
    );
};

export default DoctorDetail;
