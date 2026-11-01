
import { Link } from "react-router-dom";
import {
  Store,

  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

function Footer() {
  return (
    <footer style={{ background: "#111c2e", color: "white", marginTop: "60px" }}>
      <div
        style={{
          maxWidth: "1300px",
          width: "92%",
          margin: "auto",
          padding: "55px 0 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "40px",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "white",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            <Store size={29} color="#f97316" />
            Shop<span style={{ color: "#f97316" }}>Ease</span>
          </Link>

          <p style={descriptionStyle}>
            Discover quality products, explore amazing collections
            and enjoy a smarter shopping experience with ShopEase.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
  <SocialIcon icon="f" />
  <SocialIcon icon="◎" />
  <SocialIcon icon="𝕏" />
</div>
        </div>

        <div>
          <h3 style={headingStyle}>Quick Links</h3>
          <Link to="/" style={footerLink}>Home</Link>
          <Link to="/products" style={footerLink}>All Products</Link>
          <Link to="/cart" style={footerLink}>Shopping Cart</Link>
          <Link to="/admin" style={footerLink}>Admin Login</Link>
        </div>

        <div>
          <h3 style={headingStyle}>Customer Support</h3>
          <p style={footerText}>Help Center</p>
          <p style={footerText}>Shopping Guide</p>
          <p style={footerText}>Privacy Policy</p>
          <p style={footerText}>Terms & Conditions</p>
        </div>

        <div>
          <h3 style={headingStyle}>Contact Us</h3>
          <p style={contactStyle}><Mail size={17} /> support@shopease.com</p>
          <p style={contactStyle}><Phone size={17} /> +92 300 1234567</p>
          <p style={contactStyle}><MapPin size={17} /> Pakistan</p>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid #334155",
        padding: "22px 15px",
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "13px",
      }}>
        © 2026 ShopEase. All rights reserved.
        <p style={{ marginTop: "7px" }}>
          Designed with care for a better shopping experience.
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <span
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        background: "#26364c",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "19px",
      }}
    >
      {icon}
    </span>
  );
}

const descriptionStyle = {
  color: "#aab6c7",
  lineHeight: "1.8",
  fontSize: "14px",
  marginTop: "18px",
};

const headingStyle = {
  fontSize: "17px",
  marginBottom: "22px",
  color: "white",
};

const footerLink = {
  display: "block",
  color: "#aab6c7",
  marginBottom: "15px",
  fontSize: "14px",
};

const footerText = {
  color: "#aab6c7",
  marginBottom: "15px",
  fontSize: "14px",
};

const contactStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#aab6c7",
  marginBottom: "17px",
  fontSize: "13px",
};

export default Footer;
