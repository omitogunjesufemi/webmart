/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);

    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

        if (isItemInCart) {
         setCartItems(
            cartItems.map( (cartItem) => cartItem._id === item._id ? {
                ...cartItem, quantity: cartItem.quantity + 1
            } : cartItem )
         );   
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    }

    const addBillingInfo = (billingInfo) => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
          setCartItems({billingInfo: JSON.parse(billingInfo), orderItems: JSON.parse(cartItems)});
        }
    }

    const getTotalWeight = () => {
        return cartItems.reduce((total, item) => total + item.weight * item.quantity, 0);
    }

    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

        if (isItemInCart.quantity === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        } else {
            setCartItems(
                cartItems.map((cartItem) => cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem )
            );
        }
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity * 1.0), 0);
    };
    
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
          setCartItems(JSON.parse(cartItems));
        }
    }, []);
    
    return (
        <CartContext.Provider 
            value={{
                cartItems,
                addToCart,
                addBillingInfo,
                getTotalWeight,
                removeFromCart,
                clearCart,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );

}

