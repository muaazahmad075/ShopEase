
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import productsData from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const allProducts = JSON.parse(
    localStorage.getItem("shopeaseProducts") || "null"
  ) || productsData;

  const product = allProducts.find(
    (item) => String(item.id) === id
  );

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("shopeaseCart") || "[]");
  });

  function addToCart() {
    if (!product) return;

    const existing = cart.find(
      (item) => String(item.id) === String(product.id)
    );

    const currentQuantity = existing ? existing.quantity || 1 : 0;

    if (product.stock !== undefined && currentQuantity >= Number(product.stock)) {
      alert("Sorry! Available stock limit reached.");
      return;
    }

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: currentQuantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("shopeaseCart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  }

  if (!product) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Product not found!</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{
      padding: "50px 5%",
      minHeight: "70vh",
      background: "#f8fafc"
    }}>
      <Link
        to="/products"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "#172554",
          textDecoration: "none"
        }}
      >
        <ArrowLeft size={18} /> Back to Products
      </Link>

      <div style={{
        display: "flex",
        gap: "45px",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: "35px",
        background: "white",
        padding: "30px",
        borderRadius: "16px"
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "450px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "12px"
          }}
        />

        <div style={{ flex: 1, minWidth: "250px" }}>
          <p style={{ color: "#2563eb", fontWeight: "bold" }}>
            {product.category}
          </p>

          <h1 style={{ color: "#172554", fontSize: "32px" }}>
            {product.name}
          </h1>

          <h2 style={{ color: "#2563eb" }}>
            Rs. {Number(product.price).toLocaleString()}
          </h2>

          <p>⭐ {product.rating} / 5</p>

          <p style={{
            lineHeight: "1.8",
            color: "#64748b",
            margin: "20px 0"
          }}>
            {product.description}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
          </p>

          <button
            onClick={addToCart}
            disabled={Number(product.stock) <= 0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: Number(product.stock) > 0 ? "#172554" : "#94a3b8",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "8px",
              cursor: Number(product.stock) > 0 ? "pointer" : "not-allowed",
              fontWeight: "bold"
            }}
          >
            <ShoppingCart size={20} />
            {Number(product.stock) > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          <div style={{ marginTop: "20px" }}>
            <Link to="/cart" style={{ color: "#2563eb" }}>
              View Shopping Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
