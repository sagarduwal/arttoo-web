"use client";
import React, { useRef } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Learn from "./components/Learn";
import Artworks from "./components/Artworks";

const LandingPage = () => {
  const main = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={main}
      className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-64 overflow-x-hidden"
    >
      <Hero />
      <Artworks />
      <Learn />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
