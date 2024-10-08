import React, { ForwardedRef } from "react";

const Hero = React.forwardRef<HTMLElement>(
  (props, ref: ForwardedRef<HTMLElement>) => {
    return (
      <section
        ref={ref}
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

Hero.displayName = "Hero";

export default Hero;
