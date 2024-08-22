import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/Slice/ProductSlice"; // Adjust the path to your product slice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faPaw, faShieldDog, faCat, faSuitcaseMedical, faCommentDots, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Chatbot from "./ChatBot";
import HomePagePic1 from "../Images/HomePagePic1.png";
import HomePagePic2 from "../Images/HomePagePic2.png";
import HomePagePic3 from "../Images/HomePagePic3.png";

  
const Home = () => {
  const Images = [HomePagePic1, HomePagePic2, HomePagePic3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  // const [products, setProducts] = useState([]);
// "https://45397-theme003.myshopify.com/cdn/shop/files/slide_1_1810x700_crop_center.png?v=1620302496",
//     "https://45397-theme003.myshopify.com/cdn/shop/files/slide_3_1810x700_crop_top.png?v=1620303005",
//     "https://45397-theme003.myshopify.com/cdn/shop/files/slide_2_1810x700_crop_center.png?v=1620302571"

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [Images.length]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctor");
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    
    fetchDoctors();
    dispatch(getProducts());
  }, [dispatch]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Images.length) % Images.length);
  };

  return (
    <div className="gap-2 flex flex-col">
      <div>
        <img src={Images[currentIndex]} alt="Pet Image" />
        <div className="absolute left-52 bottom-64 z-10 p-4 flex flex-col gap-4">
          <h2 className="font-semibold text-white font-serif text-3xl">Pet Food And Accessories</h2>
          <h1 className="font-semibold text-white font-serif text-3xl">All your pet need</h1>
          <h1 className="font-semibold text-white font-serif text-3xl">Just A Click Away</h1>
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h1 className="font-serif font-semibold text-2xl text-center">Our Services</h1>
        <div className="flex flex-row p-1">
        <div
            className="flex flex-col items-center gap-3"
            style={{ transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fac74f'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FontAwesomeIcon icon={faUtensils} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Food</h1>
          </div>
          <div
              className="flex flex-col items-center gap-3"
              style={{ transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fac74f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
            <FontAwesomeIcon icon={faPaw} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Accessories</h1>
          </div>
          <div
              className="flex flex-col items-center gap-3"
              style={{ transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fac74f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
            <FontAwesomeIcon icon={faShieldDog} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Care</h1>
          </div>
          <div
              className="flex flex-col items-center gap-3"
              style={{ transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fac74f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
            <FontAwesomeIcon icon={faCat} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Groom</h1>
          </div>
          <div
            className="flex flex-col items-center gap-3"
            style={{ transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fac74f'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FontAwesomeIcon icon={faSuitcaseMedical} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Appointment</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <h1 className="font-serif font-semibold text-2xl text-center">Our Doctors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doctor, key) => (
            <div
              key={key}
              className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2">
              <div className="w-full h-full rounded-md bg-gray-200">
                <img src={`http://localhost:5000/uploads/DoctorImage/${doctor.image}`} alt={doctor.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h2 className="font-bold text-xl text-gray-800">{doctor.name}</h2>
                <h6 className="text-sm font-medium text-gray-500">{doctor.address}</h6>
                <p className="text-xs text-gray-500 mt-2">{doctor.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3">
        <h1 className="font-serif font-semibold text-2xl text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.slice(0, 4).map((product, key) => (
              <div
                key={key}
                className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2"
              >
                <div className="w-full h-full bg-gray-200">
                  <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
                  <p className="text-xs text-gray-500 mt-2">{product.description}</p>
                  <h3 className="text-lg font-bold text-red-600 mt-2">${product.price}</h3>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => window.location.href = '/product'}
          >
            More Products
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 right-4 z-50">
        <button
          className="bg-red-900 text-white font-bold py-3 px-3 rounded-full text-xl"
          onClick={toggleChat}
        >
          <FontAwesomeIcon icon={faCommentDots} size="2x" />
        </button>
      </div>
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-80 mr-14 bg-white shadow-lg rounded-lg">
          <Chatbot onClose={toggleChat} />
        </div>
      )}
    </div>
  );
};

export default Home;