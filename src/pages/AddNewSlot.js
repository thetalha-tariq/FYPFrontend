import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddNewSlot = ({ doctorId, onClose, onNewSlotAdded }) => {
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
        const { name, value } = e.target;
        setNewSlot((prevSlot) => ({
            ...prevSlot,
            [name]: value,
            day: name === 'date' ? getDayOfWeek(value) : prevSlot.day
        }));
    };

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const handleAddSlot = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/doctorSlot/createDoctorSlot`, {
                ...newSlot,
                doctorId
            });

            const addedSlot = response.data.data;

            const slotResponse = await axios.get(`http://localhost:5000/api/slot/${addedSlot.slotId}`);
            const slotDetails = slotResponse.data.data;

            const newSlotWithDetails = {
                ...addedSlot,
                startTime: slotDetails.startTime,
                endTime: slotDetails.endTime
            };

            setNewSlot({ slotId: '', date: '', day: '' });
            onClose();
            onNewSlotAdded(newSlotWithDetails);
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
                    readOnly // Make the day field read-only
                />
                <button
                    className="p-2 mr-2 bg-[#fac74f] text-white rounded"
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
