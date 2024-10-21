'use client';
import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';
import { useEffect, useRef } from 'react';

const Artworks = () => {
  const artworkRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!artworkRef.current) return;
      if (document.visibilityState === 'visible') {
        artworkRef.current.play();
      } else {
        artworkRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  return (
    <section id='artworks' className='relative h-[100svh] md:h-[80vh] xl:h-[100vh]'>
      <div className='flex justify-between flex-col lg:flex-row gap-4 pt-20 md:pt-24 lg:pt-32 max-w-screen-2xl w-[90vw] sm:w-[85vw] mx-auto'>
        <FadeInUpwardAnimation>
          <h1 className='text-[50px] md:text-[60px] lg:text-[80px] xl:text-[90px] leading-[65px] sm:leading-[80px] lg:leading-[120px] xl:leading-[131px]  text-balance  tracking-tight'>
            Art Is The Visual <span className='italic font-medium'>Proof Of History</span> For Humanity
          </h1>
        </FadeInUpwardAnimation>
        <FadeInUpwardAnimation delay={0.3}>
          <p className='text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px] lg:pt-40 max-w-[820px] w-full'>
            Arttoo is about unlocking a world of possibilities.Become part of a vibrant art community, connect with a
            timeless piece of culture, and watch your investment grow alongside your passion, with a hassle-free mindset
            for provenance tracking. All transactions are secure, transparent, and regulated through the beauty of
            blockchain technologies.
          </p>
        </FadeInUpwardAnimation>
      </div>
      <video ref={artworkRef} playsInline autoPlay muted loop className='w-full h-[60svh] object-cover xl:-mt-[160px]'>
        <source src='/section2-highres.webm' type='video/webm' />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Artworks;
