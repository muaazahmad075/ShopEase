
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (
      email === "admin@shopease.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password!");
    }
  }

  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    }}>

      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 15px #ddd"
        }}
      >
        <LockKeyhole size={40} color="#f97316" />

        <h2 style={{ margin: "15px 0" }}>
          Admin Login
        </h2>

        <label>Email Address</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0 20px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0 20px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        />

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px",
            background: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "20px", fontSize: "13px" }}>
          Demo Email: admin@shopease.com
          <br />
          Demo Password: admin123
        </p>

      </form>
    </div>
  );
}

export default AdminLogin;
