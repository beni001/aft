import { FoodItem } from "../Types";

// This function formats a message and opens WhatsApp with it
export const sendWhatsAppOrder = (item: FoodItem, phoneNumber: string) => {
  // Get WhatsApp number from environment
  const whatsappNumber = phoneNumber || process.env.REACT_APP_WHATSAPP_NUMBER;
  
  if (!whatsappNumber) {
    console.error("WhatsApp number not found in environment variables");
    return;
  }

  // Format the message
  const message = encodeURIComponent(
    `Hello! I would like to order:\n\n*${item.name}*\nPrice: $${item.price.toFixed(2)}\n\nPlease confirm my order. Thank you!`
  );

  // Open WhatsApp with the formatted message
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
};