import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    const filteredUsers = sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 mb-6 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('email')}>
                            Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('userRole')}>
                            Role {sortConfig.key === 'userRole' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('createdAt')}>
                            Create Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">{user.userRole}</td>
                            <td className="py-2 px-4 border">{new Date(user.createdAt).toLocaleDateString()}</td>
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

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <nav className="flex items-center">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-4 py-2 border rounded-full ${currentPage === index + 1 ? 'bg-[#fac74f] text-white' : 'bg-white text-black border-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </nav>
            </div>

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
