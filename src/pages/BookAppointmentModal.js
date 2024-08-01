import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const BookAppointmentModal = ({ isOpen, onRequestClose, handleBookAppointment, selectedSlot }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [petName, setPetName] = useState('');
    const [disease, setDisease] = useState('');
    const [groomingServices, setGroomingServices] = useState({
        Bathing: false,
        HaircutTrimming: false,
        BrushingDeshedding: false,
        NailTrimming: false,
        EarCleaning: false,
        TeethBrushing: false,
        EyeCleaning: false,
    });
    const [otherService, setOtherService] = useState('');
    const [doctorRole, setDoctorRole] = useState('');

    useEffect(() => {
        const fetchDoctorRole = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctor/${selectedSlot.doctorId}`);
                setDoctorRole(response.data.data.role);
            } catch (error) {
                console.error('Error fetching doctor role:', error);
            }
        };

        if (selectedSlot.doctorId) {
            fetchDoctorRole();
        }
    }, [selectedSlot.doctorId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (doctorRole === 'groomer') {
            const selectedServices = Object.keys(groomingServices)
                .filter(service => groomingServices[service])
                .join(', ');

            const completeGroomingServices = otherService
                ? `${selectedServices}, ${otherService}`
                : selectedServices;

            handleBookAppointment({
                name,
                email,
                phone,
                petName,
                groomingServices: completeGroomingServices,
                doctorId: selectedSlot.doctorId
            });
        } else {
            handleBookAppointment({
                name,
                email,
                phone,
                petName,
                disease,
                doctorId: selectedSlot.doctorId
            });
        }
    };

    const handleGroomingServiceChange = (event) => {
        const { name, checked } = event.target;
        setGroomingServices({ ...groomingServices, [name]: checked });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Book Appointment">
            <h2 className="mt-10 text-2xl font-bold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {doctorRole === 'groomer' ? (
                    <div className="mb-4">
                        <label className="block text-gray-700">Grooming Services</label>
                        <div className="mt-2">
                            {Object.keys(groomingServices).map(service => (
                                <div key={service} className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name={service}
                                            checked={groomingServices[service]}
                                            onChange={handleGroomingServiceChange}
                                            className="form-checkbox"
                                        />
                                        <span className="ml-2">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Other Service</label>
                            <input
                                type="text"
                                value={otherService}
                                onChange={(e) => setOtherService(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mb-4">
                        <label className="block text-gray-700">Disease of Pet</label>
                        <input
                            type="text"
                            value={disease}
                            onChange={(e) => setDisease(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                )}
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Save</button>
            </form>
            <button className="mt-4 p-2 bg-gray-500 text-white rounded" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default BookAppointmentModal;
