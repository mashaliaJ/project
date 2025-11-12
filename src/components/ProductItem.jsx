import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ _id, image, name, price }) => {
  const { currency, addToCart, cartItems } = useContext(ShopContext);

  return (
    <div className="border p-3 flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* 🖼️ Product Image + Link */}
      <Link to={`/product/${_id}`} className="w-full">
        <div className="overflow-hidden rounded-md">
          <img
            className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
            src={image}
            alt={name}
          />
        </div>
      </Link>

      {/* 🧾 Product Name & Price */}
      <p className="pt-3 pb-1 text-sm text-center font-medium">{name}</p>
      <p className="text-sm font-semibold text-gray-700">
        {currency} {price.toLocaleString()}
      </p>

      {/* 🛒 Add to Cart Button */}
      <button
        onClick={() => addToCart(_id)}
        className="mt-2 bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800 transition-colors duration-200"
      >
        Add to Cart
      </button>

      {/* 🧮 Show quantity in cart dynamically */}
      {cartItems[_id] && (
        <p className="text-xs text-gray-500 mt-1">
          In cart: {cartItems[_id]}
        </p>
      )}
    </div>
  );
};

export default ProductItem;
