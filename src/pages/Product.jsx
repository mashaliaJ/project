import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 1️⃣ Try to find product in context first
        if (products && products.length > 0) {
          const foundProduct = products.find(item => item._id === productId);
          if (foundProduct) {
            setProductData(foundProduct);
            setLoading(false);
            return;
          }
        }

        // 2️⃣ If not found in context, fetch from backend
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProductData(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, products]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">{error}</div>
    );
  }

  if (!productData) {
    return (
      <div className="p-10 text-center text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="border-t pt-10 px-6 sm:px-12">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full max-w-md rounded-lg object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{productData.name}</h1>
          <p className="text-lg text-gray-700 font-medium">
            {currency} {productData.price.toLocaleString()}
          </p>
          <p className="text-gray-600">{productData.description}</p>

          <button
            className="bg-black text-white py-2 px-6 w-fit rounded-md hover:bg-gray-800 transition"
            onClick={() => addToCart(productData._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
