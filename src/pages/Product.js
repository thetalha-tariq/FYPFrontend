import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product/");
        console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="max-w-xs rounded overflow-hidden shadow-lg mt-20 mx-5">
          <img className="w-full" src={product.image} alt={product.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {product.category}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              ${product.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
