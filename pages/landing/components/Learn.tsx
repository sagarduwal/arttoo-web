import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import throttle from 'lodash.throttle';
// import platform from 'platform';

const Steps = [
  {
    title: 'Explore',
    progress: { min: 0, max: 0.33 },
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's.",
  },
  {
    title: 'Invest',
    progress: { min: 0.33, max: 0.66 },
    description:
      'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
  },
  {
    title: 'Earn',
    progress: { min: 0.66, max: 1 },
    description:
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more.',
  },
];

// const videoSrc = '/steps-43.mp4';
const videoSrc = 'section3-highres.mp4';

const Learn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleScroll = useCallback(
    throttle(() => {
      const video = videoRef.current;
      const container = containerRef.current;

      if (!video || !container) return;

      const { top, height } = container.getBoundingClientRect();
      const percentScrolled = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));

      if (video.duration) {
        video.currentTime = video.duration * percentScrolled;
      }

      const newStep = Steps.findIndex(
        (step) => percentScrolled >= step.progress.min && percentScrolled < step.progress.max
      );

      if (newStep !== -1 && newStep !== currentStep) {
        setCurrentStep(newStep);
      }
    }, 100),
    [currentStep]
  );

  useEffect(() => {
    const handleScrollListener = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScrollListener);
    return () => window.removeEventListener('scroll', handleScrollListener);
  }, [handleScroll]);
  // const isIOS = platform.os?.family === 'iOS';
  return (
    <section ref={containerRef} className='relative h-[300vh]'>
      <div className='sticky top-0 h-screen flex items-center justify-center'>
        <div className='h-[80svh] w-[90vw] sm:w-[85vw] mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-start justify-between md:items-center'>
          <div className='w-full md:w-1/2 aspect-square order-2 md:order-1'>
            <video
              ref={videoRef}
              className='w-full h-full object-cover relative z-10'
              autoPlay
              playsInline
              muted
              preload='auto'
            >
              <source src={videoSrc} type='video/mp4' />
              <p>Your browser does not support the HTML5 Video element.</p>
            </video>
          </div>
          <div className='flex flex-col w-full md:w-1/2 md:pl-8 order-1 md:order-2 pt-10 md:pt-0'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 360 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className='flex gap-4 items-start justify-start pt-16'
              >
                <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${
                  currentStep + 1
                }`}</span>
                <div className='flex flex-col gap-2'>
                  <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
                    {Steps[currentStep].title}
                  </h4>
                  <p className=' text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]'>
                    {Steps[currentStep].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learn;
