import React from 'react';

const Hero = () => {
  return (
    <section id='hero' className=' flex flex-col w-screen h-screen scroll-panel video'>
      <video src='/hero.mp4' autoPlay muted loop playsInline className='h-full w-full object-cover' />
    </section>
  );
};

export default Hero;
