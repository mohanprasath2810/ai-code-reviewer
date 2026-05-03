import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "16px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,8,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(99,102,241,0.2)" : "none",
      transition: "all 0.3s ease"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", boxShadow: "0 0 20px rgba(99,102,241,0.4)"
        }}>🤖</div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, fontSize: "18px",
          background: "linear-gradient(135deg, #fff, #a5b4fc)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>CodeReview AI</span>
      </div>

      {/* Badge */}
      <div style={{
        padding: "6px 16px", borderRadius: "20px",
        background: "rgba(99,102,241,0.15)",
        border: "1px solid rgba(99,102,241,0.3)",
        fontSize: "12px", color: "#a5b4fc", fontFamily: "'DM Mono', monospace"
      }}>
        ⚡ Powered by Gemini 2.5
      </div>
    </nav>
  );
}