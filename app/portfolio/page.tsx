import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';
import styles from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Portfolio · Work That Speaks for Itself',
  description:
    'Real products and websites built by Webwillfixit: Postly, Bits’N’Bobs, AI & Digital Division, Viralzy, TIMERA Watches and AI chatbots.',
  openGraph: {
    title: 'Portfolio · Webwillfixit',
    description:
      'Real products and websites built by Webwillfixit: Postly, Bits’N’Bobs, AI & Digital Division, Viralzy, TIMERA Watches and AI chatbots.',
  },
};

export default function PortfolioPage() {
  return (
    <div id="portfolio" className={styles.portfolioPage}>
      <header className="ahero">
        <div className="glowc" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow">Portfolio</span>
          <h1>
            <span className="ln"><span>Work that</span></span>
            <span className="ln"><span className="gold">speaks for itself.</span></span>
          </h1>
          <p>
            Real products and websites we have built, from automation platforms to e-commerce
            stores. Tap any project to see the problem and how we solved it.
          </p>
        </div>
      </header>

      <section className="asec" style={{ paddingTop: '10px' }}>
        <div className="wrap">
          <PortfolioGrid />
        </div>
      </section>

      {/* Next project CTA */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className={`${styles.cta} ar`}>
            <div>
              <span className="eyebrow">Your project next</span>
              <h2 style={{ margin: '14px 0' }}>
                Want results like <span className="gold">these?</span>
              </h2>
              <p>Tell us what you&apos;re working on and we&apos;ll send a plan within one working day.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-gold hov">
                Start a project →
              </Link>
              <Link href="/services" className="btn btn-ghost hov">
                See services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
    </div>
  );
}

