import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Calendar, Send, ChevronDown, ChevronUp, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '../utils/cn'; // Assuming you have a cn utility for merging classes

// Utility function for sending WhatsApp messages
const sendWhatsAppMessage = (message: string, phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
};

const ContactUs: React.FC = () => {
  // State for form visibility
  const [activeForm, setActiveForm] = useState<'none' | 'message' | 'reservation'>('none');
  
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Reservation form state
  const [reservationName, setReservationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');

  // WhatsApp numbers
  const whatsAppNumbers = {
    primary: '+254724785413',
    secondary: '+254729537719'
  };

  // Toggle form visibility
  const toggleForm = (formType: 'message' | 'reservation') => {
    if (activeForm === formType) {
      setActiveForm('none');
    } else {
      setActiveForm(formType);
    }
  };

  // Handle contact form submission via WhatsApp
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    const contactMessage = `Hello! My name is ${name}.\n\nEmail: ${email}\n\nMessage: ${message}`;
    sendWhatsAppMessage(contactMessage, whatsAppNumbers.primary);
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setActiveForm('none');
  };

  // Handle reservation form submission via WhatsApp
  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const reservationMessage = `Hello! I would like to make a reservation.\n\nName: ${reservationName}\nDate: ${date}\nTime: ${time}\nNumber of guests: ${guests}`;
    sendWhatsAppMessage(reservationMessage, whatsAppNumbers.primary);
    // Reset form
    setReservationName('');
    setDate('');
    setTime('');
    setGuests('');
    setActiveForm('none');
  };

  // Direct WhatsApp contact
  const handleDirectContact = (phoneNumber: string) => {
    sendWhatsAppMessage("Hello! I would like to get in touch regarding your services.", phoneNumber);
  };

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-2">Contact Us</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We'd love to hear from you! Reach out to us for any inquiries or to make a reservation.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Contact Information */}
          <div className="p-8 border-b relative bg-gradient-to-r from-[#0fe807] to-white">
            <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-md">
                  <Phone className="h-6 w-6 text-[#0fe807]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Call Us</p>
                  <div className="space-y-1 mt-1">
                    <p className="font-medium">{whatsAppNumbers.primary}</p>
                    <p className="font-medium">{whatsAppNumbers.secondary}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-md">
                  <FaWhatsapp className="h-6 w-6 text-[#0fe807]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">WhatsApp</p>
                  <button 
                    onClick={() => handleDirectContact(whatsAppNumbers.primary)}
                    className="flex items-center space-x-2 mt-1 bg-[#0fe807] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                  >
                    <span>Chat Now</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleForm('message')}
                className={cn(
                  "flex-1 py-4 px-6 rounded-lg font-medium text-black flex items-center justify-center space-x-2 transition-all duration-300",
                  activeForm === 'message' 
                    ? "bg-[#e8ac07] text-white shadow-lg" 
                    : "bg-white border-2 border-[#e8ac07] shadow-md hover:shadow-lg"
                )}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Send Message</span>
                {activeForm === 'message' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleForm('reservation')}
                className={cn(
                  "flex-1 py-4 px-6 rounded-lg font-medium text-black flex items-center justify-center space-x-2 transition-all duration-300",
                  activeForm === 'reservation' 
                    ? "bg-[#0fe807] text-white shadow-lg" 
                    : "bg-white border-2 border-[#0fe807] shadow-md hover:shadow-lg"
                )}
              >
                <Calendar className="h-5 w-5" />
                <span>Make Reservation</span>
                {activeForm === 'reservation' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
          
          {/* Sliding Forms */}
          <AnimatePresence>
            {activeForm === 'message' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-white"
              >
                <div className="p-8 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Your Message</h3>
                    <button 
                      onClick={() => setActiveForm('none')}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitContact} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-[#e8ac07] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Send via WhatsApp</span>
                      <FaWhatsapp className="h-5 w-5" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
            
            {activeForm === 'reservation' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-white"
              >
                <div className="p-8 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Book a Table</h3>
                    <button 
                      onClick={() => setActiveForm('none')}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitReservation} className="space-y-4">
                    <div>
                      <label htmlFor="reservationName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        id="reservationName"
                        type="text"
                        value={reservationName}
                        onChange={(e) => setReservationName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0fe807] focus:border-[#0fe807] transition-all"
                        required
                      >
                        <option value="">Select number of guests</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                        <option value="more">More than 10</option>
                      </select>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-[#0fe807] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Book via WhatsApp</span>
                      <FaWhatsapp className="h-5 w-5" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;