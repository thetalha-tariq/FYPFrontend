import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "../Style/loader.css";
import "../Style/fancyScrollbar.css";

const BookAppointmentModal = ({ isOpen, onRequestClose, handleBookAppointment, selectedSlot }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
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
    const [doctorEmail, setDoctorEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDoctorRole = async () => {
            if (selectedSlot && selectedSlot.doctorId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/doctor/${selectedSlot.doctorId}`);
                    setDoctorRole(response.data.data.role);
                    setDoctorEmail(response.data.data.email);
                } catch (error) {
                    console.error('Error fetching doctor role:', error);
                }
            }
        };

        fetchDoctorRole();
    }, [selectedSlot]);

    const validatePhone = (phone) => {
        const regex = /^\+92\d{10}$/;
        if (!regex.test(phone)) {
            setPhoneError('Phone number must be in the format +92XXXXXXXXXX');
        } else {
            setPhoneError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        validatePhone(phone);
        if (phoneError) return; // Stop form submission if there's a phone error

        setLoading(true);

        try {
            if (doctorRole === 'groomer') {
                const selectedServices = Object.keys(groomingServices)
                    .filter(service => groomingServices[service])
                    .join(', ');

                const completeGroomingServices = otherService
                    ? `${selectedServices}, ${otherService}`
                    : selectedServices;

                await handleBookAppointment({
                    name,
                    email,
                    phone,
                    petName,
                    groomingServices: completeGroomingServices,
                    doctorId: selectedSlot.doctorId,
                    doctorEmail
                });
            } else {
                await handleBookAppointment({
                    name,
                    email,
                    phone,
                    petName,
                    disease,
                    doctorId: selectedSlot.doctorId,
                    doctorEmail
                });
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGroomingServiceChange = (event) => {
        const { name, checked } = event.target;
        setGroomingServices({ ...groomingServices, [name]: checked });
    };

    if (!selectedSlot) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Book Appointment"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '10px',
                    maxWidth: '700px',
                    width: '100%',
                    overflow: 'auto',
                }
            }}
        >
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
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
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        validatePhone(e.target.value);
                                    }}
                                    className="w-full p-2 border rounded"
                                    required
                                    placeholder="+92XXXXXXXXXX"
                                />
                                {phoneError && (
                                    <p className="text-red-500 text-sm">{phoneError}</p>
                                )}
                            </div>
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
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    {Object.keys(groomingServices).map(service => (
                                        <div key={service}>
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
                        <button type="submit" className="mt-4 p-2 bg-yellow-500 text-white rounded">Save</button>
                    </form>
                    <button className="mt-4 p-2 bg-gray-500 text-white rounded" onClick={onRequestClose}>
                        Close
                    </button>
                </>
            )}
        </Modal>
    );
};

export default BookAppointmentModal;
