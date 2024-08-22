import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDoctorDetails from './EditDoctorDetails';

const DoctorDetail = ({ doctorId }) => {
    const [doctor, setDoctor] = useState(null);
    const [showEditDoctor, setShowEditDoctor] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [imageFile, setImageFile] = useState(null);

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

    const handleChangePassword = async () => {
        try {
            await axios.put(`http://localhost:5000/api/doctor/${doctorId}/changePassword`, { newPassword });
            alert('Password updated successfully');
            setShowChangePassword(false);
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password');
        }
    };

    const handleUploadPhoto = async () => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            await axios.put(`http://localhost:5000/api/doctor/${doctorId}/uploadPhoto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Photo uploaded successfully');
            handleDoctorDetailsUpdated();  // Refresh doctor details to show the new photo
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error uploading photo');
        }
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
                    <p><strong>Payment Per Appointment:</strong> {doctor.payment}</p>
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
                            src={`http://localhost:5000/uploads/DoctorImage/${doctor.image}`}
                            alt={doctor.name}
                            className="rounded-full w-32 h-32 object-cover"
                        />
                        
                        <div className="mt-4">
                            <input
                                type="file"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                            <button
                                className="mt-2 p-2 bg-yellow-500 text-white rounded"
                                onClick={handleUploadPhoto}
                            >
                                Upload Photo
                            </button>
                        </div>
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
