import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddNewSlot = ({ doctorId, onClose }) => {
    const [allSlots, setAllSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({ slotId: '', date: '', day: '' });

    useEffect(() => {
        const fetchAllSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/slot/`);
                setAllSlots(response.data.data);
            } catch (error) {
                console.error("Error fetching all slots:", error);
            }
        };

        fetchAllSlots();
    }, []);

    const handleNewSlotChange = (e) => {
        setNewSlot({ ...newSlot, [e.target.name]: e.target.value });
    };

    const handleAddSlot = async () => {
        try {
            await axios.post(`http://localhost:5000/api/doctorSlot/createDoctorSlot`, {
                ...newSlot,
                doctorId
            });
            setNewSlot({ slotId: '', date: '', day: '' });
            onClose();
        } catch (error) {
            console.error("Error adding new slot:", error);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl mb-4">Add New Slot</h2>
                <select
                    name="slotId"
                    value={newSlot.slotId}
                    onChange={handleNewSlotChange}
                    className="p-2 border rounded w-full mb-2"
                >
                    <option value="">Select Slot</option>
                    {allSlots.map((slot) => (
                        <option key={slot._id} value={slot._id}>
                            {slot.startTime} - {slot.endTime}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="date"
                    value={newSlot.date}
                    onChange={handleNewSlotChange}
                    className="p-2 border rounded w-full mb-2"
                    min={today}  // Restrict dates before today
                />
                <input
                    type="text"
                    name="day"
                    value={newSlot.day}
                    onChange={handleNewSlotChange}
                    className="p-2 border rounded w-full mb-2"
                    placeholder="Day"
                />
                <button
                    className="p-2 bg-green-500 text-white rounded"
                    onClick={handleAddSlot}
                >
                    Add Slot
                </button>
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

export default AddNewSlot;
