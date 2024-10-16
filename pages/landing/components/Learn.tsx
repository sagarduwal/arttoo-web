'use client';
import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Steps = [
  {
    title: 'Explore',
    progress: { min: 0, max: 0.53 },
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's. ",
  },
  {
    title: 'Invest',
    progress: { min: 0.53, max: 0.87 },

    description:
      'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
  },
  {
    title: 'Earn',
    progress: { min: 0.87, max: 0.988 },
    description:
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more..',
  },
];

const Learn = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [progression, setProgression] = useState<number>(0);
  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 20%',
      markers: true,
      end: `bottom 50%`,
      pin: leftRef.current,
      onUpdate: (e) => {
        console.log('scroll event', e.progress);
        if (video && video.duration) {
          const totalTime = video.duration;
          const progress = e.progress;
          setProgression(() => progress);
          requestAnimationFrame(() => {
            video.currentTime = totalTime * progress;
          });
        }
      },
    });
  }, []);

  return (
    <section ref={containerRef} className='w-[90vw] mx-auto sm:w-[85vw] min-h-screen h-full '>
      <div className='flex flex-col lg:flex-row'>
        <div
          className='h-[80vh] lg:w-1/2 flex justify-center items-center lg:justify-start lg:items-start'
          ref={leftRef}
        >
          <video ref={videoRef} muted className='w-full' preload='auto'>
            <source
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
              // src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
              src='/steps-43.mp4'
            ></source>
            Your browser does not support the video tag.
          </video>
        </div>
        {windowWidth >= 780 ? (
          <div className='lg:w-1/2 flex flex-col justify-center lg:z-50 h-full'>
            {Steps.map((item, index) => {
              return (
                <div
                  key={index}
                  className='max-w-[800px] h-screen flex items-end justify-center [&:nth-child(3)]:items-center'
                >
                  <FadeInUpwardAnimation delay={0.3} translateY={200}>
                    {item.title && (
                      <div className='flex gap-4 items-start justify-center'>
                        <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${
                          index + 1
                        }`}</span>
                        <div className='flex flex-col gap-2'>
                          <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
                            {item.title}
                          </h4>
                          <p className=' text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </FadeInUpwardAnimation>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {progression > 0 && progression < 1 && (
              <div className='gap-8 lg:z-50'>
                {Steps.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`fixed top-28 max-w-[800px]  flex items-end justify-center [&:nth-child(3)]:items-center ${
                        progression <= item.progress.max && progression >= item.progress.min
                          ? 'opacity-100 transition-opacity duration-500 ease-in'
                          : 'opacity-0 transition-opacity duration-500 ease-out'
                      }`}
                    >
                      <FadeInUpwardAnimation delay={0.6} translateY={50}>
                        <div className='flex gap-4 items-start justify-center'>
                          <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4 '>{`0${
                            index + 1
                          }`}</span>
                          <div className='flex flex-col gap-2'>
                            <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium '>
                              {item.title}
                            </h4>
                            <p className=' text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]'>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </FadeInUpwardAnimation>
                    </div>
                  );
                })}
              </div>
            )}
            {/* To Maintain the scrollable height (can be obtimized)*/}
            <div className='lg:w-1/2 flex flex-col gap-8 justify-center lg:z-50 '>
              {Steps.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='max-w-[800px] h-[75vh] flex items-end justify-center [&:nth-child(3)]:items-center'
                  >
                    <div className='flex gap-4 items-start justify-center'>
                      <span className='text-[40px] italic leading-[52.4px] md:mt-4 text-transparent'>{`0${
                        index + 1
                      }`}</span>
                      <div className='flex flex-col gap-2'>
                        <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium text-transparent'>
                          {item.title}
                        </h4>
                        <p className=' text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px] text-transparent'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Learn;
