'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './WorkStack.module.css';

export default function WorkStack() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current.querySelectorAll(`.${styles.wcard}`);
    cards.forEach((c, i) => {
      const artInner = c.querySelector(`.${styles.artInner}`);
      const art = c.querySelector(`.${styles.art}`);

      if (artInner) {
        gsap.fromTo(
          artInner,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: c,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (art) {
        gsap.from(art, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: c,
            start: 'top 80%',
          },
        });
      }

      if (i < cards.length - 1) {
        gsap.to(c, {
          scale: 0.9,
          opacity: 0.35,
          filter: 'blur(2px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top 110px',
            scrub: true,
          },
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="sec after" id="work">
      <div className="wrap">
        <div className={styles.head2}>
          <div>
            <span className="eyebrow">Sample work</span>
            <h2 style={{ marginTop: '14px' }}>
              Things we <span className="gold">build.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="btn btn-ghost hov">
            View full portfolio →
          </Link>
        </div>

        <div className={styles.stack} id="stack">
          {/* Card 1: Postly */}
          <article className={styles.wcard}>
            <div className={styles.info}>
              <div>
                <span className={styles.category}>AUTOMATION · SAAS</span>
                <h3>Postly: post everywhere, automatically</h3>
              </div>
              <p>
                Social media automation platform that schedules and publishes to Facebook,
                Instagram, LinkedIn, YouTube, TikTok and Pinterest.
              </p>
              <Link
                href="/portfolio"
                className="btn btn-ghost hov"
                style={{ alignSelf: 'flex-start' }}
              >
                View project →
              </Link>
            </div>
            <div className={styles.art}>
              <div className={`${styles.artInner} ${styles.a1}`}>
                <div className="wart">
                  <div className="pa-postly">
                    <div className="pp-side">
                      <b>Postly</b>
                      <i className="on" />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="pp-main">
                      <div className="pp-head">
                        <span>New post</span>
                        <em>Scheduled ✓</em>
                      </div>
                      <div className="pp-plat">
                        <span>f</span>
                        <span>IG</span>
                        <span>in</span>
                        <span>▶</span>
                        <span>♪</span>
                        <span>P</span>
                      </div>
                      <div className="pp-cap">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="pp-cal">
                        <i />
                        <i className="g" />
                        <i />
                        <i className="g" />
                        <i />
                        <i />
                        <i className="g" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: AI & Digital Division */}
          <article className={styles.wcard}>
            <div className={styles.info}>
              <div>
                <span className={styles.category}>WEB · CORPORATE</span>
                <h3>AI &amp; Digital Division website</h3>
              </div>
              <p>
                Animated agency website presenting nine service areas across Pakistan and Saudi
                Arabia.
              </p>
              <Link
                href="/portfolio"
                className="btn btn-ghost hov"
                style={{ alignSelf: 'flex-start' }}
              >
                View project →
              </Link>
            </div>
            <div className={styles.art}>
              <div className={`${styles.artInner} ${styles.a2}`}>
                <div className="wart">
                  <div className="pa-site cni">
                    <div className="bw">
                      <i />
                      <i />
                      <i />
                      <span>aidigitaldivision.com</span>
                    </div>
                    <div className="cn-hero">
                      <small>AI &amp; DIGITAL DIVISION</small>
                      <b>
                        Where Intelligence
                        <br />
                        Meets Growth.
                      </b>
                      <div className="cn-btn">
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="cn-nodes">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3: Bits'N'Bobs */}
          <article className={styles.wcard}>
            <div className={styles.info}>
              <div>
                <span className={styles.category}>E-COMMERCE · SHOPIFY</span>
                <h3>Bits&apos;N&apos;Bobs wholesale store</h3>
              </div>
              <p>Shopify store for a UK wholesaler serving 10,000+ independent retailers.</p>
              <Link
                href="/portfolio"
                className="btn btn-ghost hov"
                style={{ alignSelf: 'flex-start' }}
              >
                View project →
              </Link>
            </div>
            <div className={styles.art}>
              <div className={`${styles.artInner} ${styles.a3}`}>
                <div className="wart">
                  <div className="pa-site bnb">
                    <div className="bw">
                      <i />
                      <i />
                      <i />
                      <span>bitsnbobs.co</span>
                    </div>
                    <div className="bb-bar">
                      <b>Bits&apos;N&apos;Bobs</b>
                      <span>Wholesale</span>
                    </div>
                    <div className="bb-cats">
                      <span>Cosmetics</span>
                      <span>DIY</span>
                      <span>First Aid</span>
                      <span>Hardware</span>
                      <span>Household</span>
                      <span>Stationery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 4: Viralzy */}
          <article className={styles.wcard}>
            <div className={styles.info}>
              <div>
                <span className={styles.category}>WEB APP · CONTENT</span>
                <h3>Viralzy</h3>
              </div>
              <p>Content discovery platform to find, filter and transcribe viral videos.</p>
              <Link
                href="/portfolio"
                className="btn btn-ghost hov"
                style={{ alignSelf: 'flex-start' }}
              >
                View project →
              </Link>
            </div>
            <div className={styles.art}>
              <div className={`${styles.artInner} ${styles.a4}`}>
                <div className="wart">
                  <div className="pa-site vz">
                    <div className="bw">
                      <i />
                      <i />
                      <i />
                      <span>viralzy.com</span>
                    </div>
                    <div className="vz-top">
                      <b>Viralzy</b>
                      <div className="vz-search">Search viral videos…</div>
                    </div>
                    <div className="vz-chips">
                      <span className="on">Filter videos</span>
                      <span>Transcribe</span>
                      <span>Saved</span>
                    </div>
                    <div className="vz-grid">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

