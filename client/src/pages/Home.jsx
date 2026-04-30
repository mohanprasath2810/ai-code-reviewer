import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import API from "../api/axios";
import toast from "react-hot-toast";

const LANGUAGES = ["javascript", "python", "java", "c++", "typescript"];

export default function Home() {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return toast.error("Please enter some code!");
    setLoading(true);
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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-400">
          🤖 AI Code Reviewer
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Paste your code → Get instant AI feedback
        </p>

        {/* Language Selector */}
        <div className="flex gap-3 mb-4 justify-center flex-wrap">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition
                ${language === lang
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-600 text-gray-400 hover:border-blue-500"}`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Editor + Review Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CodeEditor code={code} setCode={setCode} language={language} />
            <button
              onClick={handleReview}
              disabled={loading}
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 
                         disabled:opacity-50 rounded-lg font-semibold text-lg transition"
            >
              {loading ? "⏳ Analyzing..." : "🔍 Review My Code"}
            </button>
          </div>
          <ReviewPanel review={review} loading={loading} />
        </div>
      </div>
    </div>
  );
}