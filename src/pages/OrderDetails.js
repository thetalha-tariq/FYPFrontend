import React from 'react';
import ShippingForm from '../Components/ShipingForm';
import { useDispatch } from 'react-redux';
import { createOrder } from '../Store/Slice/OrderSlice'
import { Navigate, Link, useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const cart = JSON.parse(localStorage.getItem("Cart")) || [];
    const shippingCost = 10; // Assuming a fixed shipping cost
    const navigate = useNavigate();

    // Calculate the total price of items in the cart
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalTotal = totalPrice + shippingCost;
    const userId = localStorage.getItem("userId");
    const shippingAddress = JSON.parse(localStorage.getItem("ShippingAddress"));
    console.log("Shipping", shippingAddress);

    const orderItems = cart.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
    }));

    const data = {
        userId,
        orderItems: orderItems,
        shippingPrice: shippingCost,
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        country: shippingAddress?.country,
        shippingCost, // You can replace this with actual data from the form
        paymentMethod: "online", // You can replace this with actual data
        totalPrice: finalTotal,
    };

    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            await dispatch(createOrder(data));
            localStorage.removeItem("Cart");
            navigate("/product");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-yellow-500 mb-6">Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p className="text-gray-700">Your cart is empty.</p>
            ) : (
                <>
                    <div className="flex flex-wrap">
                        {cart.map((item) => (
                            <div key={item._id} className=" flex-grow my-2 items-center mb-4 bg-white rounded-lg shadow-md p-4 m-2 w-full">
                                <h2 className="text-xl font-bold text-yellow-500">{item.name}</h2>
                                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                                <p className="text-gray-700">Quantity: {item.quantity}</p>
                                <p className="text-gray-700">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                        <h2 className="text-xl font-bold text-yellow-500 mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Subtotal:</span>
                            <span className="text-gray-700">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Shipping:</span>
                            <span className="text-gray-700">${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-yellow-500">
                            <span>Total:</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </>
            )}
            <div className="w-full mt-6">
                <ShippingForm />
            </div>
            <button onClick={onSubmit} className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-4">CheckOut</button>
        </div>
    );
};

export default OrderDetails;
