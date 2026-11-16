import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TeamGrid from '@/components/TeamGrid';
import AboutHeroVisual from '@/components/AboutHeroVisual';
import { founder } from '@/data/team';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About us · UK-led, Expert-built',
  description:
    'Webwillfixit is a UK-registered digital agency combining strategic thinking, creative expertise and skilled technical delivery to build digital solutions that help businesses grow.',
  openGraph: {
    title: 'About us · Webwillfixit',
    description:
      'Webwillfixit is a UK-registered digital agency combining strategic thinking, creative expertise and skilled technical delivery to build digital solutions that help businesses grow.',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <header className={styles.heroSection}>
        <div className={styles.heroGlowLeft} aria-hidden="true" />
        <div className={styles.heroGlowRight} aria-hidden="true" />
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeading}>
              <span className={styles.heroLine}>
                <span className={styles.whiteWord}>UK-led.</span>
              </span>
              <span className={styles.heroLine}>
                <span className="gold">Expert-built.</span>
              </span>
            </h1>
            <p className={styles.heroDesc}>
              Webwillfixit is a UK-registered digital agency combining strategic thinking, creative
              expertise and skilled technical delivery to build digital solutions that help businesses grow.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btn-gold hov">
                Start a project →
              </Link>
              <Link href="/portfolio" className="btn btn-ghost hov">
                Explore our work
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>
                  30<em>+</em> Yrs
                </span>
                <span className={styles.trustLabel}>Leadership Experience</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>
                  100<em>%</em>
                </span>
                <span className={styles.trustLabel}>UK Accountability</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>6</span>
                <span className={styles.trustLabel}>Core Capabilities</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisualCol}>
            <AboutHeroVisual />
          </div>
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
              <div className={styles.fimgWrap}>
                <Image
                  src={founder.image}
                  alt={`${founder.name} - ${founder.role}`}
                  width={640}
                  height={540}
                  priority
                  className={styles.fimg}
                />
                <div className={styles.fimgGlow} aria-hidden="true" />
                <div className={styles.fbadge}>
                  <span className={styles.fbadgeDot} />
                  <span>UK Point of Contact</span>
                </div>
              </div>
              <div className={styles.fmeta}>
                <div>
                  <b className={styles.fname}>{founder.name}</b>
                  <span className={styles.frole}>{founder.role}</span>
                </div>
                <span className={styles.fchip}>🇬🇧 UK-Based</span>
              </div>
            </div>
            <div className={styles.bio}>
              <h2 className="ar" style={{ marginTop: 0, marginBottom: '20px' }}>
                The person you <span className="gold">deal with.</span>
              </h2>
              <div className={styles.bioText}>
                {founder.bio.map((paragraph, i) => (
                  <p key={i} className={`ar ${i === 0 ? styles.leadPara : styles.bodyPara}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={styles.creds}>
                {founder.creds.map((c, i) => (
                  <div key={i} className={`${styles.cred} ar`}>
                    <div className={styles.credTagRow}>
                      <span className={styles.credTag}>{c.tag}</span>
                    </div>
                    <b className={styles.credTitle}>{c.title}</b>
                    <p className={styles.credDesc}>{c.desc}</p>
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
    </div>
  );
}

