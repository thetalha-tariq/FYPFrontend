import React from 'react'

export default function Contacts() {
    return (
        <div>
            <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

            <section class="bg-white py-20 lg:py-[50px] overflow-hidden relative z-10">
                <div class="container">
                    <div class="flex flex-wrap lg:justify-between -mx-4">
                        <div class="w-full lg:w-1/2 xl:w-6/12 px-4">
                            <div class="max-w-[570px] mb-12 lg:mb-0">
                                <span class="block mb-4 text-2xl text-yellow-500 font-semibold">
                                    Contact Us
                                </span>
                                <h2
                                    class="
                      text-dark
                      mb-6
                      uppercase
                      font-bold
                      text-[32px]
                      sm:text-[40px]
                      lg:text-[36px]
                      xl:text-[40px]
                      "
                                >
                                    GET IN TOUCH WITH US
                                </h2>
                                <p class="text-base text-body-color leading-relaxed mb-9">
                                    Welcome to <span className='font-semibold'>Pet MediConnect</span> We're here to provide exceptional care and support for your beloved pets. Whether you have questions, need assistance, or want to book an appointment, we're just a click away.
                                </p>

                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 xl:w-5/12 px-4">
                            <div class="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                                <form>
                                    <div class="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            class="
                            w-full
                            rounded
                            py-3
                            px-[14px]
                            text-body-color text-base
                            border border-[f0f0f0]
                            outline-none
                            focus-visible:shadow-none
                            focus:border-primary
                            "
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            class="
                            w-full
                            rounded
                            py-3
                            px-[14px]
                            text-body-color text-base
                            border border-[f0f0f0]
                            outline-none
                            focus-visible:shadow-none
                            focus:border-primary
                            "
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Your Phone"
                                            class="
                            w-full
                            rounded
                            py-3
                            px-[14px]
                            text-body-color text-base
                            border border-[f0f0f0]
                            outline-none
                            focus-visible:shadow-none
                            focus:border-primary
                            "
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <textarea
                                            rows="6"
                                            placeholder="Your Message"
                                            class="
                            w-full
                            rounded
                            py-3
                            px-[14px]
                            text-body-color text-base
                            border border-[f0f0f0]
                            resize-none
                            outline-none
                            focus-visible:shadow-none
                            focus:border-primary
                            "
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            class="
                            w-full
                            text-white
                            bg-yellow-500
                            rounded
                            border border-primary
                            p-3
                            transition
                            hover:bg-opacity-90
                            "
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
