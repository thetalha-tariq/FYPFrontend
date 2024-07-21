import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayDoctorSlot from './DisplayDoctorSlot';

const DoctorDetail = ({ doctorId }) => {
    const [doctor, setDoctor] = useState(null);

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

    if (!doctor) {
        return <div className="text-center">Loading doctor details...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Phone:</strong> {doctor.phone}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
            </div>
            <DisplayDoctorSlot doctorId={doctorId} />
        </div>
    );
};

export default DoctorDetail;
