import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const backend_base_url =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const EnterEmailPoupup = () => {

  const [email, setEmail] = useState(null);
  const {forgetPassword, isLoading} = useAuthStore()

  const sendRequestHandler = async (e) => {
    e.preventDefault();
    forgetPassword(email);
    // useAuthStore.setState({ forgotPassPopup : false} );
    // console.log("btn clicked! Email is - ",email);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    useAuthStore.setState({ forgotPassPopup: false });
  };


  return (
    <section className="">
      <main className="fixed inset-0 flexCenter bg-black bg-opacity-50 backdrop-blur-sm px-4">
        <form
          onSubmit={sendRequestHandler}
          className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded-lg shadow-lg"
        >
          <h2 className="sm:text-2xl text-xl font-semibold mb-4">
            Enter your Email
          </h2>
          <input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
          />
          <div className="flexCenter gap-x-5">
            <button
              type="submit"
              className={`text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? "bg-blue-300" : "bg-blue-500"} ` }
              disabled={isLoading} 
            >
              { isLoading ? "Sending Email..." : "Submit"}
              {/* Reset Password Email */}
            </button>

            <button
            onClick={cancelHandler}
            className="py-2 px-4 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-500"
          >
            Cancel
          </button>

          </div>

        </form>
      </main>
    </section>
  );
};

export default EnterEmailPoupup;
