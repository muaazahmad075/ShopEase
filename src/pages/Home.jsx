
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
  Tag,
} from "lucide-react";
import productsData from "../data/products";

function Home() {
  const savedProducts = JSON.parse(
    localStorage.getItem("shopeaseProducts")
  );

  const products = savedProducts || productsData;

  const categories = [
    { name: "Electronics", icon: "🎧", color: "#e8f0ff" },
    { name: "Fashion", icon: "👕", color: "#fff0e8" },
    { name: "Shoes", icon: "👟", color: "#e9f7ef" },
    { name: "Home", icon: "🏠", color: "#f4edff" },
    { name: "Accessories", icon: "⌚", color: "#fff5df" },
  ];

  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <div style={{ background: "#f8fafc", color: "#172033" }}>

      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "440px",
          margin: "25px auto",
          width: "94%",
          maxWidth: "1450px",
          borderRadius: "18px",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(90deg, rgba(10,25,47,0.94), rgba(10,25,47,0.35)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "55px",
        }}
      >
        <div style={{ maxWidth: "570px", color: "white" }}>
          <span
            style={{
              background: "#f97316",
              padding: "8px 15px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            THE BIG SHOPPING EXPERIENCE
          </span>

          <h1
            style={{
              fontSize: "clamp(35px, 5vw, 58px)",
              lineHeight: "1.15",
              margin: "25px 0 15px",
            }}
          >
            Discover Your Style. Shop Your Way.
          </h1>

          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#e2e8f0" }}>
            Explore amazing products, discover new trends and enjoy
            an easy shopping experience with ShopEase.
          </p>

          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "28px",
              background: "#f97316",
              color: "white",
              padding: "14px 25px",
              borderRadius: "7px",
              fontWeight: "bold",
            }}
          >
            Explore Products <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        style={{
          width: "92%",
          maxWidth: "1300px",
          margin: "35px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
        }}
      >
        {[
          {
            icon: <Truck size={27} />,
            title: "Fast Delivery",
            desc: "Quick and reliable shipping",
          },
          {
            icon: <ShieldCheck size={27} />,
            title: "Secure Shopping",
            desc: "A smooth shopping experience",
          },
          {
            icon: <Headphones size={27} />,
            title: "Customer Support",
            desc: "We are here to help",
          },
          {
            icon: <Tag size={27} />,
            title: "Great Deals",
            desc: "Explore exciting offers",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ color: "#f97316" }}>{item.icon}</div>
            <div>
              <h4>{item.title}</h4>
              <p style={{ color: "#778094", fontSize: "12px", marginTop: "5px" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section style={{ width: "92%", maxWidth: "1300px", margin: "65px auto" }}>
        <div style={{ marginBottom: "25px" }}>
          <p style={{ color: "#f97316", fontWeight: "bold", fontSize: "13px" }}>
            EXPLORE COLLECTIONS
          </p>
          <h2 style={{ fontSize: "29px", marginTop: "8px" }}>
            Shop by Category
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
            gap: "18px",
          }}
        >
          {categories.map((category) => (
            <Link
              to="/products"
              key={category.name}
              style={{
                background: category.color,
                padding: "25px 12px",
                textAlign: "center",
                borderRadius: "13px",
                color: "#172033",
                transition: "0.2s",
              }}
            >
              <div style={{ fontSize: "42px", marginBottom: "12px" }}>
                {category.icon}
              </div>
              <h3 style={{ fontSize: "15px" }}>{category.name}</h3>
              <p style={{ fontSize: "12px", marginTop: "7px", color: "#64748b" }}>
                Explore Now →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ width: "92%", maxWidth: "1300px", margin: "65px auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div>
            <p style={{ color: "#f97316", fontWeight: "bold", fontSize: "13px" }}>
              HANDPICKED FOR YOU
            </p>
            <h2 style={{ fontSize: "29px", marginTop: "8px" }}>
              Featured Products
            </h2>
          </div>

          <Link to="/products" style={{ color: "#f97316", fontWeight: "bold" }}>
            View All Products →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "22px",
          }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "13px",
                overflow: "hidden",
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
              }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
              </Link>

              <div style={{ padding: "17px" }}>
                <p style={{ color: "#f97316", fontSize: "12px" }}>
                  {product.category}
                </p>

                <h3 style={{ margin: "9px 0", fontSize: "17px" }}>
                  {product.name}
                </h3>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ color: "#172033" }}>
                    Rs. {product.price}
                  </h3>
                  <span style={{ color: "#e9a11b", fontSize: "14px" }}>
                    <Star size={14} fill="#e9a11b" /> {product.rating}
                  </span>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#172033",
                    color: "white",
                    padding: "11px",
                    borderRadius: "7px",
                    marginTop: "15px",
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIAL OFFER BANNER */}
      <section
        style={{
          width: "92%",
          maxWidth: "1300px",
          margin: "70px auto",
          padding: "40px",
          borderRadius: "16px",
          background: "linear-gradient(110deg, #172033, #334b68)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        <div>
          <p style={{ color: "#fb923c", fontWeight: "bold" }}>
            SHOP MORE, DISCOVER MORE
          </p>
          <h2 style={{ fontSize: "30px", margin: "12px 0" }}>
            Find Something You'll Love
          </h2>
          <p style={{ color: "#cbd5e1" }}>
            Explore our complete collection of products.
          </p>
        </div>

        <Link
          to="/products"
          style={{
            background: "#f97316",
            color: "white",
            padding: "14px 24px",
            borderRadius: "7px",
            fontWeight: "bold",
          }}
        >
          Shop Now →
        </Link>
      </section>

      {/* BEST SELLERS */}
      <section style={{ width: "92%", maxWidth: "1300px", margin: "65px auto" }}>
        <p style={{ color: "#f97316", fontWeight: "bold", fontSize: "13px" }}>
          CUSTOMER FAVOURITES
        </p>
        <h2 style={{ fontSize: "29px", margin: "8px 0 25px" }}>
          More Products to Explore
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "22px",
          }}
        >
          {bestSellers.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              style={{
                background: "white",
                borderRadius: "13px",
                overflow: "hidden",
                color: "#172033",
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "210px", objectFit: "cover" }}
              />
              <div style={{ padding: "17px" }}>
                <p style={{ color: "#f97316", fontSize: "12px" }}>
                  {product.category}
                </p>
                <h3 style={{ margin: "8px 0" }}>{product.name}</h3>
                <h3>Rs. {product.price}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
