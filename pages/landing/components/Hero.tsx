import React from "react";
import Header from "./Header";

const Hero = () => {
  return (
    <div className=" flex flex-col w-screen h-screen panel n">
      <Header />
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default Hero;
