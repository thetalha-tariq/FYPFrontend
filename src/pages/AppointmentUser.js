import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentUser = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [onlineConsultations, setOnlineConsultations] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/user/${userId}`);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchOnlineConsultations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/onlineConsulting/user/${userId}`);
        setOnlineConsultations(response.data.data);
      } catch (error) {
        console.error("Error fetching online consultations:", error);
      }
    };

    fetchAppointments();
    fetchOnlineConsultations();
  }, [userId]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedType, selectedDate, appointments, onlineConsultations]);

  const applyFilters = () => {
    const lowercasedQuery = searchQuery.toLowerCase();

    let filteredApps = appointments.filter(appointment => 
      appointment.petName.toLowerCase().includes(lowercasedQuery) ||
      appointment.doctorSlotId.doctorId.name.toLowerCase().includes(lowercasedQuery) ||
      (appointment.disease && appointment.disease.toLowerCase().includes(lowercasedQuery))
    );

    let filteredCons = onlineConsultations.filter(consultation => 
      consultation.petName.toLowerCase().includes(lowercasedQuery) ||
      consultation.doctorId.name.toLowerCase().includes(lowercasedQuery) ||
      (consultation.disease && consultation.disease.toLowerCase().includes(lowercasedQuery))
    );

    if (selectedType === 'Physical Visit') {
      filteredCons = [];
    } else if (selectedType === 'Online Appointment') {
      filteredApps = [];
    }

    if (selectedDate) {
      filteredApps = filteredApps.filter(appointment => appointment.doctorSlotId.slotId.date === selectedDate);
      filteredCons = filteredCons.filter(consultation => consultation.date === selectedDate);
    }

    setFilteredAppointments(filteredApps);
    setFilteredConsultations(filteredCons);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleViewDetail = (consultingID) => {
    navigate(`/OnlineAppointmentDetail/${consultingID}`);
  };

  return (
    <div className="mt-6 pl-6">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>

      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by doctor name, pet name, etc."
          className="w-full max-w-md p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select value={selectedType} onChange={handleTypeChange} className="p-3 border rounded-full shadow-sm">
          <option value="All">All</option>
          <option value="Physical Visit">Physical Visit</option>
          <option value="Online Appointment">Online Appointment</option>
        </select>
      </div>

      {filteredAppointments.length === 0 && filteredConsultations.length === 0 ? (
        <div className="text-center mt-4">No appointments or online consultations found.</div>
      ) : (
        <div>
          {selectedType !== 'Physical Visit' && filteredConsultations.length > 0 && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-4">Your Online Consultations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConsultations.map((consultation) => (
                  <div
                    key={consultation._id}
                    className={`p-4 border rounded-lg shadow-md mb-2 ${consultation.approveByDoctor ? 'bg-green-100' : 'bg-yellow-100'}`}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold">{consultation.petName}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${consultation.approveByDoctor ? 'bg-green-500' : 'bg-yellow-500'}`}
                      >
                        {consultation.approveByDoctor ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="mt-2">
                      <strong>Doctor:</strong> {consultation.doctorId.name}
                    </p>
                    <p>
                      <strong>Date:</strong> {consultation.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {consultation.time}
                    </p>
                    <p>
                      <strong>Disease:</strong> {consultation.disease}
                    </p>
                    <div className="flex justify-between mt-2">
                      <button
                        className={`px-4 py-2 rounded text-white ${consultation.approveByDoctor ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!consultation.approveByDoctor}
                      >
                        Pay for Appointment
                      </button>
                      <button
                        className="text-blue-500 underline"
                        onClick={() => handleViewDetail(consultation._id)}
                      >
                        Appointment Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {selectedType !== 'Online Appointment' && filteredAppointments.length > 0 && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-4">Your Physical Visit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className={`p-4 border rounded-lg shadow-md mb-2 ${appointment.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'}`}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold">{appointment.petName}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <p className="mt-2">
                      <strong>Doctor:</strong> {appointment.doctorSlotId.doctorId.name}
                    </p>
                    <p>
                      <strong>Date:</strong> {appointment.doctorSlotId.slotId.date} 
                    </p>
                    <p>
                      <strong>Time:</strong> {appointment.doctorSlotId.slotId.startTime} - {appointment.doctorSlotId.slotId.endTime}
                    </p>
                    <p>
                      <strong>Disease:</strong> {appointment.disease}
                    </p>
                    {appointment.groomingServices && (
                      <p>
                        <strong>Grooming Service:</strong> {appointment.groomingServices}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentUser;
