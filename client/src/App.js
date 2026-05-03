import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15,15,35,0.95)",
            color: "#a5b4fc",
            border: "1px solid rgba(99,102,241,0.3)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px"
          }
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;