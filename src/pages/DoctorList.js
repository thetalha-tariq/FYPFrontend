import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import AppointmentModal from './AppointmentModal';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [slots, setSlots] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');

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
                    class="p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="all">All</option>
                    <option value="doctor">Doctor</option>
                    <option value="groomer">Groomer</option>
                </select>
            </div>
            <div className="grid grid-cols-1 p:15px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} onMakeAppointment={handleMakeAppointment} />
                ))}
            </div>
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
