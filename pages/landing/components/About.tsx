"use client";
import { Axa, Dietl, Gurrjohns, Momart } from "@/assets/images";
import Image from "next/image";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const aboutList = [
  {
    img: <Image src={Gurrjohns} alt="Gurrjohns" className=" w-[160px]" />,
    title: "Expert Authentication",
    description:
      "We collaborates with renowned appraisers from GurrJohns (or other established appraisal firms) to meticulously verify artwork authenticity, condition, and provenance, with its proof of appraisal embedded directly within each token",
  },
  {
    img: <Image src={Axa} alt="Axa" className=" w-[40px]" />,
    title: "Comprehensive Insurance",
    description:
      "We partner with a leading art insurance company to provide tailored coverage against theft, damage, and loss during transportation, storage, and loans.",
  },
  {
    img: (
      <div className="flex gap-8">
        <Image src={Momart} alt="Momart" className=" w-[40px]" />
        <Image src={Dietl} alt="Dietl" className=" w-[40px]" />
      </div>
    ),
    title: "Secure Transportation and Storage",
    description:
      "We partner with trusted companies like Momart and DIETL International, to ensure secure transportation of the artwork from your location to our state-of-the-art storage facility equipped with advanced security systems and climate control to guarantee its preservation.",
  },
];

const About = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about-section",
      scroller: "body",
      start: "top center",
      end: "bottom center",
    },
  });
  useGSAP(() => {
    tl.from("#about-section h2", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "sine",
    });
    tl.from(
      "#about-content",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
      },
      "-=0.4"
    );
  });

  return (
    <section
      id="about-section"
      className="w-[90vw] mx-auto sm:w-[85vw] flex flex-col gap-16 "
    >
      <h2 className="text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] max-w-[800px]">
        Your investments are <span className="italic font-medium">secured</span>{" "}
        with us
      </h2>

      <div className="flex flex-wrap justify-between gap-12">
        {aboutList.map((item, index) => {
          return (
            <div
              id="about-content"
              key={index}
              className="flex flex-col gap-4 max-w-[360px] "
            >
              {item.img}
              <div className="flex flex-col gap-1">
                <h3 className="text-[20px] textmd:text-[24px] font-semibold leading-[31.44px]">
                  {item.title}
                </h3>
                <p className="text-[16px] md:text-[20px] leading-[20.4px] md:leading-[26.2px] text-black/60">
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

export default About;
