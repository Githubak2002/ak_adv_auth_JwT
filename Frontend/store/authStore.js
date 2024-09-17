import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const backend_base_url = "http://localhost:8080/api/auth";

// axios setting the headers for cookies
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  // isLoading:true,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  popup: false,
  // popup: true,

  // ==== signup ====
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${backend_base_url}/signup`, {
        email,
        password,
        name,
      });
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.msg || "Error Signing up",
      });
      throw error;
    }
  },

  // ==== login ====
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${backend_base_url}/login`, {
        email,
        password,
      });
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.msg || "Error Logging in",
      });
      throw error;
    }
  },

  // ==== logOut ====
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${backend_base_url}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "Error in LogOut" });
      throw error;
    }
  },

  // ==== check auth ====
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${backend_base_url}/check-auth`);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // ==== send verify email ====
  verifyEmail: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${backend_base_url}/verify-email`, { email,});
      if (res.data.success) {
        toast.success("Check email");
        set({ popup: true, isLoading: false });
      } 
      else set({ isLoading: false, error: res.data.msg || "Verification failed", });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.msg || "Error in Verify Email",
      });
      console.error("Verification error:", error);
      throw error;
    }
  },

  // ==== verify verification code ====
  verificationCode: async(code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${backend_base_url}/verify-email-verification-code`, { code });
      if (res.data.success) {
        set({ popup: false, isLoading: false, });
        toast.success(res.data.msg || "Email verified!")
      }      
      else {
        set({ isLoading: false, error: res.data.msg || "Verification failed", popup: false });
        toast.error(res.data.msg || "Verification failed");
      }
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.msg || "Error in Verification Code", popup:false });
      toast.error("Invalid Code");
      throw error;
    }
  },


}));
