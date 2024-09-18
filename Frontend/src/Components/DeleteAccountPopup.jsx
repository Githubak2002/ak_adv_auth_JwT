import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const DeleteAccountPopup = () => {

  const {deleteAcount, isLoading} = useAuthStore()
  const navigete = useNavigate();


  const sendRequestHandler = async (e) => {
    e.preventDefault();
    deleteAcount();
    useAuthStore.setState({ deleteAccPopup: false });
    navigete('/');
  };


  return (
    <section className="">
      <main className="fixed inset-0 flexCenter bg-black bg-opacity-50 backdrop-blur-sm px-4">
        <form
          onSubmit={sendRequestHandler}
          className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded-lg shadow-lg"
        >
          <h2 className="sm:text-2xl text-xl mb-4 leading-9 py-4">
            Are you sure you want to delete your account?
          </h2>

          <div className="flexCenter">
            <button
              type="submit"
              className={`text-white py-2 px-4 mb-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? "bg-blue-300" : "bg-blue-500"} ` }
              disabled={isLoading} 
            >
              { isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>

        </form>
      </main>
    </section>
  );
};

export default DeleteAccountPopup;
