import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// const backend_base_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/auth";
const backend_base_url = import.meta.env.MODE === "development" ? "http://localhost:8080/api/auth" : "/api/auth";


const ResetPass = () => {
  const { token } = useParams(); 
  // console.log("params - ", token);

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Try again!")
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${backend_base_url}/reset-password/${token}`, { password }); 
      if (res.data.success) {
        setError(null);
        toast.success("Password reset successfully! Please login.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Some error occurred. Try again!");
      setError(error);
    }
    // console.log("Password reset submitted:", password);
    // Reset error message if needed
  };

  return (
    <section className="flexCenter h-[74vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* <div className="flex flex-col gap-y-3 mt-4"> */}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // className="border p-2 rounded-lg h-9 bg-slate-100 focus:bg-transparent"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {/* </div> */}


        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Reset Password
        </button>
      </form>
    </section>
  );
};

export default ResetPass;
