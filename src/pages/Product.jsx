import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(
        (item) => item.id === Number(productId)
      );
      setProductData(foundProduct || null);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="p-10 text-center text-gray-600">Loading product details...</div>;
  }

  return (
    <div className="border-t pt-10 px-6 sm:px-12">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full max-w-md rounded-lg object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{productData.name}</h1>
          <p className="text-lg text-gray-700 font-medium">
            {currency}{productData.price}
          </p>
          <p className="text-gray-600">
            This is a short description for {productData.name}.
          </p>

          <button
            className="bg-black text-white py-2 px-6 w-fit rounded-md hover:bg-gray-800 transition"
            onClick={() => addToCart(productData.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
