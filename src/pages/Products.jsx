
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import productsData from "../data/products";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("shopeaseProducts");
    return savedProducts ? JSON.parse(savedProducts) : productsData;
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const categories = [
    "All",
    "Electronics",
    "Shoes",
    "Fashion",
    "Home",
    "Accessories",
  ];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "All" ? true : product.category === category
    )
    .filter((product) => Number(product.price) <= maxPrice)
    .filter((product) => Number(product.rating) >= minRating)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setMaxPrice(100000);
    setMinRating(0);
    setSort("featured");
    setSearchParams({});
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "45px 5%" }}>
      <div style={{ marginBottom: "35px" }}>
        <p style={{ color: "#64748b", marginBottom: "8px" }}>SHOP / COLLECTION</p>
        <h1 style={{ fontSize: "36px", color: "#172554", margin: 0 }}>
          Explore Our Products
        </h1>
        <p style={{ color: "#64748b", marginTop: "10px" }}>
          Find your favourite products at the best prices.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "30px" }}>
        {/* Filters */}
        <aside style={{
          background: "white",
          padding: "24px",
          borderRadius: "14px",
          height: "fit-content",
          boxShadow: "0 4px 18px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3><SlidersHorizontal size={18} /> Filters</h3>
            <button onClick={clearFilters} style={clearButton}>
              <X size={14} /> Clear
            </button>
          </div>

          <hr style={lineStyle} />

          <h4>Categories</h4>
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{
                ...categoryButton,
                background: category === item ? "#172554" : "transparent",
                color: category === item ? "white" : "#475569",
              }}
            >
              {item}
            </button>
          ))}

          <hr style={lineStyle} />

          <h4>Maximum Price: Rs. {maxPrice.toLocaleString()}</h4>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#172554" }}
          />

          <hr style={lineStyle} />

          <h4>Minimum Rating</h4>
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              style={{
                ...categoryButton,
                background: minRating === rating ? "#172554" : "transparent",
                color: minRating === rating ? "white" : "#475569",
              }}
            >
              {rating === 0 ? "All Ratings" : `${rating}+ Stars`}
            </button>
          ))}
        </aside>

        {/* Products */}
        <section>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "22px"
          }}>
            <div>
              <h3 style={{ margin: 0, color: "#172554" }}>
                Products ({filteredProducts.length})
              </h3>
              <p style={{ color: "#64748b", margin: "6px 0" }}>
                Browse our latest collection
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Search size={18} color="#64748b" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={searchStyle}
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={searchStyle}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{
              background: "white",
              padding: "50px 20px",
              textAlign: "center",
              borderRadius: "14px"
            }}>
              <h2>No Products Found</h2>
              <p style={{ color: "#64748b" }}>Try changing your filters.</p>
              <button onClick={clearFilters} style={resetButton}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "22px"
            }}>
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{
                    background: "white",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    height: "100%",
                    transition: "transform 0.2s"
                  }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "210px",
                        objectFit: "cover"
                      }}
                    />
                    <div style={{ padding: "17px" }}>
                      <p style={{
                        color: "#64748b",
                        fontSize: "12px",
                        margin: "0 0 8px"
                      }}>
                        {product.category}
                      </p>
                      <h3 style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        color: "#172554"
                      }}>
                        {product.name}
                      </h3>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        color: "#eab308",
                        fontSize: "14px"
                      }}>
                        <Star size={15} fill="currentColor" />
                        {product.rating}
                      </div>
                      <h3 style={{ color: "#2563eb", marginBottom: 0 }}>
                        Rs. {Number(product.price).toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const lineStyle = {
  border: 0,
  borderTop: "1px solid #e2e8f0",
  margin: "20px 0"
};

const categoryButton = {
  display: "block",
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "7px",
  textAlign: "left",
  cursor: "pointer",
  marginBottom: "5px",
  fontSize: "14px"
};

const clearButton = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  border: "none",
  background: "transparent",
  color: "#2563eb",
  cursor: "pointer"
};

const searchStyle = {
  padding: "11px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "white",
  outline: "none"
};

const resetButton = {
  padding: "11px 20px",
  background: "#172554",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default Products;
