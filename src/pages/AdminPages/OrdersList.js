// src/components/OrdersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/order/');
                console.log(response.data); 
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    throw new Error('Response is not an array');
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleProcessOrder = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/order/${id}`, { id });
            setOrders((prevOrders) => prevOrders.map(order => order._id === id ? { ...order, isProcessed: true } : order));
        } catch (error) {
            console.error('Error processing order:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                            <p className="text-gray-700">Shipping City: {order.city}</p>
                            <p className="text-gray-700">Shipping Country: {order.country}</p>
                            <p className="text-gray-700">Payment Method: {order.paymentMethod}</p>
                            <p className="text-gray-700">Is Paid: {order.isPaid ? 'Yes' : 'No'}</p>
                            <p className="text-gray-700">Is Processed: {order.isProcessed ? 'Yes' : 'No'}</p>
                            <button
                                onClick={() => handleProcessOrder(order._id)}
                                className={`mt-4 px-4 py-2 rounded text-white ${order.isProcessed ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
                                    }`}
                                disabled={order.isProcessed}
                            >
                                {order.isProcessed ? 'Processed' : 'Process Order'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
