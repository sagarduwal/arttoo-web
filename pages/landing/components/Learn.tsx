"use client";
import VideoPlayAnimation from "@/components/VideoPlayAnimation";
import { useGSAP } from "@gsap/react";
import { useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

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

const Learn = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftRef.current,
    });
  });
  return (
    <section
      ref={containerRef}
      className="w-[90vw] mx-auto sm:w-[85vw] min-h-screen "
    >
      <div className="flex">
        <div className="h-screen w-1/2" ref={leftRef}>
          <VideoPlayAnimation progress={scrollYProgress} />
        </div>
        <div className="w-1/2 flex flex-col gap-8 justify-center">
          {Steps.map((item, index) => {
            return (
              <div
                key={index}
                className="flex gap-4 max-w-[800px] h-screen items-center justify-center"
              >
                <span className="text-black/30 text-[40px] italic leading-[52.4px] mt-4">{`0${
                  index + 1
                }`}</span>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium">
                    {item.title}
                  </h4>
                  <p className=" text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Learn;
