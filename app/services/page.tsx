import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ServicesList from '@/components/ServicesList';
import Faq from '@/components/Faq';
import { packages } from '@/data/packages';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Our Services · Six Services, One Partner for Growth',
  description:
    'Web development, AI automation, chatbots, AI videos, video editing and social media marketing under one roof with UK accountability.',
  openGraph: {
    title: 'Our Services · Webwillfixit',
    description:
      'Web development, AI automation, chatbots, AI videos, video editing and social media marketing under one roof with UK accountability.',
  },
};

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <header className="ahero">
        <div className="glowc" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow">Our services</span>
          <h1>
            <span className="ln"><span>Six services.</span></span>
            <span className="ln"><span className="gold">One partner for growth.</span></span>
          </h1>
          <p>
            Pick a single service or combine them. Everything is planned, built and supported by one
            team, with a UK point of contact.
          </p>
        </div>
      </header>

      <ServicesList />

      {/* Packages */}
      <section className="asec">
        <div className="wrap">
          <span className="eyebrow ar">Packages</span>
          <h2 className="ar" style={{ marginTop: '14px' }}>
            Better <span className="gold">together.</span>
          </h2>
          <p className="ar" style={{ color: 'var(--mute)', maxWidth: '56ch' }}>
            Popular combinations. Every package is quoted to fit your business.
          </p>

          <div className={styles.packs}>
            {packages.map((pack) => (
              <div
                key={pack.id}
                className={`${styles.pack} ${pack.hot ? styles.hot : ''} ar`}
              >
                {pack.hot && <span className={styles.badge2}>Most popular</span>}
                <small>{pack.tier}</small>
                <h3>{pack.title}</h3>
                <p>{pack.desc}</p>
                <ul className="checks">
                  {pack.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${encodeURIComponent(pack.service)}`}
                  className={`btn ${pack.hot ? 'btn-gold' : 'btn-ghost'} hov`}
                  style={{ justifyContent: 'center' }}
                >
                  Get a quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className={`wrap ${styles.split}`}>
          <div className="ar">
            <span className="eyebrow">FAQ</span>
            <h2 style={{ marginTop: '14px' }}>
              Questions we <span className="gold">get asked.</span>
            </h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* Not sure CTA */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className={`${styles.cta} ar`}>
            <div>
              <span className="eyebrow">Not sure what you need?</span>
              <h2 style={{ margin: '14px 0' }}>
                Tell us the problem. <span className="gold">We&apos;ll fix it.</span>
              </h2>
              <p>
                Book a free call and we&apos;ll suggest the right mix of services for your goals and
                budget.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-gold hov">
                Book a free call →
              </Link>
              <Link href="/about" className="btn btn-ghost hov">
                About us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

