import React, { useState } from 'react';
import Modal from '../Components/Modal';

const products = [
    {
        id: 1,
        name: 'Pet Medicine A',
        category: 'Medicine',
        imageUrl: 'https://images.unsplash.com/photo-1555685812-4b7432b8b1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBldCUyMG1lZGljaW5lfGVufDB8fHx8MTY4ODk3MTk4MA&ixlib=rb-1.2.1&q=80&w=400',
        price: '$10.99',
    },
    {
        id: 2,
        name: 'Pet Medicine B',
        category: 'Medicine',
        imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBldCUyMG1lZGljaW5lfGVufDB8fHx8MTY4ODk3MjAzNA&ixlib=rb-1.2.1&q=80&w=400',
        price: '$15.99',
    },
    {
        id: 3,
        name: 'Pet Food A',
        category: 'Food',
        imageUrl: 'https://images.unsplash.com/photo-1555685812-4b7432b8b1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBldCUyMGZvb2R8ZW58MHx8fHwxNjg4OTcyMTE5&ixlib=rb-1.2.1&q=80&w=400',
        price: '$25.99',
    },
    {
        id: 4,
        name: 'Pet Food B',
        category: 'Food',
        imageUrl: 'https://images.unsplash.com/photo-1583336668822-5d4c9f9e022b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBldCUyMGZvb2R8ZW58MHx8fHwxNjg4OTcyMTQ2&ixlib=rb-1.2.1&q=80&w=400',
        price: '$30.99',
    },
    {
        id: 5,
        name: 'Pet Accessory A',
        category: 'Accessory',
        imageUrl: 'https://images.unsplash.com/photo-1614799936448-482646627948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fHBldCUyMGFjY2Vzc29yaWVzfGVufDB8fHx8MTY4ODk3MjE3MA&ixlib=rb-1.2.1&q=80&w=400',
        price: '$9.99',
    },
    {
        id: 6,
        name: 'Pet Accessory B',
        category: 'Accessory',
        imageUrl: 'https://images.unsplash.com/photo-1588776813677-6c83086da51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fHBldCUyMGFjY2Vzc29yaWVzfGVufDB8fHx8MTY4ODk3MjIwMg&ixlib=rb-1.2.1&q=80&w=400',
        price: '$12.99',
    },
];

const categories = ['All', 'Food', 'Medicine', 'Accessory'];

const ProductCard = ({ product, onOpenModal }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden m-4 w-full max-w-sm transform transition-transform hover:scale-105">
        <img className="h-64 w-full object-cover" src={product.imageUrl} alt={product.name} />
        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-yellow-600 font-semibold text-xl">{product.price}</p>
            <button
                onClick={() => onOpenModal(product)}
                className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            >
                View Details
            </button>
        </div>
    </div>
);

const ProductListing = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="bg-yellow-50 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Pet Products</h1>
            <div className="flex justify-center mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`mx-2 px-4 py-2 rounded-md text-white font-medium ${selectedCategory === category ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onOpenModal={handleOpenModal} />
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal}>
                {selectedProduct && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                        <img className="h-64 w-full object-cover mb-4" src={selectedProduct.imageUrl} alt={selectedProduct.name} />
                        <p className="text-lg">{selectedProduct.category}</p>
                        <p className="text-yellow-600 font-semibold text-xl">{selectedProduct.price}</p>
                        <p className="mt-4 text-gray-700">This is a detailed description of the product.</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductListing;
