import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // ✅ Must match your route param
  const navigate = useNavigate();

  const { currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
    else setError("Invalid product ID");
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading product...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!product)
    return <p className="text-center text-gray-600 mt-10">Product not found.</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
          onError={(e) => (e.target.src = "/images/default.jpeg")}
        />

        {/* Product Details */}
        <div>
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
          <p className="text-gray-700 mb-3">
            {currency} {product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-5">{product.description}</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
