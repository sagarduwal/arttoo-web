import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import throttle from 'lodash.throttle';

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

const videoSrc = '/section3-newest.mp4';
console.log('Video source:', videoSrc);

const Learn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoStatus, setVideoStatus] = useState('Not started');
  const lastScrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  const updateVideoTime = useCallback((percentScrolled: number) => {
    const video = videoRef.current;
    if (video && video.duration && isVideoLoaded) {
      const targetTime = video.duration * percentScrolled;
      video.currentTime = targetTime;
      console.log('Updated video time:', targetTime);
    }
  }, [isVideoLoaded]);

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || !isVideoLoaded) return;

    const { top, height } = container.getBoundingClientRect();
    const percentScrolled = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));

    updateVideoTime(percentScrolled);

    const newStep = Math.min(Math.max(Math.floor(percentScrolled * 3), 0), Steps.length - 1);
    if (newStep !== currentStep) {
      setCurrentStep(newStep);
    }

    lastScrollPositionRef.current = window.scrollY;
    isScrollingRef.current = true;

    // Clear the scrolling flag after a short delay
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);

  }, [currentStep, updateVideoTime, isVideoLoaded]);

  const throttledHandleScroll = useCallback(
    throttle(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(handleScroll);
    }, 100),
    [handleScroll]
  );

  const startVideoPlayback = useCallback(() => {
    const video = videoRef.current;
    if (video && isVideoLoaded) {
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('touchmove', throttledHandleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoStatus('Started');
            startVideoPlayback();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('touchmove', throttledHandleScroll);
      if (stepsRef.current) {
        observer.unobserve(stepsRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [throttledHandleScroll, startVideoPlayback]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded');
        setIsVideoLoaded(true);
        setVideoStatus('Metadata loaded');
        handleScroll();
      };

      const handleTimeUpdate = () => {
        if (!isScrollingRef.current) {
          video.pause();
        }
      };

      const handleError = (e: ErrorEvent) => {
        console.error('Video error:', e);
        setVideoStatus('Error');
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('error', handleError);
      };
    }
  }, [handleScroll]);

  // Attempt to load the video if it hasn't loaded
  useEffect(() => {
    const video = videoRef.current;
    if (video && !isVideoLoaded) {
      video.load();
    }
  }, [isVideoLoaded]);

  return (
    <section ref={containerRef} className='relative h-[300vh] bg-gray-100'>
      <div className='sticky top-0 h-screen flex items-center justify-center bg-white'>
        <div className='h-[80svh] w-[90vw] sm:w-[85vw] mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-start justify-between md:items-center'>
          <div className='w-full md:w-1/2 aspect-square order-2 md:order-1 relative'>
            <video
              ref={videoRef}
              className='w-full h-full object-cover relative z-10'
              playsInline
              muted
              preload='auto'
              style={{ opacity: 0.99 }}
              crossOrigin='anonymous'
              poster="/arttoo-logo.png"
            >
              <source src={videoSrc} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <div className='absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 z-20'>
              Status: {videoStatus}<br />
              Current Time: {videoRef.current?.currentTime.toFixed(2) || 'N/A'}<br />
              Duration: {videoRef.current?.duration.toFixed(2) || 'N/A'}<br />
              Is Loaded: {isVideoLoaded ? 'Yes' : 'No'}
            </div>
          </div>
          <div ref={stepsRef} className='flex flex-col w-full md:w-1/2 md:pl-8 order-1 md:order-2 pt-10 md:pt-0'>
            <AnimatePresence mode='wait'>
              {Steps[currentStep] && (
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
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Add this link to test video accessibility */}
      <a href={videoSrc} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded">
        Test Video Link
      </a>
    </section>
  );
};

export default Learn;
