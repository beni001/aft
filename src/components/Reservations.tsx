import React, { useState } from 'react';
import axios from 'axios';

const Reservations: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Reservation Details:\nName: ${name}\nDate: ${date}\nTime: ${time}`;

    try {
      await axios.post('/api/sendMessage', { message });
      alert('Reservation sent successfully!');
    } catch (error) {
      console.error('Error sending reservation:', error);
      alert('Failed to send reservation.');
    }
  };

  return (
    <section className="py-16 bg-[#e8f7e7] text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Make a Reservation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
          />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg w-full sm:w-auto">
            Book
          </button>
        </form>
      </div>
    </section>
  );
};

export default Reservations;
