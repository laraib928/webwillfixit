'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      containerRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.clipPath = 'none';
          }
          ScrollTrigger.refresh();
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
}

