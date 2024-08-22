import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OnlineAppointmentDetail = () => {
  const { consultingID } = useParams();
  const [appointmentDetail, setAppointmentDetail] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/onlineConsulting/${consultingID}`);
        setAppointmentDetail(response.data.data);
        console.log("Detail",response.data.data)
      } catch (error) {
        console.error("Error fetching appointment detail:", error);
      }
    };

    fetchAppointmentDetail();
  }, [consultingID]);

  if (!appointmentDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Appointment Detail</h2>
      <div className="border rounded-lg shadow-md p-4">
        <p>
          <strong>Doctor:</strong> {appointmentDetail.doctorId.name}
        </p>
        <p>
          <strong>Date:</strong> {appointmentDetail.date}
        </p>
        <p>
          <strong>Time:</strong> {appointmentDetail.time}
        </p>
        <p>
          <strong>Name:</strong> {appointmentDetail.name}
        </p>
        <p>
          <strong>Email:</strong> {appointmentDetail.email}
        </p>
        <p>
          <strong>Phone:</strong> {appointmentDetail.phone}
        </p>
        <p>
          <strong>Pet Name:</strong> {appointmentDetail.petName}
        </p>
        <p>
          <strong>Disease:</strong> {appointmentDetail.disease}
        </p>
        {appointmentDetail.zoomLink && (
          <p>
            <strong>Zoom Link:</strong> <a href={appointmentDetail.zoomLink} target="_blank" rel="noopener noreferrer">Join Meeting</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default OnlineAppointmentDetail;
