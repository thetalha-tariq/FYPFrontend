import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import AppointmentModal from './AppointmentModal';
import BookAppointmentModal from './BookAppointmentModal'; // Import the new modal

const DoctorList = ({ userId }) => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false); // State for new modal
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null); // State for selected slot
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctor');
                setDoctors(response.data.data);
                setFilteredDoctors(response.data.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        filterDoctors(query, selectedRole);
    };

    const handleRoleChange = (event) => {
        const role = event.target.value;
        setSelectedRole(role);
        filterDoctors(searchQuery, role);
    };

    const filterDoctors = (query, role) => {
        const filtered = doctors.filter((doctor) => {
            const matchesQuery = doctor.name.toLowerCase().includes(query) ||
                doctor.specialization.toLowerCase().includes(query) ||
                doctor.address.toLowerCase().includes(query);
            const matchesRole = role === 'all' || doctor.role === role;
            return matchesQuery && matchesRole;
        });
        setFilteredDoctors(filtered);
    };

    const handleMakeAppointment = async (doctorId) => {
        setSelectedDoctorId(doctorId);
        setIsModalOpen(true);
        setSlots([]); // Reset slots before fetching new ones

        try {
            const response = await axios.get(`http://localhost:5000/api/doctorSlot/${doctorId}`);
            setSlots(response.data.data);
        } catch (error) {
            console.error("Error fetching doctor slots:", error);
        }
    };

    const handleOpenBookModal = (slot) => {
        setSelectedSlot({ ...slot, doctorId: selectedDoctorId }); // Include doctorId in selected slot
        setIsBookModalOpen(true);
    };

    const handleBookAppointment = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/appointment/createAppointment', {
                userId, // Use userId from props
                doctorSlotId: selectedSlot._id,
                doctorId: selectedSlot.doctorId, // Add doctorId here
                ...userData // Spread user data
            });
            console.log(response.data);
            // Update slot booking status
            setSlots(slots.map(slot => slot._id === selectedSlot._id ? { ...slot, booked: true } : slot));
            setIsBookModalOpen(false); // Close the booking modal
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeBookModal = () => {
        setIsBookModalOpen(false);
    };

    const handleOnlineConsulting = () => {
        navigate('/onlineAppointment');
    };

    const handleYourAppointments = () => {
        navigate('/appointmentUser');
    };

    return (
        <div style={{ paddingTop:"10px"}}>
            <div className="flex justify-center mb-6 space-x-4">
                <input
                    type="text"
                    placeholder="Search by name, specialization, or address"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full max-w-md p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All</option>
                    <option value="doctor">Doctor</option>
                    <option value="groomer">Groomer</option>
                </select>
                <button
                    onClick={handleYourAppointments}
                    className="p-2 bg-[#fac74f] text-white rounded-full shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    Your Appointments
                </button>
            </div>
            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredDoctors.map((doctor) => (
                    <DoctorCard
                        key={doctor._id}
                        doctor={doctor}
                        onMakeAppointment={handleMakeAppointment}
                        onOnlineConsulting={handleOnlineConsulting} // Pass the new handler
                    />
                ))}
            </div>
            {isModalOpen && (
                <AppointmentModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    doctorId={selectedDoctorId}
                    slots={slots}
                    handleOpenBookModal={handleOpenBookModal} // Pass the new handler
                />
            )}
            {isBookModalOpen && (
                <BookAppointmentModal
                    isOpen={isBookModalOpen}
                    onRequestClose={closeBookModal}
                    handleBookAppointment={handleBookAppointment}
                    selectedSlot={selectedSlot} // Pass the selected slot
                    doctorId={selectedDoctorId}
                />
            )}
        </div>
    );
};

export default DoctorList;
