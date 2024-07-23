import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUserContacts = () => {
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    fetchUserContacts();
  }, []);

  const fetchUserContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/userContactData/');
      setUserContacts(response.data.data);
    } catch (error) {
      console.error("Error fetching user contact data", error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user-contact-data/${userId}`);
      fetchUserContacts();  // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user contact data", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Manage User Contacts</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Message</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userContacts.map((contact) => (
            <tr key={contact._id}>
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.phone}</td>
              <td className="border px-4 py-2">{contact.message}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteClick(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUserContacts;
