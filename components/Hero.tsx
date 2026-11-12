'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroCanvas from './HeroCanvas';
import styles from './Hero.module.css';

const WORDS = [
  'high-converting websites',
  '24/7 AI chatbots',
  'smart automations',
  'scroll-stopping AI videos',
  'viral reels',
  'ads that sell',
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroInRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [typerText, setTyperText] = useState(WORDS[0]);

  // Typewriter effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let wordIndex = 0;
    let charIndex = WORDS[0].length;
    let isDeleting = true;

    const interval = setInterval(() => {
      if (isDeleting) {
        charIndex--;
        if (charIndex <= 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
        }
      } else {
        charIndex++;
        if (charIndex >= WORDS[wordIndex].length + 10) {
          isDeleting = true;
        }
      }
      const currentWord = WORDS[wordIndex];
      const sliceLength = Math.max(0, Math.min(charIndex, currentWord.length));
      setTyperText(currentWord.slice(0, sliceLength) || '\u00A0');
    }, 65);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const spans = containerRef.current.querySelectorAll(`.${styles.title} .ln > span`);
    const eyebrow = containerRef.current.querySelector('.eyebrow');
    const heroRow = containerRef.current.querySelector(`.${styles.heroRow}`);
    const orbit = orbitRef.current;
    const chips = containerRef.current.querySelectorAll('[data-speed]');

    gsap.set(spans, { yPercent: 110 });
    gsap.set([eyebrow, heroRow], { opacity: 0, y: 30 });
    if (orbit) gsap.set(orbit, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ delay: 0.35 });
    tl.to(spans, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12 })
      .to([eyebrow, heroRow], { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, '-=0.9')
      .to(orbit, { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' }, '-=1.1');

    if (orbit) {
      gsap.to(orbit, {
        yPercent: 18,
        rotate: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    chips.forEach((c) => {
      const speed = Number((c as HTMLElement).dataset.speed) || 0;
      gsap.to(c, {
        y: speed * 3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    if (heroInRef.current) {
      gsap.to(heroInRef.current, {
        yPercent: -30,
        scale: 0.92,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Pinned slide effect
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
        refreshPriority: 3,
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
      if (orbit) {
        gsap.to(orbit, {
          scale: 0.8,
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
    <header ref={containerRef} className={`${styles.hero} slide`} id="top" data-prio="3" style={{ zIndex: 1 }}>
      <div className="shade" />
      <HeroCanvas />
      <div ref={heroInRef} className={`wrap ${styles.heroIn} ${styles.heroGrid}`} id="heroIn">
        <div>
          <span className="eyebrow">Complete Digital Solutions</span>
          <h1 className={styles.title}>
            <span className="ln"><span>Your brand,</span></span>
            <span className="ln"><span className="gold">built to grow.</span></span>
            <span className="ln"><span>We&apos;ll fix it.</span></span>
          </h1>
          <div className={styles.heroRow}>
            <p className={styles.lead}>
              Websites, AI automation, chatbots, AI videos and social media under one roof. We build{' '}
              <span className={styles.typer} id="typer">{typerText}</span>
            </p>
            <div className={styles.ctas}>
              <Link href="/contact" className="btn btn-gold hov">
                Book a free call →
              </Link>
              <Link href="/services" className="btn btn-ghost hov">
                Explore services
              </Link>
            </div>
          </div>
        </div>
        <div ref={orbitRef} className={styles.orbit} id="orbit" aria-hidden="true">
          <div className={styles.ring} />
          <div className={`${styles.ring} ${styles.ring2}`} />
          <div className={styles.core}>
            <svg viewBox="0 0 48 36">
              <path d="M2 4h8l7 20 4-11" fill="none" stroke="#f6f2e8" strokeWidth="5" strokeLinejoin="round" />
              <path d="M19 13l5-9 9 26 11-26" fill="none" stroke="#ffc21a" strokeWidth="5" strokeLinejoin="round" />
              <path d="M4 31c13 2 28-5 40-24" fill="none" stroke="#ff9a0a" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.chip} data-speed="-60" style={{ top: '6%', left: 0 }}>
            <span><b>●</b> AI Agent online</span>
          </div>
          <div className={styles.chip} data-speed="40" style={{ top: '44%', right: '-4%' }}>
            <span style={{ animationDelay: '1.2s' }}>Lighthouse <b>98</b></span>
          </div>
          <div className={styles.chip} data-speed="-30" style={{ bottom: '8%', left: '6%' }}>
            <span style={{ animationDelay: '2.4s' }}>Reels <b>4K · 60fps</b></span>
          </div>
        </div>
      </div>
      <div className={styles.scrollhint} aria-hidden="true">
        SCROLL<i />
      </div>
    </header>
  );
}

