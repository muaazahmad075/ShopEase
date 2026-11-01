
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, CheckCircle } from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(() =>
    JSON.parse(localStorage.getItem("shopeaseCart") || "[]")
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/products");
      return;
    }

    const newOrder = {
      id: "ORD-" + Date.now(),
      customer: { ...formData },
      items: cart,
      subtotal,
      shipping,
      total,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("shopeaseOrders") || "[]"
    );

    localStorage.setItem(
      "shopeaseOrders",
      JSON.stringify([...existingOrders, newOrder])
    );

    localStorage.removeItem("shopeaseCart");
    window.dispatchEvent(new Event("cartUpdated"));

    setOrderId(newOrder.id);
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div style={{
        minHeight: "65vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: "#f8fafc"
      }}>
        <div style={{
          background: "white",
          padding: "45px",
          borderRadius: "15px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%"
        }}>
          <CheckCircle size={65} color="#16a34a" />
          <h1 style={{ color: "#172554" }}>Order Placed!</h1>
          <p style={{ color: "#64748b" }}>
            Thank you for shopping with ShopEase.
          </p>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Total:</strong> Rs. {total.toLocaleString()}</p>

          <Link to="/products" style={buttonStyle}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "70px 20px",
        minHeight: "50vh"
      }}>
        <ShoppingBag size={55} color="#94a3b8" />
        <h2>Your Cart is Empty</h2>
        <p>Add products before proceeding to checkout.</p>
        <Link to="/products" style={buttonStyle}>
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      background: "#f8fafc",
      minHeight: "100vh",
      padding: "45px 5%"
    }}>
      <h1 style={{ color: "#172554" }}>Checkout</h1>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Complete your delivery information.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)",
        gap: "25px",
        alignItems: "start"
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px"
          }}
        >
          <h2 style={{ color: "#172554" }}>Delivery Details</h2>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            placeholder="Enter your complete delivery address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="4"
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <button type="submit" style={buttonStyle}>
            Place Order
          </button>
        </form>

        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "14px"
        }}>
          <h2 style={{ color: "#172554" }}>Your Order</h2>

          {cart.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              margin: "15px 0",
              fontSize: "14px"
            }}>
              <span>{item.name} × {item.quantity || 1}</span>
              <strong>
                Rs. {(Number(item.price) * (item.quantity || 1)).toLocaleString()}
              </strong>
            </div>
          ))}

          <hr />

          <div style={summaryRow}>
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>

          <div style={summaryRow}>
            <span>Shipping</span>
            <span>Rs. {shipping.toLocaleString()}</span>
          </div>

          <hr />

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

          <p style={{
            color: "#64748b",
            fontSize: "13px",
            marginTop: "20px"
          }}>
            Payment method: Cash on Delivery
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "13px",
  margin: "9px 0 20px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "14px"
};

const buttonStyle = {
  display: "inline-flex",
  justifyContent: "center",
  width: "100%",
  padding: "14px",
  background: "#172554",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
  boxSizing: "border-box",
  marginTop: "15px"
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  margin: "17px 0"
};

export default Checkout;
