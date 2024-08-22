import React, { useState } from 'react';
import axios from 'axios';

export default function Contacts({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/userContactData/create/', {
        userId,
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
  <span className="block mb-4 text-2xl text-yellow-500 font-semibold tracking-wide">
    Contact Us
  </span>
  <p className="text-base text-gray-700 leading-relaxed mb-9 font-light">
    Thank you for choosing <span className="font-semibold text-black">Pet MediConnect</span> as your trusted partner in pet care.
    We value your inquiries and are here to provide you with the support you need. Whether you have questions, require assistance, or wish to provide feedback, our dedicated team is ready to assist you.
    <br/><br/>
    Please use the contact form to reach out to us, and one of our representatives will respond to you promptly.
    <br/><br/>
    <span className="font-bold text-gray-900">Contact Information:</span>
    <br/><br/>
    <span className="font-semibold text-black">Email:</span> support@petmedi.com
    <br/>
    <span className="font-semibold text-black">Phone:</span> (123) 456-7890
    <br/>
    <span className="font-semibold text-black">Office Hours:</span> Monday - Friday, 9 AM - 6 PM
    <br/><br/>
    We look forward to assisting you and ensuring that your experience with Pet MediConnect is exceptional.
    <br/><br/>
    <span className="font-semibold text-black">Best regards,</span>
    <br/>
    The Pet MediConnect Team
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
                    rounded
                    border border-primary
                    p-3
                    transition
                    hover:bg-opacity-90
                  "
                  style={{ backgroundColor: '#fac74f' }}
                >
                  Submit
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
