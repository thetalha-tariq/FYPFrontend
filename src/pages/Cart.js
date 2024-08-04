import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    const [cart, setCart] = useState([]);
    const [CartLength, setCartLenth] = useState([]);


    // Initialize cart from local storage
    useEffect(() => {
        const storedCart = localStorage.getItem("Cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
            setCartLenth(storedCart.length)
        }
    }, []);

    // Update local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem("Cart", JSON.stringify(cart));

    }, [cart]);

    const increaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const decreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item._id === productId
                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                : item
        ));
    };

    const removeItem = (productId) => {
        setCart(cart.filter(item => item._id !== productId));
    };

    // Calculate total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-yellow-50 min-h-screen">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                                <div>
                                    <h5 className="text-xl font-semibold">{item.name}</h5>
                                    <p className="text-gray-700">${item.price} x {item.quantity} = ${item.price * item.quantity}</p>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <button onClick={() => decreaseQuantity(item._id)} className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item._id)} className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full">+</button>
                                    <button onClick={() => removeItem(item._id)} className="px-4 py-2 bg-red-200 text-red-800 rounded-full font-sm">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>
                        </div>
                    </div>
                )}
            </div>

            {CartLength > 0 && (
                <Link to={"/order-details"}>
                    <button className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300">
                        <FontAwesomeIcon icon={faCheck} size="lg" /> Order Details
                    </button>
                </Link>
            )}
        </div>
    );
}

export default Cart;
