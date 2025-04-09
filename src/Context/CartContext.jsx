import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        const newItem = { ...item, id: Date.now() };
        setCart(prevCart => [...prevCart, newItem]);
        console.log("Updated Cart:", cart); // Debugging
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
