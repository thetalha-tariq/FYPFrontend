import React, { useState } from 'react';
import axios from 'axios';

export default function Contacts({ doctorId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/doctorContactData/create/', {
        doctorId,
        name,
        email,
        phone,
        message,
      });
      console.log('Message sent successfully:', response.data);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div>
      <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

      <section className="bg-white py-20 lg:py-[50px] overflow-hidden relative z-10">
        <div className="container">
          <div className="flex flex-wrap lg:justify-between -mx-4">
          <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
            <div className="max-w-[570px] mb-12 lg:mb-0">
                <span className="block mb-4 text-2xl text-yellow-500 font-semibold">
                Contact Us
                </span>
                <p className="text-base text-body-color leading-relaxed mb-9">
                Welcome to <span className='font-semibold'>Pet MediConnect</span>
                <br/><br/>
                Dear Doctor,
                <br/><br/>
                We value your partnership and strive to ensure your experience with PetMedi Connect is seamless and productive. If you have any questions, concerns, or need assistance, please do not hesitate to reach out to us. Our dedicated admin team is here to support you.
                <br/><br/>
                Contact Information:
                <br/><br/>
                Email: admin@petmedi.com
                <br/>
                Phone: (123) 456-7890
                <br/>
                Office Hours: Monday - Friday, 9 AM - 6 PM
                <br/><br/>
                Or use the form below to send us a message directly:
                <br/><br/>
                Thank you for being a valued member of our PetMedi community. We look forward to assisting you.
                <br/><br/>
                Warm regards,
                <br/>
                The PetMedi Connect Team
                </p>
            </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
              <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="
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
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="
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
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Your Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="
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
                  <div className="mb-6">
                    <textarea
                      rows="6"
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="
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
                      className="
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
  );
}
