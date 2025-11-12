import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isAdmin || !token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading orders...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Manage Orders</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Total</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.user?.name}</td>
                <td className="p-3">{order.user?.email}</td>
                <td className="p-3">${order.totalPrice?.toFixed(2)}</td>
                <td className="p-3 font-semibold">{order.status}</td>
                <td className="p-3 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
