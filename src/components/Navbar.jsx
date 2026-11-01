
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Store,
} from "lucide-react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    function updateCartCount() {
      const cart = JSON.parse(
        localStorage.getItem("shopeaseCart") || "[]"
      );

      const count = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );

      setCartCount(count);
    }

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  }

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          <span style={logoIcon}>
            <Store size={23} />
          </span>

          <span>
            Shop<span style={{ color: "#f97316" }}>Ease</span>
            <small style={taglineStyle}>SHOP SMART. LIVE BETTER.</small>
          </span>
        </Link>

        <div style={desktopLinks}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/products" style={linkStyle}>Products</Link>
          <Link to="/products" style={linkStyle}>Categories</Link>
          <Link to="/admin" style={linkStyle}>Admin</Link>
        </div>

        <form onSubmit={handleSearch} style={searchStyle}>
          <Search size={19} color="#64748b" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={searchInput}
          />

          <button type="submit" style={searchButton}>
            Search
          </button>
        </form>

        <div style={rightLinks}>
          <Link to="/cart" style={cartStyle}>
            <span style={{ position: "relative" }}>
              <ShoppingCart size={23} />

              {cartCount > 0 && (
                <span style={countStyle}>{cartCount}</span>
              )}
            </span>

            <span>Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

const headerStyle = {
  background: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
};

const navStyle = {
  maxWidth: "1450px",
  width: "94%",
  minHeight: "85px",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "25px",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#172033",
  fontSize: "25px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const logoIcon = {
  width: "43px",
  height: "43px",
  background: "#fff0e5",
  color: "#f97316",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const taglineStyle = {
  display: "block",
  fontSize: "9px",
  letterSpacing: "1px",
  color: "#94a3b8",
  marginTop: "3px",
};

const desktopLinks = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const linkStyle = {
  color: "#334155",
  fontSize: "14px",
  fontWeight: "600",
};

const searchStyle = {
  display: "flex",
  alignItems: "center",
  gap: "9px",
  background: "#f1f5f9",
  borderRadius: "8px",
  padding: "5px 8px 5px 12px",
  flex: 1,
  maxWidth: "370px",
};

const searchInput = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  minWidth: "0",
  padding: "9px 0",
};

const searchButton = {
  background: "#f97316",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "9px 12px",
  cursor: "pointer",
};

const rightLinks = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const cartStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#172033",
  fontWeight: "600",
};

const countStyle = {
  position: "absolute",
  top: "-9px",
  right: "-10px",
  background: "#f97316",
  color: "white",
  borderRadius: "50%",
  fontSize: "10px",
  minWidth: "17px",
  height: "17px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Navbar;
