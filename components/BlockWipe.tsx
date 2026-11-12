'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const ORIGINS = ['0 0', '100% 0', '0 100%', '100% 100%', '50% 50%'];
const COLORS = ['#050507', '#f6f2e8'];

interface GridData {
  cols: number;
  rows: number;
  cells: Array<{ color: string; origin: string }>;
}

function calculateGrid(width: number, height: number): GridData {
  let cols = 6;
  if (width >= 1100) {
    cols = 12;
  } else if (width >= 700) {
    cols = 9;
  }

  const safeWidth = Math.max(1, width);
  const rows = Math.max(4, Math.round((cols * height) / safeWidth));
  const total = cols * rows;
  const cells: Array<{ color: string; origin: string }> = new Array(total);

  for (let i = 0; i < total; i++) {
    cells[i] = {
      color: Math.random() < 0.5 ? COLORS[0] : COLORS[1],
      origin: ORIGINS[i % ORIGINS.length],
    };
  }

  return { cols, rows, cells };
}

export default function BlockWipe() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [grid, setGrid] = useState<GridData | null>(null);

  useEffect(() => {
    // 8. prefers-reduced-motion: do not render the overlay at all.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    setGrid(calculateGrid(window.innerWidth, window.innerHeight));
    setMounted(true);

    // 5. On window resize (debounced 250ms): rebuild the grid with the new COLS/ROWS,
    // recreate the timeline (kill the old timeline and its ScrollTrigger first), then call ScrollTrigger.refresh().
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setGrid(calculateGrid(window.innerWidth, window.innerHeight));
      }, 250);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useGSAP(
    () => {
      if (reducedMotion || !grid || !overlayRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // Kill previous timeline and its ScrollTrigger if still active
      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
        tlRef.current = null;
      }

      const cells = overlayRef.current.querySelectorAll('span');
      if (!cells.length) return;

      const target = document.getElementById('about') || '#about';

      // Ensure all blocks start hidden
      gsap.set(cells, { scale: 0 });

      // 4. Animation, inside useGSAP with a scope ref:
      // Register ScrollTrigger.
      // Create ONE gsap timeline with:
      // scrollTrigger: { trigger: <About section element>, start: "top 92%", end: "top 0%", scrub: 0.6 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: 'top 92%',
          end: 'top 0%',
          scrub: 0.6,
        },
      });

      // Step 1 (cover): tl.to(cells, { scale: 1.02, ease: "power2.out", duration: 0.5, stagger: { grid: [ROWS, COLS], from: "end", amount: 0.45 } })
      tl.to(cells, {
        scale: 1.02,
        ease: 'power2.out',
        duration: 0.5,
        stagger: {
          grid: [grid.rows, grid.cols],
          from: 'end',
          amount: 0.45,
        },
      });

      // Step 2 (reveal), after a 0.08 gap: tl.to(cells, { scale: 0, ease: "power2.in", duration: 0.5, stagger: { grid: [ROWS, COLS], from: "start", amount: 0.45 } }, "+=0.08")
      tl.to(
        cells,
        {
          scale: 0,
          ease: 'power2.in',
          duration: 0.5,
          stagger: {
            grid: [grid.rows, grid.cols],
            from: 'start',
            amount: 0.45,
          },
        },
        '+=0.08'
      );

      tlRef.current = tl;

      // Refresh ScrollTrigger so positions are synced
      ScrollTrigger.refresh();

      return () => {
        if (tlRef.current) {
          tlRef.current.scrollTrigger?.kill();
          tlRef.current.kill();
          tlRef.current = null;
        }
      };
    },
    { scope: overlayRef, dependencies: [grid, reducedMotion] }
  );

  // 8. prefers-reduced-motion: do not render the overlay at all.
  if (!mounted || reducedMotion || !grid) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        display: 'grid',
        gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        gap: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {grid.cells.map((cell, idx) => (
        <span
          key={idx}
          style={{
            display: 'block',
            transform: 'scale(0)',
            willChange: 'transform',
            backgroundColor: cell.color,
            transformOrigin: cell.origin,
            borderRadius: 0,
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
          }}
        />
      ))}
    </div>
  );
}

