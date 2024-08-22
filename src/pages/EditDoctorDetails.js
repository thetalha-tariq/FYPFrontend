import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditDoctorDetails = ({ doctorId, onClose, onDoctorDetailsUpdated }) => {
    const [doctorDetails, setDoctorDetails] = useState({});

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
                setDoctorDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchDoctorDetails();
    }, [doctorId]);

    const handleChange = (e) => {
        setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/doctor/${doctorId}`, doctorDetails);
            onDoctorDetailsUpdated(); 
            onClose();
        } catch (error) {
            console.error("Error updating doctor details:", error);
        }
    };

    return (
        <div className="m-30 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-full max-w-xl">
                <h2 className="text-2xl mb-4">Edit Doctor Details</h2>
                <label className="block mb-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={doctorDetails.name || ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                Specialization:
                    <input
                        type="text"
                        name="specialization"
                        value={doctorDetails.specialization || ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                Phone:
                    <input
                        type="text"
                        name="phone"
                        value={doctorDetails.phone || ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                Email:
                    <input
                        type="email"
                        name="email"
                        value={doctorDetails.email || ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                Address:
                    <input
                        type="text"
                        name="address"
                        value={doctorDetails.address || ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                Payment:
                    <input
                        type="text"
                        name="payment"
                        value={doctorDetails.payment || ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
                <button
                    className="mt-4 p-2 bg-green-500 text-white rounded"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className="mt-4 p-2 bg-red-500 text-white rounded ml-2"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditDoctorDetails;
