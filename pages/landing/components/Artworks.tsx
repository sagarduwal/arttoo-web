'use client';
import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';

const Artworks = () => {
  return (
    <section id='artworks' className='relative h-[100svh] sm:h-[100vh] md:h-[120vh] xl:h-[130vh] xl:min-h-[1340px]'>
      <div className='flex justify-between flex-col md:flex-row gap-4 mt-24 md:mt-40 xl:mt-64 w-[90vw] sm:w-[85vw] mx-auto'>
        <FadeInUpwardAnimation>
          <h1 className='text-[50px] sm:text-[60px] md:text-[70px] xl:text-[90px] leading-[65px] sm:leading-[80px] md:leading-[90px] xl:leading-[131px]  text-balance  tracking-tight'>
            Art Is The Visual <span className='italic font-medium'>Proof Of History</span> For Humanity
          </h1>
        </FadeInUpwardAnimation>
        <FadeInUpwardAnimation delay={0.3}>
          <p className='text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px] md:mt-40 max-w-[900px] w-full'>
            Arttoo is about unlocking a world of possibilities.Become part of a vibrant art community, connect with a
            timeless piece of culture, and watch your investment grow alongside your passion, with a hassle-free mindset
            for provenance tracking. All transactions are secure, transparent, and regulated through the beauty of
            blockchain technologies.
          </p>
        </FadeInUpwardAnimation>
      </div>
      <video
        playsInline
        autoPlay
        muted
        loop
        className='w-full h-[60vh] md:h-[75vh] object-cover absolute -bottom-30 right-0 left-0 -z-[1]'
      >
        <source src='/section2-highres.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Artworks;
