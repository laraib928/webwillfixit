'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Loader.module.css';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHidden(true);
      onComplete?.();
      return;
    }
  }, [onComplete]);

  useGSAP(() => {
    if (hidden || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHidden(true);
      onComplete?.();
      return;
    }

    const obj = { v: 0 };
    const tl = gsap.timeline();

    tl.to(obj, {
      v: 100,
      duration: 1.3,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.floor(obj.v));
        if (barRef.current) barRef.current.style.width = `${obj.v}%`;
      },
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
      onStart: () => {
        onComplete?.();
      },
      onComplete: () => {
        setHidden(true);
      },
    });

    return () => {
      tl.kill();
    };
  }, { scope: containerRef });

  if (hidden) return null;

  return (
    <div ref={containerRef} id="loader" className={styles.loader} aria-hidden="true">
      <div className={styles.lt}>Webwillfixit · Complete Digital Solutions</div>
      <div className={styles.ln}>
        <span ref={numRef} id="lnum">0</span>
        <span className="gold">%</span>
      </div>
      <div ref={barRef} className={styles.bar} id="lbar" />
    </div>
  );
}

