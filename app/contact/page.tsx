import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactAside from '@/components/ContactAside';
import LondonTimeStatus from '@/components/LondonTimeStatus';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact us · Let’s Talk About Your Project',
  description:
    'Tell us what you need and we’ll reply within one working day with a clear plan and a fixed quote. No pressure, no jargon.',
  openGraph: {
    title: 'Contact us · Webwillfixit',
    description:
      'Tell us what you need and we’ll reply within one working day with a clear plan and a fixed quote. No pressure, no jargon.',
  },
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <header className="ahero">
        <div className="glowc" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow">Contact us</span>
          <h1>
            <span className="ln"><span>Let&apos;s talk about</span></span>
            <span className="ln"><span className="gold">your project.</span></span>
          </h1>
          <p>
            Tell us what you need and we&apos;ll reply within one working day with a clear plan and a
            fixed quote. No pressure, no jargon.
          </p>
          <LondonTimeStatus />
        </div>
      </header>

      <section className="asec" style={{ paddingTop: '10px' }}>
        <div className={`wrap ${styles.cgrid}`}>
          <Suspense fallback={<div style={{ minHeight: '400px' }}>Loading form…</div>}>
            <ContactForm />
          </Suspense>
          <ContactAside />
        </div>
      </section>

      {/* What happens next */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow ar">What happens next</span>
          <h2 className="ar" style={{ marginTop: '14px' }}>
            Three simple <span className="gold">steps.</span>
          </h2>
          <div className={styles.nsteps}>
            <div className={`${styles.nstep} ar`}>
              <span>1</span>
              <h3>We reply</h3>
              <p>Within one working day, with any questions we have about your project.</p>
            </div>
            <div className={`${styles.nstep} ar`}>
              <span>2</span>
              <h3>Free call</h3>
              <p>A 30-minute call to understand your goals, budget and timeline.</p>
            </div>
            <div className={`${styles.nstep} ar`}>
              <span>3</span>
              <h3>Plan &amp; quote</h3>
              <p>A clear plan and fixed price. Work starts only when you&apos;re happy.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
    </div>
  );
}

