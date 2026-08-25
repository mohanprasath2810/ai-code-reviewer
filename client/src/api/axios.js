import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const API = axios.create({
  baseURL: isLocal
    ? "http://localhost:5000/api"   // local development
    : "https://ai-code-reviewer-t1jj.onrender.com/api" // production
});

export default API;
