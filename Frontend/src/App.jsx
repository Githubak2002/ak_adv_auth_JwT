import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/NavBar";
import ResetPass from "./Pages/ResetPass"

import { Toaster } from 'react-hot-toast';
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import { useAuthStore } from "../store/authStore";
import { Children, useEffect } from "react";

function App() {

  const {user, checkAuth, error} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth])
  
  // console.log("error → ",error);
  // console.log("user → ",user);

  // === if user is login ===
  const RedirectToHome = ({children}) => {
    const {isAuthenticated} = useAuthStore();
    if(isAuthenticated)
      return <Navigate to='/' replace />
    return children;
  }

  const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuthStore();
    if(!isAuthenticated)
      return <Navigate to='/login' replace />
    return children;
  }

  return (
    <section className="mx-auto max-w-[1440px]">

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={
            <RedirectToHome>
              <Signup />
            </RedirectToHome>
            } />
          <Route path="/login" element={
            <RedirectToHome>
              <Login />
            </RedirectToHome>
            } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute> 
            } />

          <Route path="/reset-password" element={<ResetPass />} />

          
        </Routes>
        <Footer />
      </Router>
    
      <Toaster />
    </section>
  )
}

export default App
