import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [editDoctor, setEditDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctor/');
                setDoctors(response.data.data);
                setFilteredDoctors(response.data.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleEdit = (doctor) => {
        setEditDoctor(doctor);
        setShowModal(true);
    };

    const handleDelete = async (doctorId) => {
        try {
            await axios.delete(`http://localhost:5000/api/doctor/${doctorId}`);
            setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
            setFilteredDoctors(filteredDoctors.filter(doctor => doctor._id !== doctorId));
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    const handleUpdate = async (updatedDoctor) => {
        try {
            await axios.put(`http://localhost:5000/api/doctor/${updatedDoctor._id}`, updatedDoctor);
            setDoctors(doctors.map(doctor => doctor._id === updatedDoctor._id ? updatedDoctor : doctor));
            setFilteredDoctors(filteredDoctors.map(doctor => doctor._id === updatedDoctor._id ? updatedDoctor : doctor));
            setShowModal(false);
        } catch (error) {
            console.error("Error updating doctor:", error);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        filterDoctors(query);
    };

    const filterDoctors = (query) => {
        const filtered = doctors.filter((doctor) => {
            return (
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialization.toLowerCase().includes(query) ||
                doctor.email.toLowerCase().includes(query) ||
                doctor.phone.toLowerCase().includes(query) ||
                doctor.role.toLowerCase().includes(query)
            );
        });
        setFilteredDoctors(filtered);
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Manage Doctors</h2>
            <input
                type="text"
                placeholder="Search by any field"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-3 mb-6 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Specialization</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Phone</th>
                        <th className="py-2 px-4 border">Role</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.map((doctor) => (
                        <tr key={doctor._id}>
                            <td className="py-2 px-4 border">{doctor.name}</td>
                            <td className="py-2 px-4 border">{doctor.specialization}</td>
                            <td className="py-2 px-4 border">{doctor.email}</td>
                            <td className="py-2 px-4 border">{doctor.phone}</td>
                            <td className="py-2 px-4 border">{doctor.role}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => handleEdit(doctor)}
                                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(doctor._id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal doctor={editDoctor} onClose={() => setShowModal(false)} onSave={handleUpdate} />
            )}
        </div>
    );
};

const Modal = ({ doctor, onClose, onSave }) => {
    const [formData, setFormData] = useState(doctor);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Edit Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageDoctors;
