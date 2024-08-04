// src/components/ShippingForm.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { countries } from 'countries-list';
import cities from 'cities.json';

const ShippingForm = () => {
    const [countryOptions, setCountryOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [completeAddress, setCompleteAddress] = useState(
        JSON.parse(localStorage.getItem("ShippingAddress")) || { country: '', city: '', address: '' }
    );

    useEffect(() => {
        const countryList = Object.entries(countries).map(([code, country]) => ({
            value: code,
            label: country.name,
        }));
        setCountryOptions(countryList);
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const citiesList = cities.filter(city => city.country === selectedCountry.value);
            setCityOptions(citiesList.map(city => ({
                value: city.name,
                label: city.name,
            })));
        } else {
            setCityOptions([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (isEditing) {
            const storedAddress = JSON.parse(localStorage.getItem("ShippingAddress"));
            if (storedAddress) {
                const country = countryOptions.find(c => c.label === storedAddress.country);
                const city = cities.find(c => c.name === storedAddress.city);

                if (country) setSelectedCountry(country);
                if (city) setSelectedCity({ value: city.name, label: city.name });
                setAddress(storedAddress.address);
            }
        }
    }, [isEditing, countryOptions]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const shippingDetails = {
            address: address,
            city: selectedCity ? selectedCity.label : '',
            country: selectedCountry ? selectedCountry.label : '',
        };
        setCompleteAddress(shippingDetails);
        localStorage.setItem('ShippingAddress', JSON.stringify(shippingDetails));
        setIsEditing(false);
        alert('Shipping address saved!');
    };

    return (
        <div className="max-w-full mx-auto p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold text-yellow-500 mb-4">Shipping Address</h2>
            {!localStorage.getItem("ShippingAddress") || isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-gray-700">Country</label>
                        <Select
                            id="country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700">City</label>
                        <Select
                            id="city"
                            options={cityOptions}
                            value={selectedCity}
                            onChange={setSelectedCity}
                            isDisabled={!selectedCountry}
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700">Address</label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!selectedCity}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        />
                    </div>
                    <div className='text-center'>
                        <button
                            type="submit"
                            className="min-w-1.5 bg-yellow-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <p><strong>Country:</strong> {completeAddress.country}</p>
                    <p><strong>City:</strong> {completeAddress.city}</p>
                    <p><strong>Address:</strong> {completeAddress.address}</p>
                    <div className='text-center'>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="min-w-1.5 bg-yellow-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingForm;
