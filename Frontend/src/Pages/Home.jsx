import React from "react";

import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <section className="flexCenter min-h-[77vh] flex-col">
      {/* Home PAge */}
      <header className="home-gradient text-white flexCenter flex-col h-screen text-center p-6 gap-y-6 w-full">
        <h1 className="text-4xl md:text-5xl font-bold pb-5 logo">Welcome to MyApp</h1>
        <p className="text-lg md:text-xl mb-6 leading-9 sm:leading-10 text-center max-w-[470px] gradient-text3">
          Secure authentication and seamless authorization with the MERN stack and JWT.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-transparent border-white border-2 px-6 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-110 gradient-text2"
        >
          Get Started
        </button>
       
      </header>

      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Secure Authentication</h3>
              <p>
                Ensure user privacy with secure authentication methods using
                JWTs to manage user sessions.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Easy Integration</h3>
              <p>
                Seamlessly integrate with your existing systems using our MERN
                stack setup and APIs.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
              <p>
                Enjoy a responsive user interface that works on any device,
                ensuring a smooth user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

   
    </section>
  );
};

export default Home;
