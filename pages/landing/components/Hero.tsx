import React, { ForwardedRef } from 'react';

const Hero = React.forwardRef<HTMLElement>((props, ref: ForwardedRef<HTMLElement>) => {
  return (
    <section ref={ref} className=' flex flex-col w-screen h-screen scroll-panel video'>
      <video playsInline autoPlay muted loop className='h-full w-full object-cover'>
        <source src='/hero.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
