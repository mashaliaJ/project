import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Load user info from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !savedUser) {
      handleLogout(); // not logged in → logout
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-600">No user data found. Please log in again.</p>
      </div>
    );
  }

  // ✅ Main Profile UI
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-3">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <p className="text-gray-600 mb-4">
          {user?.email || "No email available"}
        </p>

        <div className="space-y-3 mb-6">
          <Link
            to="/orders"
            className="block bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            View My Orders
          </Link>
          <Link
            to="/cart"
            className="block bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
          >
            Go to Cart
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
