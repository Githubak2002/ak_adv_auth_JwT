import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

import toast from 'react-hot-toast';
import EnterEmailPoupup from '../Components/EnterEmailPopup';

const Login = () => {

  const { login, error, isLoading, user, forgotPassPopup } = useAuthStore();
  // const [ user,setUser ] = useState(null);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await login(email,password);
      toast.success("Login successfull!");
      navigate("/profile");
      // const updatedUser = useAuthStore.getState().user;  // immediate access to the store
      // console.log("user → ",updatedUser);
    } catch (error) {
      // console.log("error → ",error);
    }
  };


  const hlp = () => {
    // toast.success("text");
    useAuthStore.setState({ forgotPassPopup: true });
  }

  return (
    <section className="flexCenter px-4 min-h-[74vh]">
    <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[5vh] rounded-xl font-bold text-sm">
      <form onSubmit={handleSignUp}>
        <h3 className="text-center text-2xl pb-5 font-semibold gradient-text2">Login</h3>

        <div className="flex flex-col gap-y-3 mt-4">
          <input
            type="email"
            className="border p-2 rounded-lg h-9 bg-slate-50 focus:bg-transparent"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-y-3 mt-4">
          <input
            type="password"
            className="border p-2 rounded-lg h-9 bg-slate-50 focus:bg-transparent"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* {error && <p className='mt-4 text-red-500'>{error}</p>} */}

        <button
          type="submit"
          className={`border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'LogIn'}
        </button>


        <h2 className="text-sm mt-5">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </h2>

      </form>

      <button
          className="text-xs mt-5 text-slate-500 cursor-pointer"
          onClick={hlp}
          // onClick={() => navigate("/reset-password")}
      >
        Forget Password
      </button>
      

      { forgotPassPopup && <EnterEmailPoupup /> }

        {/* <SignInwithGoogle /> */}
    </main>
  </section>
  )
}

export default Login;
