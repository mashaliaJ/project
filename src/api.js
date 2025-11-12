import axios from "axios";

// Backend URL
export const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});
