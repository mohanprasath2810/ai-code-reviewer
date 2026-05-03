import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import API from "../api/axios";
import toast from "react-hot-toast";

const LANGUAGES = ["javascript", "python", "java", "c++", "typescript"];

const LANG_ICONS = {
  javascript: "JS",
  python: "PY",
  java: "JV",
  "c++": "C+",
  typescript: "TS"
};

export default function Home() {
  const [code, setCode] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim() || code.trim() === "// Write your code here") {
      return toast.error("Please enter some code first!");
    }
    setLoading(true);
    setReview(null);
    try {
      const { data } = await API.post("/review", { code, language });
      setReview(data);
      toast.success("Review complete!");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top left, #0f0f23 0%, #080814 50%, #0a0a1a 100%)",
      paddingTop: "90px", paddingBottom: "60px",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {/* Glow effects */}
      <div style={{
        position: "fixed", top: "10%", left: "20%", zIndex: 0,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        filter: "blur(40px)"
      }} />
      <div style={{
        position: "fixed", bottom: "20%", right: "20%", zIndex: 0,
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        filter: "blur(40px)"
      }} />

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "20px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            marginBottom: "20px"
          }}>
            <span style={{ fontSize: "10px", color: "#6366f1" }}>●</span>
            <span style={{ fontSize: "12px", color: "#a5b4fc", fontFamily: "'DM Mono', monospace" }}>
              AI-Powered • Instant • Free
            </span>
          </div>

          <h1 style={{
            margin: "0 0 16px",
            fontFamily: "'Syne', sans-serif",
            fontSize: "52px", fontWeight: 800, lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Code Review,<br />Powered by AI
          </h1>

          <p style={{
            margin: 0, color: "rgba(165,180,252,0.6)",
            fontSize: "16px", maxWidth: 500, marginLeft: "auto", marginRight: "auto"
          }}>
            Paste your code and get instant feedback on bugs, improvements, and best practices
          </p>
        </div>

        {/* Language Selector */}
        <div style={{
          display: "flex", gap: "10px", justifyContent: "center",
          marginBottom: "28px", flexWrap: "wrap"
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                border: language === lang ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
                background: language === lang ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)",
                color: language === lang ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                cursor: "pointer", fontSize: "13px", fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
                display: "flex", alignItems: "center", gap: "6px",
                transition: "all 0.2s ease",
                boxShadow: language === lang ? "0 0 20px rgba(99,102,241,0.15)" : "none"
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "6px",
                background: language === lang ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "9px", fontWeight: 800, letterSpacing: "-0.5px"
              }}>
                {LANG_ICONS[lang]}
              </span>
              {lang}
            </button>
          ))}
        </div>

        {/* Editor + Review Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div>
            <CodeEditor code={code} setCode={setCode} language={language} />

            {/* Review Button */}
            <button
              onClick={handleReview}
              disabled={loading}
              style={{
                marginTop: "16px", width: "100%", padding: "16px",
                borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer",
                background: loading
                  ? "rgba(99,102,241,0.3)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white", fontSize: "15px", fontWeight: 700,
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.5px",
                boxShadow: loading ? "none" : "0 0 30px rgba(99,102,241,0.4)",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    animation: "spin 1s linear infinite",
                    display: "inline-block"
                  }} />
                  Analyzing Code...
                </>
              ) : (
                <> 🔍 Review My Code </>
              )}
            </button>

            {/* Stats Row */}
            <div style={{
              display: "flex", gap: "12px", marginTop: "16px"
            }}>
              {[
                { label: "Languages", value: "5+" },
                { label: "AI Model", value: "Gemini 2.5" },
                { label: "Response", value: "~3s" }
              ].map((stat, i) => (
                <div key={i} style={{
                  flex: 1, padding: "12px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center"
                }}>
                  <p style={{ margin: 0, color: "#a5b4fc", fontWeight: 700, fontSize: "16px", fontFamily: "'Syne', sans-serif" }}>
                    {stat.value}
                  </p>
                  <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.3)", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ReviewPanel review={review} loading={loading} />
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}