import React, { useState } from 'react';
import Modal from 'react-modal';

const BookAppointmentModal = ({ isOpen, onRequestClose, handleBookAppointment, selectedSlot }) => { // Add selectedSlot to props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [petName, setPetName] = useState('');
    const [disease, setDisease] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleBookAppointment({ name, email, phone, petName, disease, doctorId: selectedSlot.doctorId }); // Include doctorId in userData
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Book Appointment">
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
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Save</button>
            </form>
            <button className="mt-4 p-2 bg-gray-500 text-white rounded" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default BookAppointmentModal;
