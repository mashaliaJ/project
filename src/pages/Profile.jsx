import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Check login status on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // redirect if not logged in
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // redirect to homepage
  };

  if (!user) return null; // avoid flicker before redirect

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          My Profile
        </h2>

        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            View Orders
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
