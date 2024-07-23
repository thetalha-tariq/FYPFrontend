import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/');
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
        setShowModal(true);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = async (updatedUser) => {
        try {
            await axios.put(`http://localhost:5000/api/user/${updatedUser._id}`, updatedUser);
            setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
            setShowModal(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Role</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">{user.userRole}</td>
                            <td className="py-2 px-4 border">
                                <button 
                                    onClick={() => handleEdit(user)} 
                                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                                <button 
                                    onClick={() => handleDelete(user._id)} 
                                    className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal user={editUser} onClose={() => setShowModal(false)} onSave={handleUpdate} />
            )}
        </div>
    );
};

const Modal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user);

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
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <input 
                            type="text" 
                            name="userRole" 
                            value={formData.userRole} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageUsers;
