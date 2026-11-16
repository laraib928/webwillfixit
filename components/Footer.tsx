'use client';

import React from 'react';
import Link from 'next/link';
import { LogoMark } from '@/components/Logo';
import { site } from '@/data/site';

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
              <LogoMark />
              <span>
                <b>
                  Web<em>will</em>fixit
                </b>
                <small>
                  <i></i>Complete Digital Solutions<i></i>
                </small>
              </span>
            </Link>
            <p>
              A UK-led digital agency building websites, AI automation, chatbots, videos and
              social media that grow your business.
            </p>
            <div className="ft-social">
              <a
                href={site.social.facebook}
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
                href={site.social.instagram}
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
            <span>United Kingdom</span>
            <span>Mon – Fri, 9am – 6pm (UK)</span>
            <span>Replies within 1 working day</span>
            <Link href="/contact" className="btn btn-gold hov ft-cta">
              Start a project →
            </Link>
          </div>
        </div>

        <div className="ft-word" aria-hidden="true">
          Webwillfixit
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Webwillfixit. All rights reserved.</span>
          <div className="ft-follow">
            Follow us{' '}
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
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
