import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [globalCart, setGlobalCart] = useState([]);

    const updateCart = (value) => {
        setGlobalCart([...globalCart, value])
    };

    return (
        <>
            <CartContext.Provider value={{ globalCart, updateCart }}>
                {children}
            </CartContext.Provider>
        </>
    );
};

export default CartProvider;