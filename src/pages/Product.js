import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/Slice/ProductSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Products() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
        // const storedCart = localStorage.getItem("Cart");
        if (localStorage.getItem("Cart")) {
            setCart(JSON.parse(localStorage.getItem("Cart")));
        }
        else {


        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("Cart", JSON.stringify(cart));
    }, [cart]);

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
        setFilteredProducts(products);
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories);
        handleCategoryChange(selectedCategory);
    }, [products, selectedCategory]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="bg-yellow-50 min-h-screen">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-center mb-4 space-x-2">
                    <button onClick={() => handleCategoryChange("All")} className={`px-4 py-2 rounded-full ${selectedCategory === "All" ? "bg-yellow-500 text-white" : "bg-yellow-200 text-yellow-800"}`}>All</button>
                    {categories.map(category => (
                        <button key={category} onClick={() => handleCategoryChange(category)} className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-yellow-500 text-white" : "bg-yellow-200 text-yellow-800"}`}>
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {filteredProducts.map((data) => (
                        <div key={data._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 relative">
                            <Link to={`/product/${data._id}`} className="block">
                                <img className="p-8 rounded-t-lg" src={data.imageUrl} alt={data.name} />
                                <div className="px-5 pb-5">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">{data.name}</h5>
                                    <div className="flex items-center justify-between my-2">
                                        <p className="text-gray-700">{data.description}</p>
                                    </div>
                                    <span className="text-3xl font-bold text-yellow-600">${data.price}</span>
                                </div>
                            </Link>
                            <button className="absolute bottom-4 right-4 text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => addToCart(data)}>Add to cart</button>
                        </div>
                    ))}
                </div>

                {cart.length > 0 && (
                    <Link to="/cart" className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300">
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">{cartItemCount}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Products;
