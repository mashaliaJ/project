import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const url = isRegister
        ? "http://localhost:5000/api/users/register"
        : "http://localhost:5000/api/users/login";

      const payload = isRegister
        ? formData
        : { email: formData.email, password: formData.password };

      const res = await axios.post(url, payload);

      console.log("Server response:", res.data);

      // Both registration and login now return token and user object
      const { token, user, message: serverMessage } = res.data || {};

      if (!token || !user) {
        setError(serverMessage || "Invalid response from server.");
        return;
      }

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Display actual name and email
      setMessage(`👋 Welcome, ${user.name}!`);
      
      // Navigate to profile after a short delay
      setTimeout(() => navigate("/profile"), 1000);

      // Reset form
      setFormData({ name: "", email: "", password: "" });
      setIsRegister(false);
    } catch (err) {
      console.error("Login/Register error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-center text-2xl font-bold mb-6">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded focus:outline-green-500"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded focus:outline-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded focus:outline-green-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && (
            <div className="text-green-600 text-sm">
              <p>{message}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isRegister ? "Already have an account? " : "Don’t have an account? "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
