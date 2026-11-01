
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Edit, X, Save } from "lucide-react";
import productsData from "../data/products";

function ManageProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("shopeaseProducts");
    return saved ? JSON.parse(saved) : productsData;
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("10");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  function saveProducts(updated) {
    setProducts(updated);
    localStorage.setItem("shopeaseProducts", JSON.stringify(updated));
  }

  function resetForm() {
    setName("");
    setPrice("");
    setCategory("Electronics");
    setImage("");
    setStock("10");
    setDescription("");
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId !== null) {
      const updated = products.map((product) =>
        product.id === editingId
          ? {
              ...product,
              name,
              price: Number(price),
              category,
              image: image || product.image,
              stock: Number(stock),
              description,
            }
          : product
      );

      saveProducts(updated);
      alert("Product updated successfully!");
    } else {
      const newProduct = {
        id: Date.now(),
        name,
        price: Number(price),
        oldPrice: Number(price),
        category,
        rating: 4.5,
        stock: Number(stock),
        image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        description: description || "A quality product from ShopEase.",
      };

      saveProducts([...products, newProduct]);
      alert("Product added successfully!");
    }

    resetForm();
  }

  function editProduct(product) {
    setEditingId(product.id);
    setName(product.name);
    setPrice(String(product.price));
    setCategory(product.category);
    setImage(product.image || "");
    setStock(String(product.stock ?? 10));
    setDescription(product.description || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const updated = products.filter((product) => product.id !== id);
    saveProducts(updated);

    if (editingId === id) resetForm();

    alert("Product deleted successfully!");
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

      <h1 style={{ color: "#172554", margin: "25px 0" }}>
        Manage Products
      </h1>

      <form
        onSubmit={handleSubmit}
        style={formStyle}
      >
        <h2 style={{ color: "#172554", marginTop: 0 }}>
          {editingId !== null ? "Edit Product" : "Add New Product"}
        </h2>

        <label>Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
          style={inputStyle}
        />

        <label>Price (Rs.)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price in Rs."
          min="1"
          required
          style={inputStyle}
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option>Electronics</option>
          <option>Shoes</option>
          <option>Fashion</option>
          <option>Home</option>
          <option>Accessories</option>
        </select>

        <label>Available Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          required
          style={inputStyle}
        />

        <label>Product Image URL</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Paste image URL"
          style={inputStyle}
        />

        <label>Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write product description"
          rows="3"
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={buttonStyle}>
            {editingId !== null ? <Save size={18} /> : <Plus size={18} />}
            {editingId !== null ? "Update Product" : "Add Product"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              style={cancelButton}
            >
              <X size={18} /> Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{ color: "#172554", marginTop: "35px" }}>
        All Products ({products.length})
      </h2>

      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={productCard}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "75px",
                height: "75px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <div style={{ flex: 1, minWidth: "120px" }}>
              <h3 style={{ color: "#172554", margin: "0 0 8px" }}>
                {product.name}
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                {product.category} — Rs. {Number(product.price).toLocaleString()}
              </p>
              <p style={{ color: "#64748b", fontSize: "13px" }}>
                Stock: {product.stock}
              </p>
            </div>

            <button
              onClick={() => editProduct(product)}
              style={editButton}
              title="Edit product"
            >
              <Edit size={17} />
            </button>

            <button
              onClick={() => deleteProduct(product.id)}
              style={deleteButton}
              title="Delete product"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
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

const formStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  marginBottom: "30px",
  display: "grid",
  gap: "12px",
  maxWidth: "600px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.04)"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "7px",
  boxSizing: "border-box"
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px",
  background: "#172554",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  flex: 1
};

const cancelButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
  padding: "12px",
  background: "#e2e8f0",
  color: "#334155",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer"
};

const productCard = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap"
};

const editButton = {
  background: "#dbeafe",
  color: "#2563eb",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteButton = {
  background: "#fee2e2",
  color: "#dc2626",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default ManageProducts;
