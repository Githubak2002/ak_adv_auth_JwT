import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

import toast from 'react-hot-toast';

const Signup = () => {

  const { signup, isLoading, user } = useAuthStore();
  // const [ user,setUser ] = useState(null);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email,password,name);
      toast.success("Sign Up successfull!");
      navigate("/profile");
      // const updatedUser = useAuthStore.getState().user;  // immediate access to the store
      // console.log("user → ",updatedUser);
    } catch (err) {
      // toast.error(error);
      // console.log("error → ",err);
    }
  };

  return (
    <section className="flexCenter px-4 min-h-[74vh]">
    <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[5vh] rounded-xl font-bold text-sm ">
      <form onSubmit={handleSignUp}>
        <h3 className="text-center text-2xl pb-5 font-semibold  gradient-text2">Sign up</h3>

        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            className="border p-2 rounded-lg h-9 bg-slate-100 focus:bg-transparent"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-y-3 mt-4 h-9">
          <input
            type="email"
            className="border p-2 rounded-lg h-9 bg-slate-100 focus:bg-transparent"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-y-3 mt-4">
          <input
            type="password"
            className="border p-2 rounded-lg h-9 bg-slate-100 focus:bg-transparent"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* {error && <p className='mt-3 text-red-500'>{error}</p>} */}

        <button
          type="submit"
          className={`border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="text-center text-sm mt-5">
          Already registered?{" "}
          <span onClick={() => navigate('/login')} className="text-blue-500 hover:cursor-pointer">
            Login
          </span>
        </p>

        {/* <SignInwithGoogle /> */}
      </form>
    </main>
  </section>
  )
}

export default Signup




// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth, db } from "../services/firebase.js";
// import { setDoc, doc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import SignInwithGoogle from "../components/SignInwithGoogle.jsx";

// function SignUp() {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [loading, setLoading] = useState(false); // Added loading state
//   const quotes = [];

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           Name: name,
//           favQuotes: quotes,
//           photo: "",
//         });
  
//         toast.success("User Registered Successfully!!", { position: "bottom-center", className: "text-xs" });
//         navigate("/profile");
//       }
//     } catch (error) {
//       // console.error("Error in handleSignUp:", error);
  
//       if (error.code === "auth/email-already-in-use") {
//         toast.error("Email already exists. Please use a different email.", { position: "bottom-center", className: "text-xs" });
//       } else if (error.code === "auth/weak-password") {
//         toast.error("Password should be at least 6 characters ", { position: "bottom-center", className: "text-xs" });
//       } else {
//         toast.error(error.message, { position: "bottom-center", className: "text-xs" });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="mx-auto px-4 flexCenter">
//       <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[5vh] rounded-xl font-bold text-sm">
//         <form onSubmit={handleSignUp}>
//           <h3 className="text-center text-2xl pb-5 font-semibold text-blue-400">Sign up</h3>

//           <div className="flex flex-col gap-y-3">
//             <input
//               type="text"
//               className="border p-2 rounded-lg h-9"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-y-3 mt-4 h-9">
//             <input
//               type="email"
//               className="border-[0.1px] p-2 rounded-lg"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-y-3 mt-4">
//             <input
//               type="password"
//               className="border p-2 rounded-lg"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className={`border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={loading}
//           >
//             {loading ? 'Signing Up...' : 'Sign Up'}
//           </button>

//           <p className="text-center text-sm mt-5">
//             Already registered?{" "}
//             <span onClick={() => navigate('/login')} className="text-blue-500 hover:cursor-pointer">
//               Login
//             </span>
//           </p>

//           <SignInwithGoogle />
//         </form>
//       </main>
//     </section>
//   );
// }

// export default SignUp;