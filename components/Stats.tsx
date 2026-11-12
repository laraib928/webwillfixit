'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Stats.module.css';

export default function Stats() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const counts = containerRef.current.querySelectorAll('.count');
    counts.forEach((el) => {
      const target = Number((el as HTMLElement).dataset.to) || 0;
      const obj = { v: 0 };
      el.textContent = '0';
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = String(Math.floor(obj.v));
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={`after ${styles.section}`}>
      <div className="wrap">
        <div className={styles.stats}>
          <div className={styles.stat}>
            <b>
              <span className="count" data-to="6">6</span>
            </b>
            <span>Services under one roof</span>
          </div>
          <div className={styles.stat}>
            <b className="gold">24/7</b>
            <span>AI agents answering customers</span>
          </div>
          <div className={styles.stat}>
            <b>
              <span className="count" data-to="48">48</span>h
            </b>
            <span>First design preview</span>
          </div>
          <div className={styles.stat}>
            <b>
              <span className="count" data-to="100">100</span>%
            </b>
            <span>Custom, no templates</span>
          </div>
        </div>
      </div>
    </section>
  );
}

