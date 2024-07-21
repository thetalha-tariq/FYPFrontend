import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/product/create', product);
      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stockQuantity: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'description', 'price', 'category', 'imageUrl', 'stockQuantity'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'price' || field === 'stockQuantity' ? 'number' : 'text'}
              name={field}
              value={product[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required={field !== 'description' && field !== 'imageUrl'}
            />
          </div>
        ))}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
