
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

function AdminDashboard() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to ShopEase Admin Panel</p>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "30px"
      }}>
        <Link to="/admin/dashboard">
          <LayoutDashboard /> Dashboard
        </Link>

        <Link to="/admin/products">
          <Package /> Manage Products
        </Link>

        <Link to="/admin/orders">
          <ShoppingCart /> Manage Orders
        </Link>

        <Link to="/admin/login">
          <LogOut /> Logout
        </Link>
      </div>

      <h2 style={{ marginTop: "40px" }}>
        ShopEase Admin Panel
      </h2>
      <p>Manage your products and customer orders here.</p>
    </div>
  );
}

export default AdminDashboard;
