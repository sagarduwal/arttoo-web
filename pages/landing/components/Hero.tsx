import { MouseScroll } from '@/assets/images';
import ScrollTo from '@/utils/scrollTo';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const bannerRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!bannerRef.current) return;
      if (document.visibilityState === 'visible') {
        bannerRef.current.play();
      } else {
        bannerRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  return (
    <section className=' flex flex-col w-screen h-screen sticky top-0 video'>
      <div className='relative w-full h-full'>
        <video playsInline autoPlay muted loop className='h-full w-full object-cover' ref={bannerRef}>
          <source src='/hero.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <button
          className='sm:block hidden absolute animate-bounce bottom-10 left-1/2 transform -translate-x-1/2'
          onClick={() => ScrollTo('artworks')}
        >
          <Image src={MouseScroll} alt='mouse' />
        </button>
      </div>
    </section>
  );
};

export default Hero;
