import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    products,
    getCartTotal,
    delivery_fee,
    currency,
    setCartItems,
  } = useContext(ShopContext);

  const [delivery, setDelivery] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalAmount = getCartTotal();
  const finalAmount = totalAmount + (totalAmount > 0 ? delivery_fee : 0);

  // Pre-fill user's name if logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setDelivery((prev) => ({ ...prev, name: storedUser.name }));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  // Validate phone number (10-15 digits)
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      setError("You must be logged in to place an order.");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      setError("Your cart is empty!");
      return;
    }

    const { name, address, city, phone } = delivery;
    if (!name || !address || !city || !phone) {
      setError("Please fill in all delivery details.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number (10-15 digits).");
      return;
    }

    const orderItems = products
      .filter((p) => cartItems[p._id])
      .map((p) => ({
        productId: p._id,
        name: p.name,
        price: p.price,
        quantity: cartItems[p._id],
        total: p.price * cartItems[p._id],
      }));

    const orderData = {
      user: storedUser._id,      // ✅ link order to logged-in user
      email: storedUser.email,
      items: orderItems,
      delivery,
      subtotal: totalAmount,
      delivery_fee,
      total: finalAmount,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("✅ Order placed successfully!");
      setCartItems({}); // clear cart

      // Redirect to Orders page after short delay
      setTimeout(() => navigate("/orders"), 1500);
    } catch (err) {
      console.error("Order error:", err);
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        {products.filter((p) => cartItems[p._id]).length === 0 ? (
          <p className="text-gray-500">No items in your cart.</p>
        ) : (
          <div className="divide-y">
            {products
              .filter((p) => cartItems[p._id])
              .map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-2"
                >
                  <p>
                    {item.name} × {cartItems[item._id]}
                  </p>
                  <p>
                    {currency}
                    {(item.price * cartItems[item._id]).toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
        )}

        <div className="border-t pt-4 mt-3 space-y-1">
          <p className="text-gray-700">
            Subtotal:{" "}
            <span className="font-semibold">
              {currency}
              {totalAmount.toFixed(2)}
            </span>
          </p>
          {totalAmount > 0 && (
            <p className="text-gray-700">
              Delivery Fee:{" "}
              <span className="font-semibold">
                {currency}
                {delivery_fee.toFixed(2)}
              </span>
            </p>
          )}
          <p className="text-lg font-semibold">
            Total: {currency}
            {finalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Delivery Form */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3">Delivery Details</h3>
        <form onSubmit={handlePlaceOrder} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={delivery.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={delivery.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={delivery.city}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={delivery.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">{success}</p>}

          <div className="flex justify-between items-center mt-4">
            <Link to="/cart" className="text-blue-600 hover:underline">
              ← Back to Cart
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
