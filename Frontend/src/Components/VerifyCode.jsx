import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const backend_base_url =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const VerifyCode = () => {

  const [code, setCode] = useState('');
  const {verificationCode} = useAuthStore();


  const verifycode = async (e) => {
    e.preventDefault();
    verificationCode(code);
    // console.log("btn clicked! ",code);
  };


  return (
    <section className="">
      <main className="fixed inset-0 flexCenter bg-black bg-opacity-50 backdrop-blur-sm px-4">
        <form
          onSubmit={verifycode}
          className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded-lg shadow-lg"
        >
          <h2 className="sm:text-2xl text-xl font-semibold mb-4">
            Enter the verification code
          </h2>
          <input
            type="text"
            placeholder="Code"
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify
            </button>
          </div>

        </form>
      </main>
    </section>
  );
};

export default VerifyCode;
