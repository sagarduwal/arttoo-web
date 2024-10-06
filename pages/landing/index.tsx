"use client";

import { useRef } from "react";
import About from "./components/About";
import Artworks from "./components/Artworks";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Learn from "./components/Learn";
import { useScroll } from "framer-motion";
import Header from "./components/Header";

const LandingPage = () => {
  const main = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#artworks",
  //       scroller: "body",
  //       start: "top bottom",
  //       end: "bottom bottom",
  //       scrub: 1,
  //     },
  //   });

  //   tl.to("header", {
  //     color: "black",
  //   });
  //   tl.to(
  //     "#nav-container div a",
  //     {
  //       color: "black",
  //     },
  //     "-=0.5"
  //   );
  //   tl.to("#nav-container img", {
  //     filter: "invert(100%)",
  //   });
  // });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  return (
    <main ref={main} className="flex flex-col overflow-x-hidden ">
      <Header progress={heroScrollProgress} />
      <Hero ref={heroRef} />
      <Artworks />
      <Learn />
      <About />
      <Footer />
    </main>
  );
};

export default LandingPage;