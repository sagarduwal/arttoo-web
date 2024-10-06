"use client";
import { ArtworkImage } from "@/assets/images";
import FadeInUpwardAnimation from "@/components/FadeInUpwardAnimation";
import Image from "next/image";

const Artworks = () => {
  return (
    <section
      id="artworks"
      className="w-[90vw] mx-auto sm:w-[85vw] overflow-clip  gap-16 scroll-panel light h-screen"
    >
      <div className="flex justify-between flex-col md:flex-row gap-4 mt-60">
        <FadeInUpwardAnimation>
          <h1 className="text-[50px] sm:text-[75px] text-balance md:text-[100px] leading-[65px] sm:leading-[100px] md:leading-[131px] max-w-1/3">
            Art Is The Visual{" "}
            <span className="italic font-medium">Proof Of History</span> For
            Humanity
          </h1>
        </FadeInUpwardAnimation>
        <FadeInUpwardAnimation delay={0.3}>
          <p className="t text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px] md:mt-60 max-w-[700px] w-full">
            Arttoo is about unlocking a world of possibilities.Become part of a
            vibrant art community, connect with a timeless piece of culture, and
            watch your investment grow alongside your passion, with a
            hassle-free mindset for provenance tracking. All transactions are
            secure, transparent, and regulated through the beauty of blockchain
            technologies.
          </p>
        </FadeInUpwardAnimation>
      </div>
      <Image src={ArtworkImage} alt="artwork" className="max-h-[600px]" />
    </section>
  );
};

export default Artworks;
