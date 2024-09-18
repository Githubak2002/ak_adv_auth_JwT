import React from "react";

import { Navigate, useNavigate } from "react-router-dom";

import BlurFade from "../Components/magicui/BlurFade";
import { BorderBeam } from "../Components/magicui/BorderBeam";

const features = [
  {
    title: "Secure Authentication",
    description:
      "Ensure user privacy with secure authentication methods using JWTs to manage user sessions.",
  },
  {
    title: "Easy Integration",
    description:
      "Seamlessly integrate with your existing systems using our MERN stack setup and APIs.",
  },
  {
    title: "Responsive Design",
    description:
      "Enjoy a responsive user interface that works on any device, ensuring a smooth user experience.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="flexCenter min-h-[77vh] flex-col">
      {/* Home PAge */}
      <header className="home-gradient text-white flexCenter flex-col h-screen text-center p-6 gap-y-6 w-full">
        <BlurFade delay={0.25} inView>
          <h1 className="text-4xl md:text-5xl font-bold pb-5 logo">
            Welcome to MyApp
          </h1>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
          <p className="text-lg md:text-xl mb-6 leading-9 sm:leading-10 text-center max-w-[470px] gradient-text3">
            Secure authentication and seamless authorization with the MERN stack
            and JWT.
          </p>
        </BlurFade>
        <BlurFade delay={0.25 * 4} inView>
          <button
            onClick={() => navigate("/signup")}
            className="bg-transparent border-white border-2 px-6 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-110 gradient-text2"
          >
            Get Started
          </button>
        </BlurFade>
      </header>

      <section className="py-16 px-4 bg-[#fff]">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-medium text-center mb-12 ">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-16">

            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 rounded-lg feature-shadow"
              >
                <BorderBeam />
                <h3 className="text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* <div className="relative h-[200px] w-[200px] rounded-xl">
      <BorderBeam />
      </div> */}
    </section>
  );
};

export default Home;
