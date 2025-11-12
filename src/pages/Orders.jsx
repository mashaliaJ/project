import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const { currency } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});

  // Load logged-in user and fetch orders
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Toggle order details expand/collapse
  const toggleExpand = (index) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Cancel an order
  const cancelOrder = async (orderId, index) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order, i) =>
          i === index ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Failed to cancel order:", err);
      setError(err.response?.data?.message || "Failed to cancel order.");
    }
  };

  if (!user) return null;

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10">Loading your orders...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">{error}</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-green-700">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">
          You have no orders yet. Go to the{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate("/collection")}
          >
            collection
          </span>{" "}
          to shop now.
        </p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <h3 className="font-semibold">
                  Order #{index + 1} —{" "}
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </h3>
                <span
                  className={`text-sm font-medium ${
                    order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {expandedOrders[index] && (
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center text-gray-700"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        {currency} {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <p className="text-right font-semibold text-gray-800 mt-2">
                    Total: {currency} {order.total.toFixed(2)}
                  </p>

                  {order.status !== "Cancelled" && (
                    <button
                      onClick={() => cancelOrder(order._id, index)}
                      className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
