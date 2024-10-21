// import { MouseScroll } from '@/assets/images';
import ScrollTo from '@/utils/scrollTo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const bannerRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0.9]);
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
    <section className='relative h-svh w-full'>
      <div className='fixed inset-0 bg-black'>
        <video
          playsInline
          autoPlay
          muted
          loop
          className='h-full w-full object-cover'
          poster='/hero.jpg'
          ref={bannerRef}
        >
          <source src='/hero.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <motion.div className='absolute inset-0 w-full bg-black' style={{ opacity }} />
        <button
          className='border-4 border-white rounded-2xl w-[32px] h-[48px] absolute animate-bounce bottom-10 left-1/2 -ml-2 z-10 group'
          onClick={() => ScrollTo('artworks')}
        >
          <span className='absolute top-2 left-1/2 h-[10px] w-1 bg-white rounded-sm -ml-[2px] transition-all duration-300 ease-in-out group-hover:m-0 group-hover:-top-1 group-hover:-left-1 group-hover:w-[32px] group-hover:h-[48px] group-hover:rounded-2xl' />
          <span className='absolute top-2 left-1/2 transform -translate-x-1/2 h-[10px] w-1 bg-white rounded-sm transition-all duration-300 ease-in-out group-hover:bg-black' />
        </button>
      </div>
    </section>
  );
};

export default Hero;
