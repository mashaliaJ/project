import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, products, getCartTotal, delivery_fee, currency, setCartItems } =
    useContext(ShopContext);

  const totalAmount = getCartTotal();
  const finalAmount = totalAmount + (totalAmount > 0 ? delivery_fee : 0);

  // ✅ Handle placing order
  const handlePlaceOrder = () => {
    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // 🧾 Create order details
    const order = {
      id: Date.now(), // unique order ID
      items: products
        .filter((p) => cartItems[p.id])
        .map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: cartItems[p.id],
          total: p.price * cartItems[p.id],
        })),
      subtotal: totalAmount,
      delivery_fee: delivery_fee,
      total: finalAmount,
      date: new Date().toLocaleString(),
    };

    // 💾 Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // 🧹 Clear the cart
    setCartItems({});

    // ✅ Redirect to orders page
    navigate("/orders");
  };

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        {products.filter((p) => cartItems[p.id]).length === 0 ? (
          <p className="text-gray-500">No items in your cart.</p>
        ) : (
          <div className="divide-y">
            {products
              .filter((p) => cartItems[p.id])
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <p>
                    {item.name} × {cartItems[item.id]}
                  </p>
                  <p>
                    {currency}
                    {item.price * cartItems[item.id]}
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* Totals */}
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
                {delivery_fee}
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
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </form>
      </div>

      {/* Checkout Actions */}
      <div className="flex justify-between items-center">
        <Link to="/cart" className="text-blue-600 hover:underline">
          ← Back to Cart
        </Link>
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
