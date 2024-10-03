'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Layers(): JSX.Element {
  const main = useRef<HTMLElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const snapTriggers = useRef<ScrollTrigger[]>([]);
  const { contextSafe } = useGSAP(
    () => {
      const panels = gsap.utils.toArray<Element>('.panel');
      let scrollStarts: number[] = [0];
      let snapScroll: (value: number, direction?: number) => number = (value) => value;

      panels.forEach((panel, i) => {
        snapTriggers.current[i] = ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
        });
      });

      ScrollTrigger.addEventListener('refresh', () => {
        scrollStarts = snapTriggers.current.map((trigger) => trigger.start as number);
        snapScroll = ScrollTrigger.snapDirectional(scrollStarts) as (value: number, direction?: number) => number;
      });

      ScrollTrigger.observe({
        type: 'wheel,touch',
        onChangeY(self) {
          if (!scrollTween.current) {
            const scroll = snapScroll(self.scrollY() + self.deltaY, self.deltaY > 0 ? 1 : -1);
            goToSection(scrollStarts.indexOf(scroll));
          }
        },
      });

      ScrollTrigger.refresh();
    },
    {
      dependencies: [],
      scope: main,
      revertOnUpdate: true,
    }
  );

  const goToSection = contextSafe((i: number) => {
    console.log('scroll to', i);
    if (snapTriggers.current[i]) {
      scrollTween.current = gsap.to(window, {
        duration: 1,
        scrollTo: snapTriggers.current[i].start,
        onComplete: () => (scrollTween.current = null),
        overwrite: true,
      });
    }
  });

  return (
    <main ref={main}>
      <section className='description panel light'>
        <div>
          <h1>Layered pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className='scroll-down'>
            Scroll down<div className='arrow'></div>
          </div>
        </div>
      </section>
      <section className='panel dark'>ONE</section>
      <section className='panel purple'>TWO</section>
      <section className='panel orange'>THREE</section>
      <section className='panel red'>FOUR</section>
    </main>
  );
}
