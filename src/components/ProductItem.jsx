import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart, cartItems } = useContext(ShopContext);

  return (
    <div className='border p-3 flex flex-col items-center'>
      
      {/* Product Image + Link */}
      <Link to={`/product/${id}`} className='cursor-pointer w-full'>
        <div className='overflow-hidden'>
          <img
            className='hover:scale-110 transition ease-in-out w-full'
            src={image}
            alt={name}
          />
        </div>
      </Link>

      {/* Product Name & Price */}
      <p className='pt-3 pb-1 text-sm text-center'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(id)}
        className='mt-2 bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800 transition'
      >
        Add to Cart
      </button>

      {/* Optional: Show quantity in cart */}
      {cartItems[id] && (
        <p className='text-xs text-gray-500 mt-1'>In cart: {cartItems[id]}</p>
      )}

    </div>
  );
}

export default ProductItem;
