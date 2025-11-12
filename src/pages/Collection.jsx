import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize categories and filtered products
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    setAvailableCategories(uniqueCategories);
    setFilterProducts(products);
    setCategories([]);
  }, [products]);

  // Read search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchQuery(query.toLowerCase());
  }, [location.search]);

  // Toggle category selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCategories((prev) =>
      isChecked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  // Filter & sort products
  useEffect(() => {
    let filtered = [...products];

    if (categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      );
    }

    if (sortOption === "low-high") filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "high-low") filtered.sort((a, b) => b.price - a.price);

    setFilterProducts(filtered);
  }, [categories, sortOption, products, searchQuery]);

  const clearFilters = () => {
    setCategories([]);
    setSortOption("relevant");
    navigate("/collection");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 border-t py-6 px-4 sm:px-0">
      {/* LEFT SIDE - Filters */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-4 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {availableCategories.map((cat) => (
              <label key={cat} className="flex gap-2 items-center">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={categories.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
          <button
            onClick={clearFilters}
            className="mt-3 text-green-700 font-semibold text-sm"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - Product list */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="border-2 border-gray-300 text-sm px-2 py-1"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}       // ✅ Use MongoDB _id
                _id={item._id}       // ✅ Pass _id to ProductItem
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
