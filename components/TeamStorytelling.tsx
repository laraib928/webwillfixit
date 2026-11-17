'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { teamMembers, TeamMember } from '@/data/team';
import styles from './TeamStorytelling.module.css';

export default function TeamStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePerson, setActivePerson] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const isDesk = window.innerWidth >= 1024;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(isDesk);
      setReducedMotion(motion);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (!isDesktop || reducedMotion || !trackRef.current) {
        // Simple fade-up animation for mobile cards
        const mobileCards = containerRef.current?.querySelectorAll(`.${styles.mobileCard}`);
        if (mobileCards && mobileCards.length > 0) {
          gsap.from(mobileCards, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
          });
        }
        return;
      }

      const slides = trackRef.current.querySelectorAll<HTMLElement>(`.${styles.desktopSlide}`);
      const numbers = trackRef.current.querySelectorAll<HTMLElement>(`.${styles.bgNumber}`);
      if (slides.length !== 3) return;

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActivePerson(0);
            } else if (p < 0.67) {
              setActivePerson(1);
            } else {
              setActivePerson(2);
            }
          },
        },
      });

      // Total timeline duration = 3.0 (1.0 per person)
      slides.forEach((slide, idx) => {
        const imageCard = slide.querySelector<HTMLElement>(`.${styles.imageCard}`);
        const imagePhoto = slide.querySelector<HTMLElement>(`.${styles.imagePhoto}`);
        const textContent = slide.querySelector<HTMLElement>(`.${styles.textContent}`);
        const bgNum = numbers[idx];
        const isLeft = idx % 2 === 0;
        const actStart = idx * 1.0;

        // Slide overall visibility
        if (idx === 0) {
          gsap.set(slide, { autoAlpha: 1 });
          gsap.set(bgNum, { autoAlpha: 1 });
        } else {
          gsap.set(slide, { autoAlpha: 0 });
          gsap.set(bgNum, { autoAlpha: 0 });
          masterTimeline.to(slide, { autoAlpha: 1, duration: 0.1 }, actStart);
          masterTimeline.to(bgNum, { autoAlpha: 1, duration: 0.15 }, actStart);
        }

        // Image Entrance (actStart -> actStart + 0.22)
        if (imageCard) {
          masterTimeline.fromTo(
            imageCard,
            {
              clipPath: 'inset(100% 0 0 0)',
              scale: 1.08,
              autoAlpha: 0,
              x: isLeft ? -28 : 28,
            },
            {
              clipPath: 'inset(0% 0 0 0)',
              scale: 1.0,
              autoAlpha: 1,
              x: 0,
              duration: 0.22,
              ease: 'power2.out',
            },
            actStart
          );

          // Parallax float & slow zoom during text scroll (actStart + 0.22 -> actStart + 0.8)
          if (imagePhoto) {
            masterTimeline.fromTo(
              imagePhoto,
              { y: -10, scale: 1.0 },
              {
                y: 10,
                scale: 1.06,
                duration: 0.58,
                ease: 'none',
              },
              actStart + 0.22
            );
          }

          // Image Exit (actStart + 0.8 -> actStart + 1.0)
          if (idx < slides.length - 1) {
            masterTimeline.to(
              imageCard,
              {
                clipPath: 'inset(0 0 100% 0)',
                autoAlpha: 0,
                x: isLeft ? -20 : 20,
                duration: 0.2,
                ease: 'power2.in',
              },
              actStart + 0.8
            );

            // Hide slide & number at end of act
            masterTimeline.to(slide, { autoAlpha: 0, duration: 0.05 }, actStart + 0.98);
            masterTimeline.to(bgNum, { autoAlpha: 0, duration: 0.15 }, actStart + 0.85);
          }
        }

        // Text continuous upward translation (actStart + 0.05 -> actStart + 0.95)
        if (textContent) {
          masterTimeline.fromTo(
            textContent,
            { y: '52vh' },
            {
              y: '-52vh',
              duration: 0.9,
              ease: 'none',
            },
            actStart + 0.05
          );
        }
      });
    },
    { scope: containerRef, dependencies: [isDesktop, reducedMotion] }
  );

  const scrollToPerson = (index: number) => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const trackTop = trackRect.top + scrollTop;
    const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
    const targetY = trackTop + (index / 2) * trackHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className={styles.storytellingRoot}>
      {/* Desktop Scroll-Driven Storytelling Stage */}
      <div ref={trackRef} className={styles.desktopTrack}>
        <div className={styles.stickyStage}>
          {/* Ambient Background Glow */}
          <div className={styles.stageGlow} aria-hidden="true" />

          {/* Background Outline Numbers (01, 02, 03) */}
          <div className={styles.bgNumberContainer} aria-hidden="true">
            <span className={`${styles.bgNumber} ${styles.num1}`}>01</span>
            <span className={`${styles.bgNumber} ${styles.num2}`}>02</span>
            <span className={`${styles.bgNumber} ${styles.num3}`}>03</span>
          </div>

          {/* Vertical Progress Indicator Dots */}
          <nav className={styles.progressNav} aria-label="Team member scroll navigation">
            {teamMembers.map((member, i) => (
              <button
                key={member.name}
                type="button"
                className={`${styles.progressDot} ${activePerson === i ? styles.dotActive : ''}`}
                onClick={() => scrollToPerson(i)}
                aria-label={`Jump to ${member.name}`}
                aria-current={activePerson === i ? 'true' : 'false'}
              >
                <span className={styles.dotPill} />
                <span className={styles.dotTooltip}>{member.name}</span>
              </button>
            ))}
          </nav>

          {/* Slides */}
          <div className={styles.slidesContainer}>
            {teamMembers.map((member, i) => {
              const isImageLeft = i % 2 === 0;

              return (
                <div
                  key={member.name}
                  className={`${styles.desktopSlide} ${isImageLeft ? styles.layoutNormal : styles.layoutMirrored}`}
                >
                  <div className={`wrap ${styles.stageGrid}`}>
                    {/* Image Column */}
                    <div className={styles.imageColumn}>
                      <div className={styles.imageCard}>
                        <div className={styles.photoContainer}>
                          <Image
                            src={member.image}
                            alt={member.alt}
                            width={640}
                            height={800}
                            priority={i === 0}
                            className={styles.imagePhoto}
                          />
                          <div className={styles.photoGlow} aria-hidden="true" />
                          <div className={styles.photoBorder} aria-hidden="true" />
                        </div>
                        <div className={styles.photoMeta}>
                          <span className={styles.metaNumber}>0{i + 1}</span>
                          <span className={styles.metaRole}>{member.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* Text Column with Gradient Masks */}
                    <div className={styles.textColumn}>
                      <div className={styles.textViewport}>
                        <div className={styles.textContent}>
                          <span className={styles.textEyebrow}>0{i + 1} · Core Engineering</span>
                          <h3 className={styles.personName}>{member.name}</h3>
                          <div className={styles.personRole}>{member.role}</div>

                          <p className={styles.personIntro}>{member.intro}</p>

                          <div className={styles.highlightsBox}>
                            <h4 className={styles.highlightsTitle}>Key Contributions &amp; Scope</h4>
                            <ul className={styles.highlightsList}>
                              {member.highlights.map((h, hIdx) => (
                                <li key={hIdx} className={styles.highlightItem}>
                                  <span className={styles.highlightBullet} aria-hidden="true">
                                    ✦
                                  </span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.chipsContainer}>
                            {member.chips.map((chip) => (
                              <span key={chip} className={styles.skillChip}>
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Stacked Card Layout (Hidden on Desktop >= 1024px) */}
      <div className={`wrap ${styles.mobileTrack}`}>
        {teamMembers.map((member, i) => (
          <article key={member.name} className={styles.mobileCard}>
            <div className={styles.mobilePhotoContainer}>
              <Image
                src={member.image}
                alt={member.alt}
                width={640}
                height={760}
                className={styles.mobilePhoto}
              />
              <div className={styles.photoGlow} aria-hidden="true" />
              <div className={styles.photoBorder} aria-hidden="true" />
              <div className={styles.mobileBadge}>0{i + 1}</div>
            </div>

            <div className={styles.mobileContent}>
              <h3 className={styles.mobileName}>{member.name}</h3>
              <div className={styles.mobileRole}>{member.role}</div>
              <p className={styles.mobileIntro}>{member.intro}</p>

              <div className={styles.mobileHighlightsBox}>
                <h4 className={styles.mobileHighlightsTitle}>Key Contributions</h4>
                <ul className={styles.highlightsList}>
                  {member.highlights.map((h, hIdx) => (
                    <li key={hIdx} className={styles.highlightItem}>
                      <span className={styles.highlightBullet} aria-hidden="true">
                        ✦
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.chipsContainer}>
                {member.chips.map((chip) => (
                  <span key={chip} className={styles.skillChip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
