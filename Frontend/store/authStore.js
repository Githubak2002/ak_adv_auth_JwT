import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// const backend_base_url = import.meta.env.VITE_BACKEND_URL ||  "http://localhost:8080/api/auth";
const backend_base_url = import.meta.env.MODE === "development" ? "http://localhost:8080/api/auth" : "/api/auth";

// axios setting the headers for cookies
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isUserVerified: false,
  isCheckingAuth: true,
  
  isLoading: false,
  error: null,

  popup: false,
  forgotPassPopup: false,
  deleteAccPopup: false,

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
      toast.success("User created successfully!"); 
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.msg || "Error Signing up",
      });
      toast.error(error.response?.data?.msg || "Error Signing up"); 
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
      set({ user: res.data.user, isAuthenticated: true, isLoading: false,  isUserVerified: res.data.user.isVerified });

    } catch (err) {
      set({
        isLoading: false,
        error: err.response?.data?.msg || "Error Logging in",
      });
      toast.error(err.response?.data?.msg || "Error Logging in");
      throw err;
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
        isUserVerified: res.data.user.isVerified
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
        set({ popup: false, isLoading: false, isUserVerified:true });
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

  // ==== delete user account ====
  deleteAccount: async() => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.delete(`${backend_base_url}/delete-account`);
      if (res.data.success) {
        set({ isLoading: false, user:null, popup: false, isUserVerified: false, isAuthenticated:false  });
        toast.success(res.data.msg || "Account deleted");
      }
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.msg || "Error in Deleteing user" });
      console.error("Delete user error:", error);
    }
  },

  // ==== forget password  ====
  forgetPassword: async(email) => {
    set({ isLoading: true, error: null, forgotPassPopup:true });
    try {
      const res = await axios.post(`${backend_base_url}/forget-password`,{email});
      if (res.data.success) {
        set({ isLoading: false, forgotPassPopup:false });
        toast.success(res.data.msg || "Password reset link sent to your email");
      }
      else{
        set({ isLoading: false, error: res.data.msg || "Error in sending password reset link" });
        toast.error(res.data.msg || "Error in sending password reset link");
      }
    } catch (error) {
      set({ isLoading: false, forgotPassPopup:false, error: error.response?.data?.msg || "Error in Sending Email" });
      // console.error("Forget password error:", error);
      toast.error(error.response?.data?.msg || "Error in sending password reset link");
      throw error
    }
  },



}));
