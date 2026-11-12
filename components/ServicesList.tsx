'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import ServiceIndex from '@/components/ServiceIndex';
import { renderServiceIcon } from '@/components/HorizontalServices';
import { services } from '@/data/services';
import styles from '@/app/services/services.module.css';

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const nums = containerRef.current?.querySelectorAll(`.${styles.svcNum}`);
      nums?.forEach((num) => {
        const parent = num.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * -0.15;
        (num as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJump = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const win = window as unknown as {
      __lenis?: {
        scrollTo: (
          target: HTMLElement | number,
          opts?: { offset?: number; duration?: number; immediate?: boolean }
        ) => void;
      };
    };

    if (win.__lenis && typeof win.__lenis.scrollTo === 'function') {
      win.__lenis.scrollTo(target, { offset: -110 });
    } else {
      const yOffset = -110;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="asec" style={{ paddingTop: '10px' }}>
      <div className="wrap" style={{ marginBottom: '36px' }}>
        <div className={styles.chips}>
          {services.map((svc) => (
            <button
              key={svc.id}
              type="button"
              className={styles.chipbtn}
              onClick={() => handleJump(svc.id)}
            >
              {svc.title}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className={`wrap ${styles.svcWrap}`}>
        <ServiceIndex onSelect={handleJump} />

        <div className={styles.svcList}>
          {services.map((svc) => (
            <article key={svc.id} className={`${styles.svc} ar`} id={svc.id}>
              <span className={styles.svcNum} aria-hidden="true">
                {svc.number}
              </span>
              <div className={styles.svcTop}>
                <div className={styles.ic}>{renderServiceIcon(svc.iconType)}</div>
                <small>SERVICE {svc.number}</small>
              </div>
              <h2>{svc.title}</h2>
              <p className={styles.svcLead}>{svc.lead}</p>
              <p className={styles.svcBody}>{svc.body}</p>

              <div className={styles.svcGrid}>
                <div>
                  <h4>What&apos;s included</h4>
                  <ul className="checks">
                    {svc.included.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.svcSide}>
                  <div>
                    <h4>Tools we use</h4>
                    <div className="tags">
                      {svc.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.svcFacts}>
                    <div>
                      <small>IDEAL FOR</small>
                      <b>{svc.idealFor}</b>
                    </div>
                    <div>
                      <small>TYPICAL TIMELINE</small>
                      <b>{svc.timeline}</b>
                    </div>
                  </div>
                  <Link
                    href={`/contact?service=${encodeURIComponent(svc.title)}`}
                    className="btn btn-gold hov"
                  >
                    Get a quote →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
