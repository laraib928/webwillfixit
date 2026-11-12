'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { services } from '@/data/services';
import ServiceVisual from '@/components/ServiceVisual';
import styles from './HorizontalServices.module.css';

export function renderServiceIcon(iconType: string) {
  switch (iconType) {
    case 'web':
      return (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 8h18M8 21h8M9 13l-2 1.5L9 16M15 13l2 1.5-2 1.5" />
        </svg>
      );
    case 'auto':
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        </svg>
      );
    case 'bot':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          <path d="M9 11h.01M15 11h.01" />
        </svg>
      );
    case 'aiv':
      return (
        <svg viewBox="0 0 24 24">
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="M16 10l6-3v10l-6-3z" />
        </svg>
      );
    case 'edit':
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />
        </svg>
      );
    case 'smm':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HorizontalServices() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const countNumRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const tr = trackRef.current;

    mm.add('(min-width: 900px)', () => {
      const dist = () => tr.scrollWidth - window.innerWidth;

      const tw = gsap.to(tr, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${dist()}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (lineProgressRef.current) {
              lineProgressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (countNumRef.current) {
              const currentNum = Math.min(6, Math.max(1, Math.round(self.progress * 5) + 1));
              countNumRef.current.textContent = String(currentNum).padStart(2, '0');
            }
          },
        },
      });

      const bigs = containerRef.current?.querySelectorAll(`.${styles.big}`);
      bigs?.forEach((b) => {
        gsap.fromTo(
          b,
          { x: 120 },
          {
            x: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: b.parentElement,
              containerAnimation: tw,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      const panels = containerRef.current?.querySelectorAll(`.${styles.panel}`);
      panels?.forEach((pn) => {
        gsap.from(pn, {
          rotate: 4,
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: pn,
            containerAnimation: tw,
            start: 'left 105%',
            end: 'left 60%',
            scrub: true,
          },
        });
      });
    });

    mm.add('(max-width: 899px)', () => {
      const panels = containerRef.current?.querySelectorAll(`.${styles.panel}`);
      panels?.forEach((pn) => {
        gsap.from(pn, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pn,
            start: 'top 90%',
          },
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: containerRef });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const pn = e.currentTarget;
    const r = pn.getBoundingClientRect();
    pn.style.setProperty('--mx', `${e.clientX - r.left}px`);
    pn.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section ref={containerRef} id="hs" className={`${styles.hs} slide-over`} style={{ zIndex: 4 }}>
      <div id="services" className={`wrap ${styles.hsHead}`}>
        <div>
          <span className="eyebrow">What we do</span>
          <h2 style={{ marginTop: '14px' }}>
            Six services.<br />
            <span className="gold">One growth engine.</span>
          </h2>
        </div>
        <div className={styles.hsCount}>
          <b ref={countNumRef} id="hsn">01</b> / 06{' '}
          <span className={styles.hsLine}>
            <i ref={lineProgressRef} id="hsl" />
          </span>
        </div>
      </div>
      <div ref={trackRef} className={styles.track} id="track">
        <article className={`${styles.panel} ${styles.intro}`}>
          <span className="eyebrow" style={{ color: '#140e00' }}>
            Drag your scroll →
          </span>
          <h3>Everything your business needs online.</h3>
          <p>Pick one service or let us run the full stack, from first click to repeat customer.</p>
        </article>

        {services.map((svc) => (
          <article
            key={svc.id}
            className={`${styles.panel} panel`}
            onPointerMove={handlePointerMove}
          >
            <div className={`${styles.ic} ic`}>{renderServiceIcon(svc.iconType)}</div>
            <ServiceVisual type={svc.visual} />
            <h3>{svc.title}</h3>
            <p>{svc.shortDesc}</p>
            <div className="tags">
              {svc.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className={styles.big}>{svc.number}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

