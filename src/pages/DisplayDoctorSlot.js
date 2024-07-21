import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDoctorDetails from './EditDoctorDetails';
import ManageSlots from './ManageSlots';
import AddNewSlot from './AddNewSlot';

const DisplayDoctorSlot = ({ doctorId }) => {
    const [slots, setSlots] = useState([]);
    const [showEditDoctor, setShowEditDoctor] = useState(false);
    const [showManageSlots, setShowManageSlots] = useState(false);
    const [showAddNewSlot, setShowAddNewSlot] = useState(false);

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

    if (slots.length === 0) {
        return <div className="text-center mt-4">No slots available for this doctor.</div>;
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Available Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot) => (
                    <div key={slot._id} className={`p-4 border rounded-lg ${slot.booked ? 'bg-red-100' : 'bg-green-100'}`}>
                        <p><strong>Day:</strong> {slot.day}</p>
                        <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
                        <p><strong>Booked:</strong> {slot.booked ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => setShowEditDoctor(true)}
            >
                Edit Doctor Details
            </button>
            <button
                className="mt-4 p-2 bg-yellow-500 text-white rounded ml-2"
                onClick={() => setShowManageSlots(true)}
            >
                Manage Existing Slots
            </button>
            <button
                className="mt-4 p-2 bg-green-500 text-white rounded ml-2"
                onClick={() => setShowAddNewSlot(true)}
            >
                Add New Slot
            </button>

            {showEditDoctor && (
                <EditDoctorDetails
                    doctorId={doctorId}
                    onClose={() => setShowEditDoctor(false)}
                />
            )}
            {showManageSlots && (
                <ManageSlots
                    doctorId={doctorId}
                    onClose={() => setShowManageSlots(false)}
                />
            )}
            {showAddNewSlot && (
                <AddNewSlot
                    doctorId={doctorId}
                    onClose={() => setShowAddNewSlot(false)}
                />
            )}
        </div>
    );
};

export default DisplayDoctorSlot;
