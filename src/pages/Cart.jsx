
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import productsData from "../data/products";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("shopeaseCart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("shopeaseCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "45px 5%" }}>
      <h1 style={{ color: "#172554", fontSize: "34px" }}>Shopping Cart</h1>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Review your items before checkout.
      </p>

      {cart.length === 0 ? (
        <div style={{
          background: "white",
          textAlign: "center",
          padding: "65px 20px",
          borderRadius: "15px"
        }}>
          <ShoppingBag size={55} color="#94a3b8" />
          <h2>Your Cart is Empty</h2>
          <p style={{ color: "#64748b" }}>
            You haven't added any products to your cart yet.
          </p>
          <Link to="/products" style={shopButton}>
            Continue Shopping <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)",
          gap: "25px",
          alignItems: "start"
        }}>
          {/* Cart Items */}
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px"
          }}>
            <h3 style={{ color: "#172554" }}>
              Your Items ({totalItems})
            </h3>

            {cart.map((item) => {
              const product = productsData.find(
                (p) => String(p.id) === String(item.id)
              );
              const image = item.image || product?.image;
              const name = item.name || product?.name;

              return (
                <div key={item.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "20px 0",
                  borderBottom: "1px solid #e2e8f0",
                  flexWrap: "wrap"
                }}>
                  <img
                    src={image}
                    alt={name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />

                  <div style={{ flex: 1, minWidth: "120px" }}>
                    <h3 style={{ margin: "0 0 8px", color: "#172554" }}>
                      {name}
                    </h3>
                    <p style={{ color: "#2563eb", fontWeight: "bold" }}>
                      Rs. {Number(item.price).toLocaleString()}
                    </p>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        style={quantityButton}
                      >
                        <Minus size={15} />
                      </button>

                      <strong>{item.quantity || 1}</strong>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        style={quantityButton}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong>
                      Rs. {(Number(item.price) * (item.quantity || 1)).toLocaleString()}
                    </strong>
                    <br />
                    <button
                      onClick={() => removeItem(item.id)}
                      style={removeButton}
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.04)"
          }}>
            <h2 style={{ color: "#172554", marginTop: 0 }}>
              Order Summary
            </h2>

            <div style={summaryRow}>
              <span>Items ({totalItems})</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div style={summaryRow}>
              <span>Shipping</span>
              <span>Rs. {shipping.toLocaleString()}</span>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #e2e8f0" }} />

            <div style={{
              ...summaryRow,
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              <span>Total</span>
              <span style={{ color: "#2563eb" }}>
                Rs. {total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={checkoutButton}
            >
              Proceed to Checkout <ArrowRight size={17} />
            </button>

            <Link to="/products" style={{
              display: "block",
              textAlign: "center",
              color: "#2563eb",
              marginTop: "18px",
              textDecoration: "none"
            }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const quantityButton = {
  width: "30px",
  height: "30px",
  border: "1px solid #cbd5e1",
  background: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const removeButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  border: "none",
  background: "transparent",
  color: "#dc2626",
  cursor: "pointer",
  marginTop: "12px"
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  margin: "18px 0",
  gap: "10px"
};

const checkoutButton = {
  width: "100%",
  padding: "14px",
  background: "#172554",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  marginTop: "25px",
  fontWeight: "bold"
};

const shopButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "#172554",
  color: "white",
  padding: "13px 22px",
  borderRadius: "8px",
  textDecoration: "none",
  marginTop: "15px"
};

export default Cart;
