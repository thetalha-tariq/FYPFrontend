// src/components/MyOrder.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);


    const userId = localStorage.getItem("userId"); // Replace with dynamic user ID if available

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/order/byId/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-yellow-500 mb-6">Orders List</h1>
            {orders.length === 0 ? (
                <p className="text-gray-700">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold text-yellow-500 mb-2">Order ID: {order._id}</h2>
                            <p className="text-gray-700">User ID: {order.userId}</p>
                            <p className="text-gray-700">Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <p className="text-gray-700">Shipping Address: {order.address}</p>
                            <p className="text-gray-700">Shipping City:{order.city}</p>

                            <p className="text-gray-700">Shipping Country: {order.country}</p>
                            <p className="text-gray-700">Payment Method: {order.paymentMethod}</p>
                            <p className="text-gray-700">Is Paid: {order.isPaid ? 'Yes' : 'No'}</p>
                            <p className="text-gray-700">Is Processed: {order.isProcessed ? 'Yes' : 'No'}</p>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrder;
