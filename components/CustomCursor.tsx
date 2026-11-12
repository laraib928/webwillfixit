'use client';

import React, { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const cur = cursorRef.current;
    if (!cur) return;

    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      if (cur) {
        cur.style.left = `${cx}px`;
        cur.style.top = `${cy}px`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.hov, .panel, .wcard, a, button, .cred, .tm, .pack, .chipbtn, .pcard, .ccard, .pill')) {
        cur.classList.add(styles.big);
      } else {
        cur.classList.remove(styles.big);
      }
    };

    document.addEventListener('mouseover', onPointerOver);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseover', onPointerOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} id="cur" className={styles.cur} aria-hidden="true" />;
}

