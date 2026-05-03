export default function ReviewPanel({ review, loading }) {

  if (loading) return (
    <div style={{
      height: "460px", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "20px",
      border: "1px solid rgba(99,102,241,0.3)", borderRadius: "16px",
      background: "rgba(15,15,35,0.6)"
    }}>
      <div style={{ position: "relative", width: 60, height: 60 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#6366f1",
          animation: "spin 1s linear infinite"
        }} />
        <div style={{
          position: "absolute", inset: 6, borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#8b5cf6",
          animation: "spin 1.5s linear infinite reverse"
        }} />
        <div style={{
          position: "absolute", inset: 12, borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px"
        }}>🤖</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#a5b4fc", fontFamily: "'Syne', sans-serif", fontSize: "16px", margin: 0 }}>
          Analyzing your code...
        </p>
        <p style={{ color: "rgba(165,180,252,0.5)", fontSize: "13px", marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
          Gemini AI is reviewing
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!review) return (
    <div style={{
      height: "460px", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "16px",
      border: "1px dashed rgba(99,102,241,0.3)", borderRadius: "16px",
      background: "rgba(15,15,35,0.3)"
    }}>
      <div style={{ fontSize: "48px", opacity: 0.4 }}>💬</div>
      <p style={{ color: "rgba(165,180,252,0.5)", fontFamily: "'Syne', sans-serif", fontSize: "15px" }}>
        Your review will appear here
      </p>
    </div>
  );

  const score = review.score || 0;
  const scoreColor = score >= 8 ? "#22c55e" : score >= 5 ? "#f59e0b" : "#ef4444";
  const scoreBg = score >= 8 ? "rgba(34,197,94,0.1)" : score >= 5 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";
  const scoreBorder = score >= 8 ? "rgba(34,197,94,0.3)" : score >= 5 ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)";

  return (
    <div style={{
      height: "460px", overflowY: "auto",
      border: "1px solid rgba(99,102,241,0.3)", borderRadius: "16px",
      background: "rgba(15,15,35,0.8)",
      padding: "20px",
      display: "flex", flexDirection: "column", gap: "16px",
      scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent"
    }}>

      {/* Score Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px", borderRadius: "12px",
        background: scoreBg, border: `1px solid ${scoreBorder}`
      }}>
        <div>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>
            CODE QUALITY SCORE
          </p>
          <p style={{ margin: "4px 0 0", color: "#fff", fontSize: "18px", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
            {score >= 8 ? "Excellent! 🏆" : score >= 5 ? "Good Work! 👍" : "Needs Work! 🔧"}
          </p>
        </div>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `conic-gradient(${scoreColor} ${score * 36}deg, rgba(255,255,255,0.05) 0deg)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative"
        }}>
          <div style={{
            position: "absolute", inset: 6, borderRadius: "50%",
            background: "rgba(8,8,20,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: scoreColor, fontWeight: 800, fontSize: "18px", fontFamily: "'Syne', sans-serif" }}>
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Section title="📋 Summary" color="#a5b4fc" bgColor="rgba(99,102,241,0.08)" borderColor="rgba(99,102,241,0.2)">
        <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          {review.summary}
        </p>
      </Section>

      {/* Bugs */}
      {review.bugs?.length > 0 && (
        <Section title="🐛 Bugs Found" color="#f87171" bgColor="rgba(239,68,68,0.08)" borderColor="rgba(239,68,68,0.2)">
          {review.bugs.map((bug, i) => (
            <ListItem key={i} text={bug} color="#f87171" />
          ))}
        </Section>
      )}

      {/* Improvements */}
      {review.improvements?.length > 0 && (
        <Section title="💡 Improvements" color="#fbbf24" bgColor="rgba(245,158,11,0.08)" borderColor="rgba(245,158,11,0.2)">
          {review.improvements.map((item, i) => (
            <ListItem key={i} text={item} color="#fbbf24" />
          ))}
        </Section>
      )}

      {/* Best Practices */}
      {review.bestPractices?.length > 0 && (
        <Section title="✅ Best Practices" color="#34d399" bgColor="rgba(52,211,153,0.08)" borderColor="rgba(52,211,153,0.2)">
          {review.bestPractices.map((item, i) => (
            <ListItem key={i} text={item} color="#34d399" />
          ))}
        </Section>
      )}

      {/* Optimized Code */}
      {review.optimizedCode && (
        <Section title="⚡ Optimized Code" color="#818cf8" bgColor="rgba(99,102,241,0.08)" borderColor="rgba(99,102,241,0.2)">
          <pre style={{
            margin: 0, padding: "12px", borderRadius: "8px",
            background: "rgba(0,0,0,0.4)",
            color: "#e2e8f0", fontSize: "12px",
            fontFamily: "'DM Mono', monospace",
            overflowX: "auto", whiteSpace: "pre-wrap", lineHeight: 1.7
          }}>
            {review.optimizedCode}
          </pre>
        </Section>
      )}
    </div>
  );
}

function Section({ title, color, bgColor, borderColor, children }) {
  return (
    <div style={{
      padding: "14px", borderRadius: "12px",
      background: bgColor, border: `1px solid ${borderColor}`
    }}>
      <p style={{
        margin: "0 0 10px", fontWeight: 700, fontSize: "13px",
        color, fontFamily: "'Syne', sans-serif", letterSpacing: "0.5px"
      }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function ListItem({ text, color }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
      <span style={{ color, fontSize: "12px", marginTop: 2, flexShrink: 0 }}>▸</span>
      <p style={{
        margin: 0, color: "rgba(255,255,255,0.7)",
        fontSize: "13px", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif"
      }}>
        {text}
      </p>
    </div>
  );
}