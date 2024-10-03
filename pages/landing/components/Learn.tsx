"use client";
import { useGSAP } from "@gsap/react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.from(videoRef.current, {
      currentTime: videoRef?.current?.duration || 1,
      ease: "sine.in",
      scrollTrigger: {
        trigger: "#video-section",
        scroller: "body",
        start: "top bottom",
        end: "bottom top",
        scrub: 3,
        markers: true,
      },
    });
  });
  return (
    <section
      id="video-section"
      className="w-[90vw] mx-auto sm:w-[85vw] flex flex-col md:flex-row gap-12  md:gap-64 h-screen"
    >
      <video ref={videoRef} src="/steps.mp4" muted className="max-w-[720px]" />
      <div className="flex flex-col gap-8">
        {Steps.map((item, index) => {
          return (
            <div key={index} className="flex gap-4 max-w-[800px] ">
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
    </section>
  );
};

export default Learn;
