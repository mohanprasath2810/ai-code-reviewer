import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language }) {
  return (
    <div style={{ height: "450px", border: "1px solid #374151", borderRadius: "8px", overflow: "hidden" }}>
      <Editor
        height="450px"
        language={language}
        value={code}
        onChange={(val) => setCode(val || "")}
        theme="vs-dark"
        options={{ 
          fontSize: 14, 
          minimap: { enabled: false }, 
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
}