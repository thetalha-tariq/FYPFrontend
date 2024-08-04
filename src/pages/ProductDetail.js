import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        // Logic to add the product to the cart
        console.log(`Product added to cart: ${product.name}`);
    };

    return (
        <div className="w-full h-screen p-6 bg-yellow-100">
            <div className="flex flex-col md:flex-row items-center justify-center h-full">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex flex-col justify-between w-full md:w-1/2">
                    <h1 className="text-3xl font-bold text-yellow-800 mb-4">{product.name}</h1>
                    <p className="text-yellow-700 mb-2">{product.description}</p>
                    <p className="text-yellow-800 font-semibold mb-2">Price: ${product.price}</p>
                    <p className="text-yellow-700 mb-2">Brand: {product.brand}</p>
                    <p className="text-yellow-700 mb-2">Category: {product.category}</p>
                    <p className="text-yellow-700 mb-2">Quantity: {product.quantity}</p>
                    <p className="text-yellow-700 mb-2">Rating: {product.rating}</p>
                    <p className="text-yellow-700 mb-2">Number of Reviews: {product.numReviews}</p>
                    <p className="text-yellow-700 mb-2">Count in Stock: {product.countInStock}</p>
                    <button
                        onClick={addToCart}
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
