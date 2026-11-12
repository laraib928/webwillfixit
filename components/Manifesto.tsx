'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Manifesto.module.css';

const TEXT_PARTS = [
  { text: 'We are a digital studio that turns slow, manual businesses into fast, automated brands. One team designs your website, trains your AI, edits your videos and runs your ads, so ', gold: false },
  { text: 'everything works together.', gold: true },
];

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !pRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const words = pRef.current.querySelectorAll(`.${styles.w}`);
    gsap.from(words, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.025,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 2%',
      },
    });

    const nextElem = containerRef.current.nextElementSibling;
    if (nextElem) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () =>
          containerRef.current && containerRef.current.offsetHeight <= window.innerHeight
            ? 'top top'
            : 'bottom bottom',
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        refreshPriority: 2,
      });

      const shade = containerRef.current.querySelector('.shade');
      if (shade) {
        gsap.to(shade, {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: nextElem,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className={`sec manifesto slide fullv ${styles.manifesto}`}
      id="about"
      data-prio="2"
      style={{ zIndex: 3 }}
    >
      <div className="shade" />
      <div className={`wrap ${styles.wrap}`}>
        <span className={`eyebrow ${styles.eyebrow}`}>Who we are</span>
        <p ref={pRef} className={styles.text} id="mani">
          {TEXT_PARTS.map((part, pIdx) => {
            const words = part.text.split(' ');
            return words.map((w, wIdx) => {
              if (!w) return null;
              return (
                <React.Fragment key={`${pIdx}-${wIdx}`}>
                  <span className={`${styles.w} ${part.gold ? styles.g : ''}`}>{w}</span>{' '}
                </React.Fragment>
              );
            });
          })}
        </p>
        <Link href="/about" className="btn btn-gold hov" style={{ marginTop: '36px' }}>
          Know more about us →
        </Link>
      </div>
    </section>
  );
}

