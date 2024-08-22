import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookAppointmentModal from './BookAppointmentModal';

const MakeAppointment = ({ userId }) => {
    const { doctorId } = useParams();
    const [slots, setSlots] = useState([]);
    const [detailedSlots, setDetailedSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Fetch slots once when the component mounts
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                console.log("slot->doctorId", doctorId);
                
                const response = await axios.get(`http://localhost:5000/api/doctorSlot/${doctorId}`);
               
                setSlots(response.data.data);
            } catch (error) {
                console.error("Error fetching doctor slots:", error);
            }
        };

        fetchSlots();
    }, [doctorId]); // This only runs when doctorId changes

    // Fetch slot details when slots are fetched
    useEffect(() => {
        if (slots.length === 0) {
            setIsLoading(false);
            return;
        }

        const fetchSlotDetails = async () => {
            try {
                const slotDetailsPromises = slots.map(async (slot) => {
                    console.log("slot->slotId", slot.slotId);
                    const slotResponse = await axios.get(`http://localhost:5000/api/slot/${slot.slotId}`);
                    const slotDetails = slotResponse.data.data;
                    console.log(slotResponse.data.data);
                    return {
                        ...slot,
                        startTime: slotDetails.startTime,
                        endTime: slotDetails.endTime,
                    };
                });

                const slotsWithDetails = await Promise.all(slotDetailsPromises);
                setDetailedSlots(slotsWithDetails);
            } catch (error) {
                console.error("Error fetching slot details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSlotDetails();
    }, [slots]); // This only runs when slots change

    const openBookingModal = (slot) => {
        setSelectedSlot(slot);
        setIsBookModalOpen(true);
    };

    const handleBookAppointment = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/appointment/createAppointment', {
                userId: userId, // You can adjust this based on your state management
                doctorSlotId: selectedSlot._id,
                doctorId: selectedSlot.doctorId,
                ...userData,
            });
            console.log(response.data);
            setSlots(slots.map(slot => slot._id === selectedSlot._id ? { ...slot, booked: true } : slot));
            setIsBookModalOpen(false);
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
            {isLoading ? (
                <div className="text-center mt-4">Loading slots...</div>
            ) : detailedSlots.length === 0 ? (
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
                                    onClick={() => openBookingModal(slot)}
                                >
                                    Book Appointment
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <BookAppointmentModal
                isOpen={isBookModalOpen}
                onRequestClose={() => setIsBookModalOpen(false)}
                handleBookAppointment={handleBookAppointment}
                selectedSlot={selectedSlot}
            />
        </div>
    );
};

export default MakeAppointment;
