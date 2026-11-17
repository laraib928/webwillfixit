'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TimelineItem } from '@/data/team';
import styles from './FounderTimeline.module.css';

interface FounderTimelineProps {
  items: TimelineItem[];
}

export default function FounderTimeline({ items }: FounderTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const rows = containerRef.current.querySelectorAll(`.${styles.timelineRow}`);
      if (rows.length === 0) return;

      gsap.from(rows, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={styles.timelineWrap}>
      <div className={styles.timelineHeader}>
        <span className={styles.timelineEyebrow}>1988 — 2020</span>
        <h3 className={styles.timelineTitle}>Media &amp; Public Relations Experience</h3>
      </div>

      <div className={styles.timelineList}>
        <div className={styles.timelineLine} aria-hidden="true" />
        {items.map((item, idx) => (
          <div key={idx} className={styles.timelineRow}>
            <div className={styles.timelineDot} aria-hidden="true">
              <span className={styles.timelineDotInner} />
            </div>
            <div className={styles.timelineContent}>
              <span className={styles.timelinePeriod}>{item.period}</span>
              <div className={styles.timelineDetails}>
                <b className={styles.timelineRole}>{item.role}</b>
                <span className={styles.timelineSep}>, </span>
                <span className={styles.timelineOrg}>{item.org}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
