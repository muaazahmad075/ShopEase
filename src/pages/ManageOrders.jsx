
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Trash2 } from "lucide-react";

function ManageOrders() {
  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("shopeaseOrders") || "[]")
  );

  function updateStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("shopeaseOrders", JSON.stringify(updatedOrders));
  }

  function deleteOrder(orderId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    const updatedOrders = orders.filter(
      (order) => order.id !== orderId
    );

    setOrders(updatedOrders);
    localStorage.setItem("shopeaseOrders", JSON.stringify(updatedOrders));
  }

  return (
    <div style={{
      padding: "35px 5%",
      minHeight: "70vh",
      background: "#f8fafc"
    }}>
      <Link to="/admin/dashboard" style={backLink}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <h1 style={{ color: "#172554", marginTop: "25px" }}>
        Manage Orders
      </h1>

      <p style={{ color: "#64748b" }}>
        View customer orders and manage their status.
      </p>

      <div style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        margin: "25px 0"
      }}>
        <div style={statCard}>
          <Package color="#2563eb" />
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div style={statCard}>
          <Package color="#d97706" />
          <h2>{orders.filter((o) => o.status === "Pending").length}</h2>
          <p>Pending Orders</p>
        </div>

        <div style={statCard}>
          <Package color="#16a34a" />
          <h2>{orders.filter((o) => o.status === "Delivered").length}</h2>
          <p>Delivered Orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={{
          background: "white",
          padding: "50px 20px",
          textAlign: "center",
          borderRadius: "12px"
        }}>
          <Package size={50} color="#94a3b8" />
          <h2>No Orders Yet</h2>
          <p style={{ color: "#64748b" }}>
            Customer orders will appear here after checkout.
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gap: "20px"
        }}>
          {orders.map((order) => (
            <div key={order.id} style={orderCard}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "15px"
              }}>
                <div>
                  <h3 style={{ color: "#172554", margin: "0 0 8px" }}>
                    {order.id}
                  </h3>
                  <p style={smallText}>
                    Order Date: {order.date || "Not available"}
                  </p>
                </div>

                <button
                  onClick={() => deleteOrder(order.id)}
                  style={deleteButton}
                >
                  <Trash2 size={16} /> Delete Order
                </button>
              </div>

              <hr style={lineStyle} />

              <h4>Customer Details</h4>
              <p style={smallText}>
                <strong>Name:</strong> {order.customer?.name}
              </p>
              <p style={smallText}>
                <strong>Email:</strong> {order.customer?.email}
              </p>
              <p style={smallText}>
                <strong>Phone:</strong> {order.customer?.phone}
              </p>
              <p style={smallText}>
                <strong>Address:</strong> {order.customer?.address}
              </p>

              <hr style={lineStyle} />

              <h4>Ordered Products</h4>

              {(order.items || []).map((item) => (
                <div key={item.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  margin: "12px 0",
                  fontSize: "14px"
                }}>
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <strong>
                    Rs. {(Number(item.price) * (item.quantity || 1)).toLocaleString()}
                  </strong>
                </div>
              ))}

              <hr style={lineStyle} />

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px"
              }}>
                <div>
                  <strong style={{ color: "#172554", fontSize: "18px" }}>
                    Total: Rs. {Number(order.total).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px"
                  }}>
                    Order Status
                  </label>

                  <select
                    value={order.status || "Pending"}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={statusSelect}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const backLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  color: "#172554",
  textDecoration: "none"
};

const statCard = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  minWidth: "150px",
  flex: 1
};

const orderCard = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 3px 15px rgba(0,0,0,0.04)"
};

const smallText = {
  color: "#64748b",
  fontSize: "14px",
  margin: "9px 0"
};

const lineStyle = {
  border: "none",
  borderTop: "1px solid #e2e8f0",
  margin: "18px 0"
};

const deleteButton = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: "#fee2e2",
  color: "#dc2626",
  border: "none",
  borderRadius: "7px",
  padding: "9px 12px",
  cursor: "pointer"
};

const statusSelect = {
  padding: "10px",
  border: "1px solid #cbd5e1",
  borderRadius: "7px",
  background: "white",
  cursor: "pointer"
};

export default ManageOrders;
