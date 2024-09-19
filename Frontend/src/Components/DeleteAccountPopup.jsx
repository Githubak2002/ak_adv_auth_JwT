import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const DeleteAccountPopup = () => {
  const { deleteAccount, isLoading } = useAuthStore(); // Ensure the function is correctly named
  const navigate = useNavigate(); 

  const deleteAccountHandler = async (e) => {
    e.preventDefault();
    await deleteAccount(); 
    useAuthStore.setState({ deleteAccPopup: false });
    navigate('/'); 
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    useAuthStore.setState({ deleteAccPopup: false });
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <main className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="sm:text-2xl text-xl mb-4 leading-9 py-4">
          Are you sure you want to delete your account?
        </h2>

        <div className="flexCenter gap-x-5">
          <button
            onClick={deleteAccountHandler}
            className={`text-white py-2 px-4 mb-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? "bg-blue-300" : "bg-blue-500"}`}
            disabled={isLoading} 
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>

          <button
            onClick={cancelHandler}
            className="py-2 px-4 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-500"
          >
            Cancel
          </button>
        </div>
      </main>
    </section>
  );
};

export default DeleteAccountPopup;
