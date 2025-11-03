import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, currency } = useContext(ShopContext);

  // find the product by ID
  const product = products.find((item) => item._id === id);

  if (!product) {
    return <p className="text-center text-gray-600 mt-10">Product not found.</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
        />
        <div>
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
          <p className="text-gray-700 mb-3">{currency}{product.price}</p>
          <p className="text-gray-600 mb-5">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
