import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/Slice/ProductSlice';

function Products() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    const handleCategoryChange = (category) => {
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
        setSelectedCategory(category);
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        handleCategoryChange(selectedCategory);
    }, [products]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <div className="flex justify-center mb-4">
                    <button onClick={() => handleCategoryChange("All")} className={`btn ${selectedCategory === "All" ? "btn-active" : ""}`}>All</button>
                    <button onClick={() => handleCategoryChange("food")} className={`btn ${selectedCategory === "food" ? "btn-active" : ""}`}>Food</button>
                    <button onClick={() => handleCategoryChange("accessories")} className={`btn ${selectedCategory === "accessories" ? "btn-active" : ""}`}>Accessories</button>
                    <button onClick={() => handleCategoryChange("equipments")} className={`btn ${selectedCategory === "equipments" ? "btn-active" : ""}`}>Grooming Equipments</button>
                </div>

                <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {Products.map((data, idx) => (
                        <div key={idx} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="p-8 rounded-t-lg" src={data.imageUrl} alt="product image" />
                            </a>
                            <div className="px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
                                </a>
                                <div className="flex items-center justify-between mb-2"><p>{data.slug}</p></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${data.name}</span>
                                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
