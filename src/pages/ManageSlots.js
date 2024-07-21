import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSlots = ({ doctorId, onClose }) => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchDoctorSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctorSlot/${doctorId}`);
                const doctorSlots = response.data.data;

                const slotDetailsPromises = doctorSlots.map(async (doctorSlot) => {
                    const slotResponse = await axios.get(`http://localhost:5000/api/slot/${doctorSlot.slotId}`);
                    const slotDetails = slotResponse.data.data;

                    return {
                        ...doctorSlot,
                        startTime: slotDetails.startTime,
                        endTime: slotDetails.endTime
                    };
                });

                const slotsWithDetails = await Promise.all(slotDetailsPromises);
                setSlots(slotsWithDetails);
            } catch (error) {
                console.error("Error fetching doctor slots:", error);
            }
        };

        fetchDoctorSlots();
    }, [doctorId]);

    

    const handleDeleteSlot = async (slotId) => {
        try {
            await axios.delete(`http://localhost:5000/api/doctorSlot/${slotId}`);
            setSlots(slots.filter(slot => slot._id !== slotId));
        } catch (error) {
            console.error("Error deleting slot:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl mb-4">Manage Existing Slots</h2>
                {slots.map((slot) => (
                    <div key={slot._id} className="p-4 border rounded-lg mb-2">
                        <p><strong>Day:</strong> {slot.day}</p>
                        <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
                        <p><strong>Booked:</strong> {slot.booked ? 'Yes' : 'No'}</p>
                        
                        <button
                            className="p-2 bg-red-500 text-white rounded"
                            onClick={() => handleDeleteSlot(slot._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    className="mt-4 p-2 bg-red-500 text-white rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ManageSlots;
