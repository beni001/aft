// src/utils/whatsappUtils.ts

import { FoodItem } from "../Types";

// Format and open WhatsApp with a food order message
export const sendWhatsAppOrder = (item: FoodItem, phoneNumber: string) => {
  // Get WhatsApp number from environment or use provided number
  const whatsappNumber = phoneNumber || process.env.REACT_APP_WHATSAPP_NUMBER;
    
  if (!whatsappNumber) {
    console.error("WhatsApp number not found");
    return;
  }
  
  // Remove any spaces or '+' from the phone number
  const formattedNumber = whatsappNumber.replace(/\+/g, '').replace(/\s/g, '');
  
  // Format the message
  const message = encodeURIComponent(
    `Hello! I would like to order:\n\n*${item.name}*\nPrice: $${item.price.toFixed(2)}\n\nPlease confirm my order. Thank you!`
  );
  
  // Open WhatsApp with the formatted message
  window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');
};

// Send a general WhatsApp message
export const sendWhatsAppMessage = (message: string, phoneNumber: string) => {
  if (!phoneNumber) {
    console.error("WhatsApp number not provided");
    return;
  }
  
  // Remove any spaces or '+' from the phone number
  const formattedNumber = phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
  
  // Encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Open WhatsApp with the message
  window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
};

// Make a reservation via WhatsApp
export const makeWhatsAppReservation = (
  name: string, 
  date: string, 
  time: string, 
  guests: number | string,
  phoneNumber: string
) => {
  const formattedNumber = phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
  
  const message = encodeURIComponent(
    `Hello! I would like to make a reservation.\n\n*Reservation Details*\nName: ${name}\nDate: ${date}\nTime: ${time}\nNumber of guests: ${guests}\n\nPlease confirm my reservation. Thank you!`
  );
  
  window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');
};