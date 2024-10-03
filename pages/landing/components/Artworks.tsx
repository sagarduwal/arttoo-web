"use client";
import { ArtworkImage } from "@/assets/images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Artworks = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#animation-text",
      scroller: "body",
      start: "top center",
      end: "bottom center",
    },
  });
  useGSAP(() => {
    tl.from("#animation-text h1", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "sine",
      delay: 0.3,
    });
    tl.from(
      "#animation-text p",
      {
        y: 20,
        opacity: 0,
        ease: "sine",
        duration: 0.5,
      },
      "-=0.3"
    );
  });

  return (
    <section className="w-[90vw] mx-auto sm:w-[85vw] h-[90vh] overflow-clip  gap-16 panel">
      <div
        id="animation-text"
        className="flex justify-between flex-col md:flex-row gap-4"
      >
        <h1 className="text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px]">
          Art Is The Visual{" "}
          <span className="italic font-medium">Proof Of History</span> For
          Humanity
        </h1>
        <p className="t text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px] md:mt-60 max-w-[540px]">
          Arttoo is about unlocking a world of possibilities.Become part of a
          vibrant art community, connect with a timeless piece of culture, and
          watch your investment grow alongside your passion, with a hassle-free
          mindset for provenance tracking. All transactions are secure,
          transparent, and regulated through the beauty of blockchain
          technologies.
        </p>
      </div>
      <Image src={ArtworkImage} alt="artwork" className="max-h-[600px]" />
    </section>
  );
};

export default Artworks;
