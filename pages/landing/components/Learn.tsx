"use client";
import ScrollFadeContent from "@/components/ScrollFadeContent";
import VideoPlayAnimation from "@/components/VideoPlayAnimation";
import { useScroll } from "framer-motion";
import { useRef } from "react";

// Example usage
const Steps = [
  {
    title: "Explore",
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's. ",
  },
  {
    title: "Invest",
    description:
      "Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.",
  },
  {
    title: "Earn",
    description:
      "Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more..",
  },
];
export default function Learn() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex justify-between flex-col md:flex-row"
    >
      <VideoPlayAnimation progress={scrollYProgress} />
      <ScrollFadeContent progress={scrollYProgress} items={Steps} />
    </section>
  );
}
