'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  const handleScrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    const win = window as unknown as {
      __lenis?: {
        scrollTo: (target: number, opts?: { duration?: number; immediate?: boolean }) => void;
      };
    };

    if (win.__lenis && typeof win.__lenis.scrollTo === 'function') {
      win.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Link href="/" className="ft-logo" aria-label="Webwillfixit home">
              <Logo width={230} height={49} />
            </Link>
            <p>
              A UK-led digital agency building websites, AI automation, chatbots, videos and
              social media that grow your business.
            </p>
            <div className="ft-social">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Webwillfixit on Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M14 8.5V6.8c0-.8.5-1.3 1.3-1.3H17V2.3h-2.6C11.7 2.3 10.5 4 10.5 6.4v2.1H8v3.2h2.5V22h3.5V11.7h2.6l.4-3.2z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Webwillfixit on Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="ft-col" role="navigation" aria-label="Pages">
            <h4>Company</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="ft-col" role="navigation" aria-label="Services">
            <h4>Services</h4>
            <Link href="/services">Web Development</Link>
            <Link href="/services">AI Automation</Link>
            <Link href="/services">AI Chatbots</Link>
            <Link href="/services">AI Videos</Link>
            <Link href="/services">Video Editing</Link>
            <Link href="/services">Social Media Marketing</Link>
          </div>

          <div className="ft-col">
            <h4>Get in touch</h4>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              style={{ color: 'var(--fg)', fontWeight: 600 }}
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.displayEmail}`}
              style={{ color: 'var(--mute)' }}
            >
              {siteConfig.displayEmail}
            </a>
            <span>{siteConfig.responseTime}</span>
            <Link href="/contact" className="btn btn-gold hov ft-cta">
              Start a project →
            </Link>
          </div>
        </div>

        <div className="ft-word-wrap" style={{ overflow: 'hidden', width: '100%' }}>
          <div className="ft-word" aria-hidden="true">
            Webwillfixit
          </div>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Webwillfixit. All rights reserved.</span>
          <div className="ft-follow">
            Follow us{' '}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <button
            type="button"
            className="ft-up"
            onClick={handleScrollToTop}
            data-top
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
