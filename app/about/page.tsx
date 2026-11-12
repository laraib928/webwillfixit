import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import TeamGrid from '@/components/TeamGrid';
import Footer from '@/components/Footer';
import { founder } from '@/data/team';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About us · UK-led, Expert-built',
  description:
    'Webwillfixit is a digital agency being registered in the United Kingdom. Meet our founder and skilled team delivering web, AI and creative solutions.',
  openGraph: {
    title: 'About us · Webwillfixit',
    description:
      'Webwillfixit is a digital agency being registered in the United Kingdom. Meet our founder and skilled team delivering web, AI and creative solutions.',
  },
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <header className="ahero">
        <div className="glowc" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow">About us</span>
          <h1>
            <span className="ln"><span>UK-led.</span></span>
            <span className="ln"><span className="gold">Expert-built.</span></span>
          </h1>
          <p>
            Webwillfixit is a digital agency being registered in the United Kingdom. You get a UK
            point of contact you can trust and a skilled team of developers, AI engineers,
            editors and marketers doing the work.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="asec">
        <div className={`wrap ${styles.split}`}>
          <div className="ar">
            <span className="eyebrow">Our story</span>
            <h2 style={{ marginTop: '14px' }}>
              Why we <span className="gold">exist.</span>
            </h2>
          </div>
          <div className="ar">
            <p>
              Most small businesses deal with five different suppliers: one for the website, one
              for ads, one for videos, and nobody for automation. Things fall through the gaps and
              budgets disappear.
            </p>
            <p>
              We started Webwillfixit to be the one partner that handles all of it. A UK point of
              contact who understands your market, backed by a skilled development and creative
              team that delivers fast.
            </p>
            <p>
              Our name is our promise. If something in your digital world is broken, slow or
              missing, we fix it.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow ar">Meet the founder</span>
          <div className={styles.founder}>
            <div className={`${styles.fcard} ar`}>
              <div className={styles.fimg}>
                <span className={`gold ${styles.mono}`}>{founder.initials}</span>
                <small>Professional photo coming soon</small>
              </div>
              <div className={styles.fmeta}>
                <b>{founder.name}</b>
                <span>{founder.role}</span>
              </div>
            </div>
            <div className={styles.bio}>
              <h2 className="ar" style={{ marginBottom: '22px' }}>
                The person you <span className="gold">deal with.</span>
              </h2>
              {founder.bio.map((paragraph, i) => (
                <p key={i} className="ar">
                  {paragraph}
                </p>
              ))}
              <div className={styles.creds}>
                {founder.creds.map((c, i) => (
                  <div key={i} className={`${styles.cred} ar`}>
                    <small>{c.tag}</small>
                    <b>{c.title}</b>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow ar">The team</span>
          <h2 className="ar" style={{ marginTop: '14px' }}>
            The people who <span className="gold">build it.</span>
          </h2>
          <p className="ar" style={{ color: 'var(--mute)', maxWidth: '56ch' }}>
            The engineers, marketers and designers who do the hands-on work behind every project.
          </p>
          <TeamGrid />
        </div>
      </section>

      {/* Values */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow ar">What we stand for</span>
          <div className={styles.vals}>
            <div className={`${styles.val} ar`}>
              <b>Honest pricing</b>
              <p>Clear quotes before we start. No hidden extras.</p>
            </div>
            <div className={`${styles.val} ar`}>
              <b>One team</b>
              <p>Web, AI, video and marketing that work together.</p>
            </div>
            <div className={`${styles.val} ar`}>
              <b>Real results</b>
              <p>We measure leads, sales and time saved, not just likes.</p>
            </div>
            <div className={`${styles.val} ar`}>
              <b>Long-term care</b>
              <p>Support and improvements after launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Model */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow ar">How we&apos;re set up</span>
          <h2 className="ar" style={{ marginTop: '14px' }}>
            UK accountability. <span className="gold">Global delivery.</span>
          </h2>
          <div className={styles.model}>
            <div className={`${styles.mbox} ar`}>
              <small>UNITED KINGDOM</small>
              <b>Client relations</b>
              <p>UK-registered company. Contracts, invoicing and your main point of contact.</p>
            </div>
            <div className={styles.marrow} aria-hidden="true">
              ⇄
            </div>
            <div className={`${styles.mbox} ar`}>
              <small>DELIVERY STUDIO</small>
              <b>Build &amp; create</b>
              <p>Developers, AI engineers, editors and designers working across time zones.</p>
            </div>
          </div>
          <div className={`${styles.cdet} ar`}>
            <div>
              <small>REGISTERED IN</small>
              <b>England &amp; Wales</b>
              <em>Registration in progress</em>
            </div>
            <div>
              <small>COMPANY NUMBER</small>
              <b>—</b>
              <em>Added after registration</em>
            </div>
            <div>
              <small>REGISTERED OFFICE</small>
              <b>—</b>
              <em>Added after registration</em>
            </div>
          </div>
        </div>
      </section>

      {/* Work with us CTA */}
      <section className="asec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className={`${styles.cta} ar`}>
            <div>
              <span className="eyebrow">Work with us</span>
              <h2 style={{ margin: '14px 0' }}>
                Let&apos;s build something <span className="gold">that lasts.</span>
              </h2>
              <p>Tell us about your business and we&apos;ll send a plan within one working day.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-gold hov">
                Start a project →
              </Link>
              <Link href="/" className="btn btn-ghost hov">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
    </div>
  );
}

