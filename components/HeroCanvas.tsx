'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let particles: { t: number; o: number; s: number; r: number }[] = [];
    const d = window.devicePixelRatio || 1;
    let cometT = 0;
    let scrollBoost = 0;
    let rafId: number;

    const size = () => {
      w = canvas.width = canvas.offsetWidth * d;
      h = canvas.height = canvas.offsetHeight * d;
      particles = Array.from({ length: Math.min(110, Math.floor(w / 14)) }, () => ({
        t: Math.random(),
        o: (Math.random() - 0.5) * 0.3,
        s: 0.0006 + Math.random() * 0.0013,
        r: (Math.random() * 1.9 + 0.4) * d,
      }));
    };

    const pt = (t: number, o: number): [number, number] => [
      w * (-0.05 + t * 1.15),
      h * (0.98 - Math.pow(t, 1.6) * 0.86 + o),
    ];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 3 * d;
      ctx.lineCap = 'round';

      const g = ctx.createLinearGradient(0, h, w, 0);
      g.addColorStop(0, 'rgba(255,154,10,.12)');
      g.addColorStop(0.55, 'rgba(255,180,20,.7)');
      g.addColorStop(1, 'rgba(255,214,90,1)');
      ctx.strokeStyle = g;
      ctx.shadowColor = 'rgba(255,180,20,.85)';
      ctx.shadowBlur = 18 * d;

      ctx.beginPath();
      for (let t = 0; t <= 1; t += 0.01) {
        const [a, b] = pt(t, 0);
        if (t === 0) ctx.moveTo(a, b);
        else ctx.lineTo(a, b);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      cometT = (cometT + (prefersReducedMotion ? 0 : 0.0035 * (1 + scrollBoost))) % 1;
      const [ca, cb] = pt(cometT, 0);
      const cr = 30 * d;
      const rg = ctx.createRadialGradient(ca, cb, 0, ca, cb, cr);
      rg.addColorStop(0, 'rgba(255,236,160,1)');
      rg.addColorStop(0.25, 'rgba(255,194,26,.55)');
      rg.addColorStop(1, 'rgba(255,194,26,0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(ca, cb, cr, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((q) => {
        q.t += prefersReducedMotion ? 0 : q.s * (1 + scrollBoost);
        if (q.t > 1) q.t = 0;
        const [a, b] = pt(q.t, q.o);
        ctx.fillStyle = `rgba(255,${180 + ((q.t * 30) | 0)},20,${0.2 + q.t * 0.65})`;
        ctx.beginPath();
        ctx.arc(a, b, q.r, 0, Math.PI * 2);
        ctx.fill();
      });

      scrollBoost *= 0.94;
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    size();
    draw();

    const onResize = () => {
      size();
      if (prefersReducedMotion) draw();
    };
    window.addEventListener('resize', onResize);

    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        scrollBoost = Math.min(6, Math.abs(self.getVelocity()) / 300);
      },
    });

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stage"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

