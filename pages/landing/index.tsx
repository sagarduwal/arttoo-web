"use client";

import React, { useRef, useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Learn from "./components/Learn";
import Artworks from "./components/Artworks";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "./components/Header";
import { ArttooLogoBlack } from "@/assets/images";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LandingPage = () => {
  const main = useRef<HTMLElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const snapTriggers = useRef<ScrollTrigger[]>([]);
  const { contextSafe } = useGSAP(
    () => {
      let panels = gsap.utils.toArray<Element>(".scroll-panel");
      let scrollStarts: number[] = [0];
      let snapScroll: (value: number, direction?: number) => number = (value) =>
        value;

      panels.forEach((panel, i) => {
        snapTriggers.current[i] = ScrollTrigger.create({
          trigger: panel,
          start: "top top",
        });
      });

      ScrollTrigger.addEventListener("refresh", () => {
        scrollStarts = snapTriggers.current.map(
          (trigger) => trigger.start as number
        );
        snapScroll = ScrollTrigger.snapDirectional(scrollStarts) as (
          value: number,
          direction?: number
        ) => number;
      });

      ScrollTrigger.observe({
        type: "wheel,touch",
        onChangeY(self) {
          if (!scrollTween.current) {
            let scroll = snapScroll(
              self.scrollY() + self.deltaY,
              self.deltaY > 0 ? 1 : -1
            );
            goToSection(scrollStarts.indexOf(scroll));
          }
        },
      });

      ScrollTrigger.refresh();
    },
    {
      dependencies: [],
      scope: main,
      revertOnUpdate: true,
    }
  );

  const goToSection = contextSafe((i: number) => {
    console.log("scroll to", i);
    if (snapTriggers.current[i]) {
      scrollTween.current = gsap.to(window, {
        duration: 1,
        scrollTo: snapTriggers.current[i].start,
        onComplete: () => (scrollTween.current = null),
        overwrite: true,
      });
    }
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        scroller: "body",
        start: "top top",
        scrub: 1,
        markers: true,
      },
    });

    tl.to("header", {
      color: "black",
    });
    tl.to(
      "#nav-container div a",
      {
        color: "black",
      },
      "-=0.5"
    );
    tl.to("#nav-container img", {
      filter: "invert(100%)",
    });
  });

  return (
    <main ref={main} className="flex flex-col overflow-x-hidden ">
      <Header />
      <Hero />
      <Artworks />
      <Learn />
      <About />
      <Footer />
    </main>
  );
};

export default LandingPage;
