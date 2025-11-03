import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const { getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  // Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/collection?search=${query}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative px-4 sm:px-10 bg-white shadow">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-green-700">AgriLink</h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          HOME
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          COLLECTION
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          ABOUT
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          CONTACT
        </NavLink>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          className="w-5 cursor-pointer"
          alt="Search"
          onClick={() => setShowSearch(!showSearch)}
        />

        {/* Profile */}
        <div className="relative">
          <img
            className="w-5 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            onClick={() => setProfileOpen(!profileOpen)}
          />
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
              <p
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="cursor-pointer hover:text-black"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate("/orders");
                  setProfileOpen(false);
                }}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p
                onClick={() => {
                  navigate("/logout");
                  setProfileOpen(false);
                }}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
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
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Hamburger Menu */}
        <img
          onClick={() => setVisible(true)}
          src="https://cdn-icons-png.flaticon.com/512/2976/2976215.png"
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Search Bar */}
      {showSearch && (
        <form
          onSubmit={handleSearch}
          className="absolute left-1/2 transform -translate-x-1/2 top-16 bg-white shadow-lg rounded-md flex items-center px-2 py-1 border z-50"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="outline-none px-2 text-sm"
          />
          <button type="submit" className="px-2 text-green-700 font-semibold">
            Go
          </button>
        </form>
      )}

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
          <div className="flex flex-col mt-4">
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-4 border-b"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-4 border-b"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-4 border-b"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-4 border-b"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
