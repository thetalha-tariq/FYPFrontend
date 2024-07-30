import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product/');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/product/${editProductId}`, product);
        alert('Product updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/product/create', product);
        alert('Product added successfully!');
      }
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stockQuantity: ''
      });
      setIsEditMode(false);
      setEditProductId(null);
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error);
      alert('Failed to add/update product.');
    }
  };

  const handleEdit = (product) => {
    setProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.image,
      stockQuantity: product.countInStock
    });
    setIsEditMode(true);
    setEditProductId(product._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${productId}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <table className="min-w-full bg-white mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Stock Quantity</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.countInStock}</td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {isEditMode ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                Update Product
              </button>
            </form>
            <button
              className="mt-4 w-full p-2 bg-gray-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
