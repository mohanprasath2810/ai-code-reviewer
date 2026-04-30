import axios from "axios";

const API = axios.create({ 
  baseURL: "https://ai-code-reviewer-t1jj.onrender.com/api" 
});

export default API;