import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../Style/loader.css"

const OnlineConsulting = ({ userId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctorId } = location.state;
    const [doctorEmail, setDoctorEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        petName: '',
        disease: ''
    });
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        const fetchDoctorRole = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
                setDoctorEmail(response.data.data.email);
            } catch (error) {
                console.error('Error fetching doctor role:', error);
            }
        };

        if (doctorId) {
            fetchDoctorRole();
        }
    }, [doctorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        
        if (name === 'phone') {
            if (!value.startsWith('+92')) {
                setPhoneError('Phone number must start with +92');
            } else if (value.length !== 13) { 
                setPhoneError('Phone number must contain 10 digits after +92');
            } else {
                setPhoneError('');
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneError) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/onlineConsulting/create', {
                userId,
                doctorId,
                doctorEmail,
                ...formData
            });
            console.log(response.data);
            alert('You will be emailed when the doctor approves your appointment');
            navigate('/appointmentUser');
        } catch (error) {
            console.error("Error booking online consultation:", error);
        } finally {
            setLoading(false); // Hide the spinner
        }
    };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Online Consulting</h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="loader"></div> 
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={getTodayDate()}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Pet Name</label>
                        <input
                            type="text"
                            name="petName"
                            value={formData.petName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Disease</label>
                        <input
                            type="text"
                            name="disease"
                            value={formData.disease}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    );
};

export default OnlineConsulting;
