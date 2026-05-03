import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language }) {
  return (
    <div style={{
      borderRadius: "16px", overflow: "hidden",
      border: "1px solid rgba(99,102,241,0.3)",
      boxShadow: "0 0 40px rgba(99,102,241,0.1)",
      height: "460px"
    }}>
      {/* Editor Header */}
      <div style={{
        background: "rgba(15,15,35,0.95)",
        padding: "10px 16px",
        display: "flex", alignItems: "center", gap: "8px",
        borderBottom: "1px solid rgba(99,102,241,0.2)"
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <span style={{
          marginLeft: 8, fontSize: "12px", color: "rgba(165,180,252,0.6)",
          fontFamily: "'DM Mono', monospace"
        }}>
          {language}.code
        </span>
      </div>

      <Editor
        height="410px"
        language={language}
        value={code}
        onChange={(val) => setCode(val || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontFamily: "'DM Mono', monospace",
          lineHeight: 22,
          padding: { top: 16 }
        }}
      />
    </div>
  );
}