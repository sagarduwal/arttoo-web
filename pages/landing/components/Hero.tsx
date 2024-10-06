import React, { ForwardedRef, RefObject } from "react";
import Header from "./Header";

const Hero = React.forwardRef<HTMLElement, {}>(
  (props, ref: ForwardedRef<HTMLElement>) => {
    return (
      <section
        ref={ref}
        id="hero"
        className=" flex flex-col w-screen h-screen scroll-panel video"
      >
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </section>
    );
  }
);

export default Hero;
