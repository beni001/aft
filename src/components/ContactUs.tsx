import React, { useState } from 'react';
import axios from 'axios';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [reservationName, setReservationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    const contactMessage = `Contact Details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
      await axios.post('/api/sendMessage', { message: contactMessage });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    const reservationMessage = `Reservation Details:\nName: ${reservationName}\nDate: ${date}\nTime: ${time}`;

    try {
      await axios.post('/api/sendMessage', { message: reservationMessage });
      alert('Reservation sent successfully!');
    } catch (error) {
      console.error('Error sending reservation:', error);
      alert('Failed to send reservation.');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#e8f7e7] to-[#0fe807] text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Contact Us Card */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative p-6 w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <form onSubmit={handleSubmitContact}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
              ></textarea>
              <button className="bg-black text-white px-6 py-3 rounded-lg">Submit</button>
            </form>
          </div>
           
         <div>
          Get in Touch
          call📞 +254724785413

                  +254729537719 
                  
                  to make your order
         </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
