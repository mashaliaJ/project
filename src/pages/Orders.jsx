import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // ✅ On mount, check if logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    // ✅ Fetch orders (mock for now)
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, [navigate]);

  // ✅ If no orders, show message
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
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
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
            >
              <h3 className="font-semibold mb-2">
                Order #{index + 1} —{" "}
                <span className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </span>
              </h3>

              <ul className="mb-3">
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-700 text-sm">
                    {item.name} × {item.quantity} — ${item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-800 font-medium">
                Total: ${order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
