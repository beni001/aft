import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number; // Add price to each item
  quantity: number; // Track quantity for each item
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void; // Function to remove item from cart
  updateQuantity: (id: number, quantity: number) => void; // Function to update item quantity
  checkout: () => void; // Function to handle checkout
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, removeFromCart, updateQuantity, checkout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-white shadow-lg p-4 rounded">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div>
                <span>{item.name}</span>
                <span className="ml-2">x {item.quantity}</span>
              </div>
              <div className="flex items-center">
                <span>${item.price.toFixed(2)}</span>
                <button 
                  aria-label={`Increase quantity of ${item.name}`} 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                  className="mx-1 bg-gray-200 hover:bg-gray-300 rounded px-2">
                  +
                </button>
                <button 
                  aria-label={`Decrease quantity of ${item.name}`} 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  disabled={item.quantity <= 1} 
                  className="mx-1 bg-gray-200 hover:bg-gray-300 rounded px-2">
                  -
                </button>
                <button 
                  aria-label={`Remove ${item.name} from cart`} 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove ${item.name} from the cart?`)) {
                      removeFromCart(item.id);
                    }
                  }} 
                  className="mx-1 bg-red-500 text-white rounded px-2">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="font-bold">Total: ${totalPrice.toFixed(2)}</div>
          <button 
            onClick={checkout} 
            disabled={cartItems.length === 0} 
            className={`py-2 px-4 rounded ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
