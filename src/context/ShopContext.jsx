import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "Ksh";
  const delivery_fee = 250;

  // Cart and products
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Safe user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://project-backend-1-w227.onrender.com");
        if (Array.isArray(res.data)) setProducts(res.data);
        else setProducts([]);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[itemId]) return newCart; // safety
      if (newCart[itemId] > 1) newCart[itemId] -= 1;
      else delete newCart[itemId];
      return newCart;
    });
  };

  // Total items in cart
  const getCartCount = () =>
    Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  // Total price
  const getCartTotal = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      if (!product || !product.price) return total;
      return total + Number(product.price) * qty;
    }, 0);

  // Clear cart
  const clearCart = () => setCartItems({});

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartTotal,
    setCartItems,
    clearCart,
    user,
    setUser,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
