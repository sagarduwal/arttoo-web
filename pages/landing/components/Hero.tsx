import { MouseScroll } from "@/assets/images";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className=" flex flex-col w-screen h-screen sticky top-0 video">
      <div className="relative">
        <video
          playsInline
          autoPlay
          muted
          loop
          className="h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Image
          src={MouseScroll}
          className="absolute animate-bounce bottom-10 left-1/2 transform -translate-x-1/2"
          alt="mouse"
        />
      </div>
    </section>
  );
};

export default Hero;
