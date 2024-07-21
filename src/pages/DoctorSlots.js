import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorSlots = ({ doctorId }) => {
    const [slots, setSlots] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const userId = "664f6291cb2347727158a7ad"; // Replace with dynamic user ID when implementing authentication

    useEffect(() => {
        const fetchDoctorSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctorSlot/${doctorId}`);
                setSlots(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching doctor slots:", error);
            }
        };

        fetchDoctorSlots();
    }, [doctorId]);

    const handleBookAppointment = async (slotId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/appointment/createAppointment', {
                userId,
                doctorSlotId: slotId
            });
            console.log(response.data);
            // Update slot booking status
            setSlots(slots.map(slot => slot._id === slotId ? { ...slot, booked: true } : slot));
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

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
                        {!slot.booked && (
                            <button
                                className="mt-4 p-2 bg-blue-500 text-white rounded"
                                onClick={() => handleBookAppointment(slot._id)}
                            >
                                Book Appointment
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorSlots;
