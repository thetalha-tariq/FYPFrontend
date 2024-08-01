import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AppointmentModal = ({ isOpen, onRequestClose, doctorId, slots, handleOpenBookModal }) => {
    const [detailedSlots, setDetailedSlots] = useState([]);

    useEffect(() => {
        const fetchSlotDetails = async () => {
            try {
                const slotDetailsPromises = slots.map(async (slot) => {
                    const slotResponse = await axios.get(`http://localhost:5000/api/slot/${slot.slotId}`);
                    const slotDetails = slotResponse.data.data;

                    return {
                        ...slot,
                        startTime: slotDetails.startTime,
                        endTime: slotDetails.endTime
                    };
                });

                const slotsWithDetails = await Promise.all(slotDetailsPromises);
                setDetailedSlots(slotsWithDetails);
            } catch (error) {
                console.error("Error fetching slot details:", error);
            }
        };

        if (slots.length > 0) {
            fetchSlotDetails();
        } else {
            setDetailedSlots([]);
        }
    }, [slots]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Book Appointment">
            <h2 className="text-2xl font-bold mb-4 mt-10">Available Slots</h2>
            {detailedSlots.length === 0 ? (
                <div className="text-center mt-4">No slots available for this doctor.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {detailedSlots.map((slot) => (
                        <div key={slot._id} className={`p-4 border rounded-lg ${slot.booked ? 'bg-red-100' : 'bg-green-100'}`}>
                            <p><strong>Day:</strong> {slot.day}</p>
                            <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
                            <p><strong>Booked:</strong> {slot.booked ? 'Yes' : 'No'}</p>
                            {!slot.booked && (
                                <button
                                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                                    onClick={() => handleOpenBookModal(slot)}
                                >
                                    Book Appointment
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <button className="mt-4 p-2 bg-gray-500 text-white rounded" onClick={onRequestClose}>
                Close
            </button>
        </Modal>
    );
};

export default AppointmentModal;
