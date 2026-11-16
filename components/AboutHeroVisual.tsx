'use client';

import React, { useRef, useEffect } from 'react';
import styles from './AboutHeroVisual.module.css';

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
}

interface Arc {
  from: [number, number]; // lat, lon in degrees
  to: [number, number];
  progress: number;
  speed: number;
}

export default function AboutHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // 3D Globe parameters
    let rotationY = 0.2;
    const rotationX = 0.38; // Slight downward tilt to view northern hemisphere
    let sphereRadius = 140;

    // Generate Fibonacci sphere points
    const POINT_COUNT = 180;
    const points: Node3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      points.push({
        x,
        y,
        z,
        baseRadius: Math.random() * 1.5 + 1.2,
      });
    }

    // Latitude rings angles in radians (-60°, -30°, 0°, 30°, 60°)
    const latAngles = [-Math.PI / 3, -Math.PI / 6, 0, Math.PI / 6, Math.PI / 3];

    // Hub coordinates: [lat, lon]
    const londonCoord: [number, number] = [51.5, -0.1];
    const targetHubs: [number, number][] = [
      [40.7, -74.0], // New York
      [25.2, 55.3], // Dubai
      [1.35, 103.8], // Singapore
      [37.7, -122.4], // San Francisco
    ];

    const arcs: Arc[] = targetHubs.map((to) => ({
      from: londonCoord,
      to,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.004,
    }));

    const resize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      sphereRadius = Math.min(width, height) * 0.33;
    };

    resize();
    window.addEventListener('resize', resize);

    // Subtle parallax on pointer move
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mousePosRef.current.targetX = normX * 0.45;
      mousePosRef.current.targetY = normY * 0.35;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Coordinate conversion from lat/lon to 3D unit vector
    const latLonToVector = (lat: number, lon: number): [number, number, number] => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(Math.sin(phi) * Math.sin(theta));
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.cos(theta);
      return [x, y, z];
    };

    // 3D rotation & projection
    const project = (
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number
    ): { px: number; py: number; depth: number; visible: boolean } => {
      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 400;
      const scale = fov / (fov + z2 * sphereRadius);
      const px = width / 2 + x1 * sphereRadius * scale;
      const py = height / 2 - y2 * sphereRadius * scale;

      return {
        px,
        py,
        depth: z2, // -1 (front) to 1 (back) in standard coordinates
        visible: z2 > -0.25,
      };
    };

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;

      const currentRotX = rotationX + mousePosRef.current.y;
      const currentRotY = rotationY + mousePosRef.current.x;

      if (!prefersReducedMotion) {
        rotationY += 0.0028;
        pulseTime += 0.04;
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw faint background sphere glow
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.2,
        centerX,
        centerY,
        sphereRadius * 1.15
      );
      radialGlow.addColorStop(0, 'rgba(255, 194, 26, 0.12)');
      radialGlow.addColorStop(0.6, 'rgba(255, 154, 10, 0.03)');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 1. Draw Latitude rings
      latAngles.forEach((lat) => {
        const ringRadius = Math.cos(lat);
        const ringY = Math.sin(lat);
        ctx.beginPath();
        let first = true;
        const SEGMENTS = 48;
        for (let s = 0; s <= SEGMENTS; s++) {
          const theta = (s / SEGMENTS) * Math.PI * 2;
          const rx = Math.cos(theta) * ringRadius;
          const rz = Math.sin(theta) * ringRadius;
          const p = project(rx, ringY, rz, currentRotX, currentRotY);
          if (first) {
            ctx.moveTo(p.px, p.py);
            first = false;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.strokeStyle =
          lat === 0
            ? 'rgba(255, 194, 26, 0.24)' // Equator is slightly brighter
            : 'rgba(255, 194, 26, 0.09)';
        ctx.lineWidth = lat === 0 ? 1.2 : 0.8;
        ctx.stroke();
      });

      // 2. Draw Longitude rings (Meridians)
      const meridians = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
      meridians.forEach((meridian) => {
        ctx.beginPath();
        let first = true;
        const SEGMENTS = 48;
        for (let s = 0; s <= SEGMENTS; s++) {
          const phiAngle = (s / SEGMENTS) * Math.PI * 2;
          const my = Math.cos(phiAngle);
          const r = Math.sin(phiAngle);
          const mx = Math.cos(meridian) * r;
          const mz = Math.sin(meridian) * r;
          const p = project(mx, my, mz, currentRotX, currentRotY);
          if (first) {
            ctx.moveTo(p.px, p.py);
            first = false;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.strokeStyle = 'rgba(255, 194, 26, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // 3. Draw connection arcs from London to global hubs
      const londonVec = latLonToVector(londonCoord[0], londonCoord[1]);
      const pLondon = project(londonVec[0], londonVec[1], londonVec[2], currentRotX, currentRotY);

      arcs.forEach((arc) => {
        const targetVec = latLonToVector(arc.to[0], arc.to[1]);
        const pTarget = project(targetVec[0], targetVec[1], targetVec[2], currentRotX, currentRotY);

        if (!prefersReducedMotion) {
          arc.progress = (arc.progress + arc.speed) % 1;
        }

        // Draw great-circle styled curve if both points or center are somewhat visible
        const ARC_STEPS = 24;
        ctx.beginPath();
        for (let s = 0; s <= ARC_STEPS; s++) {
          const t = s / ARC_STEPS;
          // Spherical linear interpolation between points
          const ix = londonVec[0] * (1 - t) + targetVec[0] * t;
          const iy = londonVec[1] * (1 - t) + targetVec[1] * t;
          const iz = londonVec[2] * (1 - t) + targetVec[2] * t;
          // Normalize and elevate arc slightly above surface
          const len = Math.sqrt(ix * ix + iy * iy + iz * iz);
          const heightBoost = 1 + Math.sin(t * Math.PI) * 0.16;
          const ax = (ix / len) * heightBoost;
          const ay = (iy / len) * heightBoost;
          const az = (iz / len) * heightBoost;

          const p = project(ax, ay, az, currentRotX, currentRotY);
          if (s === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }

        ctx.strokeStyle = 'rgba(255, 194, 26, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Draw traveling energy particle along the arc
        const tPulse = arc.progress;
        const ix = londonVec[0] * (1 - tPulse) + targetVec[0] * tPulse;
        const iy = londonVec[1] * (1 - tPulse) + targetVec[1] * tPulse;
        const iz = londonVec[2] * (1 - tPulse) + targetVec[2] * tPulse;
        const len = Math.sqrt(ix * ix + iy * iy + iz * iz);
        const heightBoost = 1 + Math.sin(tPulse * Math.PI) * 0.16;
        const pPulse = project(
          (ix / len) * heightBoost,
          (iy / len) * heightBoost,
          (iz / len) * heightBoost,
          currentRotX,
          currentRotY
        );

        if (pPulse.depth < 0.2) {
          ctx.beginPath();
          ctx.arc(pPulse.px, pPulse.py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffc21a';
          ctx.shadowColor = '#ffc21a';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw small dot on the target hub
        if (pTarget.depth < 0.3) {
          ctx.beginPath();
          ctx.arc(pTarget.px, pTarget.py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 194, 26, 0.8)';
          ctx.fill();
        }
      });

      // 4. Draw Fibonacci point cloud (network nodes)
      points.forEach((pt) => {
        const p = project(pt.x, pt.y, pt.z, currentRotX, currentRotY);
        // Depth-based brightness and size
        // Depth ranges roughly -1 (front) to 1 (back)
        const alpha = Math.max(0.08, Math.min(0.85, (0.7 - p.depth) * 0.7));
        const size = Math.max(0.8, pt.baseRadius * (1 - p.depth * 0.45));

        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 194, 26, ${alpha})`;
        ctx.fill();
      });

      // 5. Draw London HQ Pinned Beacon
      if (pLondon.depth < 0.5) {
        // Core glowing dot
        ctx.beginPath();
        ctx.arc(pLondon.px, pLondon.py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffc21a';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Expanding pulse rings
        const ring1 = (pulseTime * 20) % 28;
        const ring1Alpha = Math.max(0, 1 - ring1 / 28);
        ctx.beginPath();
        ctx.arc(pLondon.px, pLondon.py, 4 + ring1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 194, 26, ${ring1Alpha * 0.8})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const ring2 = ((pulseTime * 20) + 14) % 28;
        const ring2Alpha = Math.max(0, 1 - ring2 / 28);
        ctx.beginPath();
        ctx.arc(pLondon.px, pLondon.py, 4 + ring2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 194, 26, ${ring2Alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // London Label
        ctx.font = '600 10px var(--font-mono), monospace';
        ctx.fillStyle = '#ffc21a';
        ctx.fillText('LONDON HQ · 51.5°N', pLondon.px + 10, pLondon.py - 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.visualContainer} aria-hidden="true">
      <div className={styles.ambientGlow} />
      <div className={styles.outerRing} />

      <div className={styles.canvasWrap}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      {/* Floating Pill 1: Web Development */}
      <div className={`${styles.globePill} ${styles.pill1}`}>
        <span className={styles.pillIcon}>
          <svg viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 8h18M8 21h8M9 13l-2 1.5L9 16M15 13l2 1.5-2 1.5" />
          </svg>
        </span>
        <span className={styles.pillText}>Web Development</span>
        <span className={styles.pillDot} />
      </div>

      {/* Floating Pill 2: AI Automation */}
      <div className={`${styles.globePill} ${styles.pill2}`}>
        <span className={styles.pillIcon}>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
          </svg>
        </span>
        <span className={styles.pillText}>AI Automation</span>
        <span className={styles.pillDot} />
      </div>

      {/* Floating Pill 3: Digital Marketing */}
      <div className={`${styles.globePill} ${styles.pill3}`}>
        <span className={styles.pillIcon}>
          <svg viewBox="0 0 24 24">
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
          </svg>
        </span>
        <span className={styles.pillText}>Digital Marketing</span>
        <span className={styles.pillDot} />
      </div>

      {/* Floating Pill 4: Creative Solutions */}
      <div className={`${styles.globePill} ${styles.pill4}`}>
        <span className={styles.pillIcon}>
          <svg viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
        <span className={styles.pillText}>Creative Solutions</span>
        <span className={styles.pillDot} />
      </div>
    </div>
  );
}

