import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false); // mobile sidebar
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setProfileOpen(false);
    setUser(null);
    navigate("/login");
  };

  // Profile icon click
  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setProfileOpen(!profileOpen);
    }
  };

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      if (visible) setVisible(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative px-4 sm:px-10 bg-white shadow">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-green-700">AgriLink</h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 items-center">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/collection">COLLECTION</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>

        {/* Admin Links */}
        {user?.isAdmin && (
          <>
            <NavLink to="/admin/dashboard" className="font-bold underline">
              ADMIN DASHBOARD
            </NavLink>
            <NavLink to="/admin/orders">MANAGE ORDERS</NavLink>
          </>
        )}

        {/* Desktop Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center border rounded overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="px-2 py-1 outline-none text-sm"
          />
          <button type="submit" className="px-2 py-1 bg-green-600 text-white hover:bg-green-700">
            🔍
          </button>
        </form>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Mobile Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center border rounded overflow-hidden sm:hidden"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-2 py-1 outline-none text-sm w-24"
          />
          <button type="submit" className="px-2 py-1 bg-green-600 text-white hover:bg-green-700">
            🔍
          </button>
        </form>

        {/* Profile */}
        <div className="relative">
          <img
            className="w-5 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            onClick={handleProfileClick}
          />
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 py-3 px-5 bg-slate-100 text-gray-700 rounded shadow-lg z-50">
              {user ? (
                <>
                  <p className="text-sm mb-2 font-semibold">{user.name}</p>
                  <p className="text-xs mb-3 text-gray-500">{user.email}</p>
                  <p
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                    className="cursor-pointer hover:text-black py-1"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/orders");
                      setProfileOpen(false);
                    }}
                    className="cursor-pointer hover:text-black py-1"
                  >
                    Orders
                  </p>
                  {/* Admin Links in Profile Dropdown */}
                  {user.isAdmin && (
                    <>
                      <p
                        onClick={() => {
                          navigate("/admin/dashboard");
                          setProfileOpen(false);
                        }}
                        className="cursor-pointer hover:text-black py-1 font-bold"
                      >
                        Admin Dashboard
                      </p>
                      <p
                        onClick={() => {
                          navigate("/admin/orders");
                          setProfileOpen(false);
                        }}
                        className="cursor-pointer hover:text-black py-1"
                      >
                        Manage Orders
                      </p>
                    </>
                  )}
                  <p onClick={handleLogout} className="cursor-pointer hover:text-black py-1">
                    Logout
                  </p>
                </>
              ) : (
                <p
                  onClick={() => {
                    navigate("/login");
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Login / Sign Up
                </p>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/34/34568.png"
            alt="Cart"
            className="w-5"
          />
          {getCartCount && getCartCount() > 0 && (
            <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Hamburger Menu (mobile) */}
        <img
          onClick={() => setVisible(true)}
          src="https://cdn-icons-png.flaticon.com/512/2976/2976215.png"
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0 w-3/4 sm:w-1/2" : "translate-x-full w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          {/* Close Button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer border-b"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
              className="h-4 rotate-180"
              alt="back-icon"
            />
            <p>Back</p>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col mt-4 gap-2">
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-4 border-b" to="/">
              HOME
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-4 border-b" to="/collection">
              COLLECTION
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-4 border-b" to="/about">
              ABOUT
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-4 border-b" to="/contact">
              CONTACT
            </NavLink>

            {/* Mobile Admin Links */}
            {user?.isAdmin && (
              <>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-4 border-b font-bold"
                  to="/admin/dashboard"
                >
                  ADMIN DASHBOARD
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-4 border-b"
                  to="/admin/orders"
                >
                  MANAGE ORDERS
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
