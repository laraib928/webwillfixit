'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { services } from '@/data/services';
import styles from './ServiceIndex.module.css';

interface ServiceIndexProps {
  onSelect?: (id: string) => void;
}

export default function ServiceIndex({ onSelect }: ServiceIndexProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateActiveIndex = () => {
      const threshold = window.innerHeight * 0.45;
      let current = 0;

      for (let i = 0; i < services.length; i++) {
        const el = document.getElementById(services[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = i;
        }
      }

      setActiveIndex(current);
    };

    updateActiveIndex();

    // ScrollTrigger update hook (integrates with Lenis smooth scroll)
    const st = ScrollTrigger.create({
      onUpdate: updateActiveIndex,
    });

    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      st.kill();
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, { scope: navRef });

  const handleJump = (id: string, index: number) => {
    setActiveIndex(index);
    onSelect?.(id);

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
    <nav ref={navRef} className={styles.svcIndex} aria-label="Services">
      {services.map((svc, i) => (
        <button
          key={svc.id}
          type="button"
          className={activeIndex === i ? styles.on : ''}
          onClick={() => handleJump(svc.id, i)}
        >
          <span>{svc.number}</span>
          {svc.title}
        </button>
      ))}
      <div className={styles.svcIdxBar}>
        <i
          id="sidx"
          style={{
            transform: `translateY(${activeIndex * 100}%)`,
          }}
        />
      </div>
    </nav>
  );
}
