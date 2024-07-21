import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import AppointmentModal from './AppointmentModal';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctor');
                setDoctors(response.data.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleMakeAppointment = async (doctorId) => {
        setSelectedDoctorId(doctorId);
        setIsModalOpen(true);
        setSlots([]); // Reset slots before fetching new ones

        try {
            const response = await axios.get(`http://localhost:5000/api/doctorSlot/${doctorId}`);
            console.log(response.data.data)
            setSlots(response.data.data);
        } catch (error) {
            console.error("Error fetching doctor slots:", error);
        }
    };

    const handleBookAppointment = async (doctorSlotId) => {
        const userId = "664f6291cb2347727158a7ad"; // Replace with dynamic user ID when implementing authentication

        try {
            const response = await axios.post('http://localhost:5000/api/appointment/createAppointment', {
                userId,
                doctorSlotId
            });
            console.log(response.data);
            // Update slot booking status
            setSlots(slots.map(slot => slot._id === doctorSlotId ? { ...slot, booked: true } : slot));
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Doctors</h1>
            {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} onMakeAppointment={handleMakeAppointment} />
            ))}
            {isModalOpen && (
                <AppointmentModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    doctorId={selectedDoctorId}
                    slots={slots}
                    handleBookAppointment={handleBookAppointment}
                />
            )}
        </div>
    );
};

export default DoctorList;
