import Image from 'next/image';
import React from 'react';

const Steps = [
  {
    title: 'Explore',
    image: '/sec_I.png',
    progress: { min: 0, max: 0.33 },
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's.",
  },
  {
    title: 'Invest',
    image: '/sec_II.png',
    progress: { min: 0.33, max: 0.66 },
    description:
      'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
  },
  {
    title: 'Earn',
    image: '/sec_lII.png',
    progress: { min: 0.66, max: 1 },
    description:
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more.',
  },
];

const Learn: React.FC = () => {
  return (
    <section className='w-[90vw] sm:w-[85vw] mx-auto relative z-10 md:py-10 lg:py-20'>
      {Steps.map((step, index) => (
        <div key={index} className={`flex flex-col lg:flex-row w-full`}>
          <div
            className={`flex align-middle justify-center w-full lg:w-1/2 ${
              index % 2 === 0 ? 'lg:order-first' : 'lg:order-last'
            }`}
          >
            <Image width='600' height='600' className='object-contain' src={step.image} alt={step.title} />
          </div>
          <div
            className={`w-full lg:w-1/2 p-8 flex items-center justify-center order-first ${
              index % 2 === 0 ? 'lg:order-last' : 'lg:order-first'
            }`}
          >
            <div className='flex gap-4 items-start justify-start pt-8 lg:pt-16'>
              <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${index + 1}`}</span>
              <div className='flex flex-col gap-2'>
                <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
                  {step.title}
                </h4>
                <p className='text-[16px] leading-[20.4px] md:text-[20px] md:leading-[26.2px]'>{step.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Learn;
