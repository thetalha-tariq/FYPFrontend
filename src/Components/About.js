import React from 'react'
import img1 from "../Images/img1.jpg"
import img2 from "../Images/img2.jpg"
import img3 from "../Images/img3.jpg"

function About() {
    return (
        <div>
            <div class="py-16 bg-white">
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div class="md:5/12 lg:w-5/12">
                            <img src={img1} alt="image" loading="lazy" width="" height="" className='border border-0 rounded-sm' />
                        </div>
                        <div class="md:7/12 lg:w-6/12">
                            <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Treatment at PetMediConnect</h2>
                            <p class="mt-6 text-gray-600 font-serif text-lg">Welcome to PetMediConnect, where we provide top-notch veterinary care for your pets through our convenient online platform. Our mission is to offer comprehensive veterinary care, enhancing your pets' health and well-being with expert advice, accurate diagnoses, and effective treatments. We provide services such as routine check-ups, diagnostic services, emergency care, personalized treatment plans, and specialist consultations. Our compassionate team treats your pets like family, offering convenience by allowing you to schedule appointments and consult with veterinarians from home. With our experienced vets and comprehensive services, we ensure your pets receive the best care possible. Join our pet-loving community and experience the convenience and quality of our online veterinary care.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-16 bg-white">
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">

                        <div class="md:7/12 lg:w-6/12">
                            <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Pet Quality Food</h2>
                            <p class="mt-6 text-gray-600 text-lg font-serif">
                                At PetMediConnect, we understand that a balanced diet is crucial for the health and happiness of your pets. That’s why we offer a carefully curated selection of premium pet foods designed to meet the nutritional needs of pets of all ages, breeds, and sizes. Our products are made from high-quality ingredients, free from harmful additives and fillers, and include options for grain-free, hypoallergenic, and prescription diets to cater to specific dietary needs. From puppy and kitten formulas to senior pet diets, our range covers all life stages, supporting growth, development, and overall well-being. We stock trusted brands known for their commitment to quality and nutrition, ensuring your pets receive veterinarian-recommended products for their health. Shop conveniently from home and have your pet food delivered to your doorstep, with expert advice available for personalized recommendations. Trust PetMediConnect to provide the best nutrition for your pets, promoting their health and longevity. </p>
                        </div>
                        <div class="md:5/12 lg:w-5/12">
                            <img src={img2} alt="image" loading="lazy" width="" height="" className='border border-0 rounded-sm' />
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-16 bg-white">
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div class="md:5/12 lg:w-5/12">
                            <img src={img3} alt="image" loading="lazy" width="" height="" className='border border-0     rounded-lg' />
                        </div>
                        <div class="md:7/12 lg:w-6/12">
                            <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Pamper Your Pets with Professional Grooming</h2>
                            <p class="mt-6 text-gray-600 font-serif text-lg">At PetMediConnect, we believe that grooming is an essential part of maintaining your pet’s health and happiness. Our online store offers a range of grooming products designed to keep your pets looking and feeling their best. From shampoos and conditioners to brushes and grooming tools, we have everything you need to provide professional-quality care at home.Our grooming products are formulated with safe, high-quality ingredients that cleanse, nourish, and maintain your pet’s coat. We offer shampoos and conditioners suited for all coat types, including sensitive skin formulations.</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default About