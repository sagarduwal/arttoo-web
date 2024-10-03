'use client';

import React, { useRef, useState } from 'react';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import Learn from './components/Learn';
import Artworks from './components/Artworks';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Header from './components/Header';
import { ArttooLogoBlack } from '@/assets/images';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LandingPage = () => {
  const main = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#artworks',
        scroller: 'body',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.to('header', {
      color: 'black',
    });
    tl.to(
      '#nav-container div a',
      {
        color: 'black',
      },
      '-=0.5'
    );
    tl.to('#nav-container img', {
      filter: 'invert(200%)',
    });
  });

  return (
    <main ref={main} className='flex flex-col overflow-x-hidden '>
      <Header />
      <Hero />
      <Artworks />
      <Learn />
      <About />
      <Footer />
    </main>
  );
};

export default LandingPage;
