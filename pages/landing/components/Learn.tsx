'use client';
import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Steps = [
  {
    title: 'Explore',
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's. ",
  },
  {
    title: 'Invest',
    description:
      'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
  },
  {
    title: 'Earn',
    description:
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more..',
  },
];

const Learn = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = videoRef.current;

    if (!video) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: leftRef.current,
      onUpdate: (e) => {
        if (video && video.duration) {
          const totalTime = video.duration;
          const progress = e.progress;
          requestAnimationFrame(() => {
            video.currentTime = totalTime * progress;
          });
        }
      },
    });
  }, []);

  return (
    <section ref={containerRef} className='w-[90vw] mx-auto sm:w-[85vw] min-h-screen'>
      <div className='flex flex-col md:flex-row'>
        <div className='h-screen md:w-1/2 flex justify-end items-end md:justify-center md:items-center' ref={leftRef}>
          <video ref={videoRef} muted className='w-full' preload='auto'>
            <source
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
              // src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
              src='/steps.mp4'
            ></source>
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='md:w-1/2 flex flex-col gap-8 justify-center z-50 '>
          {Steps.map((item, index) => {
            return (
              <FadeInUpwardAnimation key={index} delay={0.3} translateY={200}>
                <div className='max-w-[800px] h-[80vh] flex items-center justify-center'>
                  {item.title && (
                    <div className='flex gap-4 items-start justify-center'>
                      <span className='text-black/30 text-[40px] italic leading-[52.4px] md:mt-4'>{`0${
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
                </div>
              </FadeInUpwardAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Learn;
