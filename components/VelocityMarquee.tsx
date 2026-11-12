'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './VelocityMarquee.module.css';

export default function VelocityMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tr = trackRef.current;
    let x = 0;
    let dir = 1;
    let vel = 0;

    const st = ScrollTrigger.create({
      onUpdate: (s) => {
        dir = s.direction || 1;
        vel = Math.min(25, Math.abs(s.getVelocity()) / 90);
      },
    });

    const tickerCb = () => {
      if (!tr) return;
      const half = tr.scrollWidth / 2;
      x -= (1.1 + vel) * dir;
      if (x < -half) x += half;
      if (x > 0) x -= half;
      vel *= 0.92;
      gsap.set(tr, { x, skewX: -vel * dir * 0.6 });
    };

    gsap.ticker.add(tickerCb);

    return () => {
      st.kill();
      gsap.ticker.remove(tickerCb);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`${styles.marquee} slide-over`}
      aria-hidden="true"
      style={{ zIndex: 2, background: 'var(--bg2)' }}
    >
      <div ref={trackRef} className={styles.mtrack} id="mtrack">
        <span>
          Web Development <i /> <span className={styles.o}>AI Automation</span> <i /> Chatbots <i />{' '}
          <span className={styles.o}>AI Videos</span> <i /> Video Editing <i />{' '}
          <span className={styles.o}>Social Media</span> <i />
        </span>
        <span>
          Web Development <i /> <span className={styles.o}>AI Automation</span> <i /> Chatbots <i />{' '}
          <span className={styles.o}>AI Videos</span> <i /> Video Editing <i />{' '}
          <span className={styles.o}>Social Media</span> <i />
        </span>
      </div>
    </div>
  );
}

