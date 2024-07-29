import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointment');
                setAppointments(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleDelete = async (appointmentId) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await axios.delete(`http://localhost:5000/api/appointment/${appointmentId}`);
                setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
            } catch (error) {
                console.error("Error deleting appointment:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (appointments.length === 0) {
        return <div>No appointments found.</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Appointments</h2>
            <div className="space-y-4">
                {appointments.map((appointment) => (
                    <div key={appointment._id} className="p-4 border rounded-lg shadow-md bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{appointment.petName}</h3>
                            <button
                                onClick={() => handleDelete(appointment._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                        <p className="mt-2"><strong>Doctor:</strong> {appointment.doctorId.name}</p>
                        <p><strong>Doctor Email:</strong> {appointment.doctorId.email}</p>
                        <p><strong>User:</strong> {appointment.userId.name}</p>
                        <p><strong>User Email:</strong> {appointment.userId.email}</p>
                        <p><strong>Time:</strong> {appointment.doctorSlotId.slotId.startTime} - {appointment.doctorSlotId.slotId.endTime}</p>
                        <p><strong>Disease:</strong> {appointment.disease}</p>
                        {appointment.groomingService && <p><strong>Grooming Service:</strong> {appointment.groomingService}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAppointment;
