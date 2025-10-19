import axios from "axios";
import { Platform } from "react-native";

export const API_BASE_URL = "http://192.168.1.4:5126/api"; // For IOS Device (will vary to your ipv4 address)

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);
