import React from 'react';

const doctors = [
    {
        id: 1,
        name: 'Dr. John Doe',
        specialty: 'Cardiology',
        imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
        timeSlots: ['10:00 - 11:00', '13:00 - 14:00', '16:00 - 17:00'],
    },
    {
        id: 2,
        name: 'Dr. Jane Smith',
        specialty: 'Dermatology',
        imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
        timeSlots: ['09:00 - 10:00', '12:00 - 13:00', '15:00 - 16:00'],
    },
    {
        id: 3,
        name: 'Dr. Mark Johnson',
        specialty: 'Neurology',
        imageUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
        timeSlots: ['08:00 - 09:00', '11:00 - 12:00', '14:00 - 15:00'],
    }, {
        id: 4,
        name: 'Dr. Mark Johnson',
        specialty: 'Neurology',
        imageUrl: 'https://randomuser.me/api/portraits/men/87.jpg',
        timeSlots: ['08:00 - 09:00', '11:00 - 12:00', '14:00 - 15:00'],
    }, {
        id: 5,
        name: 'Dr. Mark Johnson',
        specialty: 'Neurology',
        imageUrl: 'https://randomuser.me/api/portraits/men/86.jpg',
        timeSlots: ['08:00 - 09:00', '11:00 - 12:00', '14:00 - 15:00'],
    },
];

const DocInfo = ({ doctor }) => (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden m-3 flex flex-col">

        <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={doctor.imageUrl} alt={`Doctor ${doctor.name}`} />
        </div>
        <div className="p-8 flex flex-col">
            <div className="uppercase tracking-wide text-sm text-yellow-500 font-semibold">{doctor.name}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">Specialty: {doctor.specialty}</p>
            <p className="mt-2 text-gray-500">Available Time Slots:</p>
            <ul className="list-disc list-inside">
                {doctor.timeSlots.map((slot, index) => (
                    <li key={index}>{slot}</li>
                ))}
            </ul>
            <button className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Book Appointment
            </button>
        </div>
    </div>
);

const DoctorList = () => (
    <div>
        <h1 className='text-center font-bold text-2xl font-serif'> Our Doctors</h1>
        <div className="flex flex-wrap justify-center">

            {doctors.map((doctor) => (
                <DocInfo key={doctor.id} doctor={doctor} />
            ))}
        </div>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
            <div class="md:flex">
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-yellow-500 font-semibold">Patient: Jane Doe</div>
                    <p class="block mt-1 text-lg leading-tight font-medium text-black">Appointment Time: 13:00 - 14:00</p>
                    <p class="mt-2 text-gray-500">Doctor: Dr. John Doe</p>
                    <button class="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        View Details
                    </button>
                    <button class="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Cancel Appointment
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default DoctorList;
