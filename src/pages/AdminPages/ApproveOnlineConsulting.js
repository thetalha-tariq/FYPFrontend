import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveOnlineConsulting = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/onlineConsulting');
        setConsultations(response.data.data);
        setFilteredConsultations(response.data.data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, []);

  useEffect(() => {
    filterConsultations();
  }, [searchTerm, statusFilter, consultations]);

  const filterConsultations = () => {
    let filtered = consultations;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(consultation => 
        consultation.doctorId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.petName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(consultation => 
        (statusFilter === 'Paid' && consultation.isPayed) ||
        (statusFilter === 'Pending Payment' && consultation.approveByDoctor && !consultation.isPayed) ||
        (statusFilter === 'Pending Doctor Approval' && !consultation.approveByDoctor)
      );
    }

    setFilteredConsultations(filtered);
  };

  const handleApprovePayment = async (consultationId) => {
    if (window.confirm('Are you sure you want to approve this payment?')) {
      setLoading(true); // Show loader
      try {
        const response = await axios.put(`http://localhost:5000/api/onlineConsulting/approvePayment/${consultationId}`, {
          isPayed: true,
        });

        setConsultations(consultations.map(consultation =>
          consultation._id === consultationId ? { ...consultation, isPayed: true } : consultation
        ));

        // Update filtered consultations as well
        filterConsultations();
      } catch (error) {
        console.error("Error approving payment:", error);
      } finally {
        setLoading(false); // Hide loader
      }
    }
  };

  return (
    <div className="mt-12 pl-6">
      <h2 className="text-xl font-bold mb-4">Approve Online Consultations</h2>
      
      {/* Search and Filter Controls */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by Doctor, Pet Owner, or Pet Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mr-3 p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending Payment">Pending Payment</option>
          <option value="Pending Doctor Approval">Pending Doctor Approval</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      {!loading && filteredConsultations.length === 0 ? (
        <div className="text-center mt-4">No online consultations found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConsultations.map((consultation) => (
            <div
              key={consultation._id}
              className={`p-4 border rounded-lg shadow-md mb-2 ${consultation.isPayed ? 'bg-green-100' : consultation.approveByDoctor ? 'bg-yellow-100' : 'bg-red-100'}`}
            >
              <p><strong>Doctor Name:</strong> {consultation.doctorId.name}</p>
              <p><strong>Doctor Email:</strong> {consultation.doctorId.email}</p>
              <p><strong>Pet Owner Name:</strong> {consultation.name}</p>
              <p><strong>Pet Owner Email:</strong> {consultation.userId.email}</p>
              <p><strong>Pet Name:</strong> {consultation.petName}</p>
              <p><strong>Disease:</strong> {consultation.disease}</p>
              <p><strong>Status:</strong> <span className={`font-semibold ${consultation.isPayed ? 'text-green-500' : consultation.approveByDoctor ? 'text-yellow-500' : 'text-red-500'}`}>{consultation.isPayed ? 'Paid' : consultation.approveByDoctor ? 'Pending Payment' : 'Pending Doctor Approval'}</span></p>
              <p><strong>Consultation Date:</strong> {consultation.date}</p>
              <p><strong>Consultation Time:</strong> {consultation.time}</p>
              {consultation.approveByDoctor && !consultation.isPayed && (
                <button
                  onClick={() => handleApprovePayment(consultation._id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Processing...' : 'Approve Payment'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApproveOnlineConsulting;
