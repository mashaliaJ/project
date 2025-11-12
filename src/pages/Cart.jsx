import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    products,
    removeFromCart,
    addToCart,
    getCartTotal,
    currency,
    delivery_fee,
  } = useContext(ShopContext);

  const totalAmount = getCartTotal();
  const finalAmount = totalAmount + (totalAmount > 0 ? delivery_fee : 0);

  const cartProductList = products.filter((p) => cartItems[p._id]);

  return (
    <div className="p-6 sm:p-10">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartProductList.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link
            to="/collection"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Go Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartProductList.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
            >
              {/* Image + Name + Price */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    {currency} {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-semibold">{cartItems[item._id]}</span>
                <button
                  onClick={() => addToCart(item._id)}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-gray-800 font-medium mt-3 sm:mt-0">
                {currency} {(item.price * cartItems[item._id]).toLocaleString()}
              </p>
            </div>
          ))}

          {/* Totals */}
          <div className="border-t pt-6 text-right space-y-2">
            <p className="text-gray-600">
              Subtotal:{" "}
              <span className="font-semibold text-black">
                {currency} {totalAmount.toLocaleString()}
              </span>
            </p>
            {totalAmount > 0 && (
              <p className="text-gray-600">
                Delivery Fee:{" "}
                <span className="font-semibold text-black">
                  {currency} {delivery_fee.toLocaleString()}
                </span>
              </p>
            )}
            <p className="text-lg font-semibold">
              Total: {currency} {finalAmount.toLocaleString()}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="text-right">
            <Link
              to="/place-order"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
