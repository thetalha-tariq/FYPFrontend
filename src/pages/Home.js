import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faPaw, faShieldDog, faCat, faSuitcaseMedical } from "@fortawesome/free-solid-svg-icons";
import HomePagePic1 from "../Images/HomePagePic1.webp";

import { useState } from "react";
import axios, { Axios } from "axios";
const Home = () => {
  const [Image, setImage] = useState("https://45397-theme003.myshopify.com/cdn/shop/files/slide_3_1810x700_crop_top.png?v=1620303005");
  const Images = ["https://45397-theme003.myshopify.com/cdn/shop/files/slide_1_1810x700_crop_center.png?v=1620302496", "https://45397-theme003.myshopify.com/cdn/shop/files/slide_3_1810x700_crop_top.png?v=1620303005", "https://45397-theme003.myshopify.com/cdn/shop/files/slide_2_1810x700_crop_center.png?v=1620302571"]
  const [doctors, setDoctors] = useState([]);
  const onButtonClick = () => {

    var rand = Math.floor(Math.random() * 3);
    setImage(Images[rand])
  }
  useEffect(() => {
    setTimeout(() => {
      var rand = Math.floor(Math.random() * 3);
      setImage(Images[rand])
    }, 2000);
  }, [])
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor');
        setDoctors(response.data.data);
        console.log(doctors)
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="gap-2 flex flex-col">
      <div>
        <img src={Image} alt="Pet Image" />
        <div className="absolute left-52 bottom-64 z-10 p-4 flex flex-col gap-4">
          <h2 className="font-semibold text-white font-serif text-3xl">Pet Food And Accessories</h2>
          <h1 className="font-semibold text-white font-serif text-3xl">All your pet need</h1>
          <h1 className="font-semibold text-white font-serif text-3xl">Just A Click Away</h1>

        </div>
        <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={onButtonClick}>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h1 className="font-serif font-semibold text-2xl  text-center"> Our Services</h1>
        <div className="flex flex-row p-1">
          <div className="flex flex-col items-center gap-3 hover:bg-yellow-500" >
            <FontAwesomeIcon icon={faUtensils} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Food</h1>
          </div>
          <div className="flex flex-col items-center gap-3 hover:bg-yellow-500" >
            <FontAwesomeIcon icon={faPaw} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Accessories</h1>
          </div>
          <div className="flex flex-col items-center gap-3 hover:bg-yellow-500" >
            <FontAwesomeIcon icon={faShieldDog} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Care</h1>
          </div>
          <div className="flex flex-col items-center gap-3 hover:bg-yellow-500" >
            <FontAwesomeIcon icon={faCat} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif">Groom</h1>
          </div>
          <div className="flex flex-col items-center gap-3 hover:bg-yellow-500" >
            <FontAwesomeIcon icon={faSuitcaseMedical} className="w-1/2 h-1/2 py-3" />
            <h1 className="font-bold font-serif"> Appointment</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3">
        <h1 className="font-serif font-semibold text-2xl  text-center"> Our Doctors</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors.slice(0, 4).map((doctors, key) => {
            return (
              <div class="flex flex-col items-center hover:cursor-pointer justify-center bg-white p-4 shadow rounded-lg hover:translate-y-2">
                <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
                  <img src={doctors.image}
                    alt=""
                    class="h-full w-full" />
                </div>

                <h2 class="mt-4 font-bold text-xl">{doctors.name}</h2>
                <h6 class="mt-2 text-sm font-medium">{doctors.role}</h6>

                <p class="text-xs text-gray-500 text-center mt-3">
                  {doctors.specialization}
                </p>

                <ul class="flex flex-row mt-4 space-x-2">
                  <li>
                    <a href="" class="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
                      <i class="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="" class="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="" class="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            )

          })}
        </div>
      </div>
    </div >
  );
};

export default Home;
