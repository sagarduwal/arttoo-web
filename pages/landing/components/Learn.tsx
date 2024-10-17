// 'use client';
// import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { useEffect, useRef, useState } from 'react';

// gsap.registerPlugin(useGSAP);
// gsap.registerPlugin(ScrollTrigger);

// const Steps = [
//   {
//     title: 'Explore',
//     progress: { min: 0, max: 0.53 },
//     description:
//       "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's. ",
//   },
//   {
//     title: 'Invest',
//     progress: { min: 0.53, max: 0.87 },

//     description:
//       'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
//   },
//   {
//     title: 'Earn',
//     progress: { min: 0.87, max: 0.988 },
//     description:
//       'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more..',
//   },
// ];

// const Learn = () => {
//   const containerRef = useRef<HTMLElement>(null);
//   const pinRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [windowWidth, setWindowWidth] = useState<number>(0);
//   const [progression, setProgression] = useState<number>(0);
//   useEffect(() => {
//     const updateWidth = () => {
//       setWindowWidth(window.innerWidth);
//     };
//     updateWidth();
//     window.addEventListener('resize', updateWidth);
//     return () => window.removeEventListener('resize', updateWidth);
//   }, []);

//   useGSAP(() => {
//     const video = videoRef.current;
//     const pin = pinRef.current;
//     if (!video) return;
//     ScrollTrigger.create({
//       trigger: containerRef.current,
//       start: 'top 20%',
//       end: `bottom bottom`,
//       pin: pin,
//       markers: true,

//       onUpdate: (e) => {
//         if (video && video.duration) {
//           const totalTime = video.duration;
//           const progress = e.progress;
//           setProgression(() => progress);
//           requestAnimationFrame(() => {
//             video.currentTime = totalTime * progress;
//           });
//         }
//       },
//     });
//   }, []);

//   return (
//     <section ref={containerRef} className='w-[90vw] mx-auto sm:w-[85vw] min-h-screen h-full'>
//       <div className='flex flex-col lg:flex-row'>
//         <div
//           className='bg-red-300 h-[50vh] lg:w-1/2 flex justify-center items-center lg:justify-start lg:items-start'
//           ref={pinRef}
//         >
//           {/* <div className='after:content-[""] after:absolute after:inset-0 after:bg-slate-500/25 z-10'> */}
//           <video ref={videoRef} muted className='w-full relative' preload='auto'>
//             <source
//               type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
//               // src='https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4'
//               // src='/steps-43.mp4'
//               src='/section3.mp4'
//             ></source>
//             Your browser does not support the video tag.
//           </video>
//           {/* </div> */}
//         </div>
//         <div className='lg:w-1/2 flex flex-col justify-center h-full'>
//           {Steps.map((item, index) => {
//             return (
//               <div key={index} className='max-w-[800px] h-screen flex justify-center items-center'>
//                 <FadeInUpwardAnimation delay={0.3} translateY={200}>
//                   {item.title && (
//                     <div className='flex gap-4 items-start justify-center'>
//                       <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${
//                         index + 1
//                       }`}</span>
//                       <div className='flex flex-col gap-2'>
//                         <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
//                           {item.title}
//                         </h4>
//                         <p className=' text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]'>
//                           {item.description}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </FadeInUpwardAnimation>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Learn;

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Steps = [
  {
    title: 'Explore',
    progress: { min: 0, max: 0.33 },
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's. ",
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
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more..',
  },
];

// const videoSrc = 'https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4';
const videoSrc = '/steps-43.mp4';

const Learn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const scrollVideo = () => {
      if (video.duration) {
        const { top, height } = container.getBoundingClientRect();
        const percentScrolled = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));

        video.currentTime = video.duration * percentScrolled;

        // Update current step based on scroll progress
        const newStep = Steps.findIndex(
          (step) => percentScrolled >= step.progress.min && percentScrolled < step.progress.max
        );
        if (newStep !== -1 && newStep !== currentStep) {
          setCurrentStep(newStep);
        }
      }
      requestAnimationFrame(scrollVideo);
    };

    requestAnimationFrame(scrollVideo);
  }, [currentStep]);

  return (
    <section ref={containerRef} className='relative h-[300vh]'>
      <div className='sticky top-0 h-screen flex items-center justify-center'>
        <div className='w-full h-[80svh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between'>
          <div className='w-full lg:w-1/2 aspect-square order-2 lg:order-1'>
            <video ref={videoRef} className='w-full h-full object-cover' playsInline autoPlay muted preload='auto'>
              <source src={videoSrc} type='video/mp4' />
              <p>Your browser does not support the HTML5 Video element.</p>
            </video>
          </div>
          <div className='flex flex-col w-full lg:w-1/2 lg:pl-8 order-1 lg:order-2 pt-24 lg:pt-0'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className='flex gap-4 items-start justify-start'>
                  <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${
                    currentStep + 1
                  }`}</span>
                  <div className='flex flex-col gap-2'>
                    <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
                      {Steps[currentStep].title}
                    </h4>
                    <p className='text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]'>
                      {Steps[currentStep].description}
                    </p>
                  </div>
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
