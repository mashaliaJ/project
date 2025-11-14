import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

// Create context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // Basic info
  const currency = "Ksh";
  const delivery_fee = 250;

  // Cart and products state
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // User from localStorage (safe parsing)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  });

  // Base API URL (switch between dev and prod)
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`);
        console.log("Fetched products:", res.data);
        if (Array.isArray(res.data)) setProducts(res.data);
        else setProducts([]);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [BASE_URL]);

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

  // Get total number of items in cart
  const getCartCount = () =>
    Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  // Get total price of items in cart
  const getCartTotal = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      if (!product || !product.price) return total;
      return total + Number(product.price) * qty;
    }, 0);

  // Clear entire cart
  const clearCart = () => setCartItems({});

  // Memoize context value for performance
  const value = useMemo(
    () => ({
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
    }),
    [products, cartItems, user]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
