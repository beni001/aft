import { useState } from 'react';

// Define the structure of a cart item
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Cart management hook
const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Add an item to the cart, or increase its quantity if it already exists
    const addItemToCart = (item: CartItem) => {
        setCartItems(prevCartItems => {
            const existingCartItem = prevCartItems.find(cartItem => cartItem.id === item.id);
            if (existingCartItem) {
                return prevCartItems.map(cartItem => 
                    cartItem.id === item.id 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                        : cartItem
                );
            }
            return [...prevCartItems, { ...item, quantity: 1 }];
        });
    };

    // Remove an item from the cart based on its ID
    const removeItemFromCart = (id: string) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
    };

    // Update the quantity of a specific item, removing it if the quantity is zero
    const updateCartItemQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItemFromCart(id);
        } else {
            setCartItems(prevCartItems => 
                prevCartItems.map(item => 
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    // Placeholder function for handling checkout
    const processCheckout = () => {
        // Implement checkout logic here
    };

    return {
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateCartItemQuantity,
        processCheckout,
    };
};

export default useCart;
