'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './BigCta.module.css';

export default function BigCta() {
  const containerRef = useRef<HTMLElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const ctaBoxRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Web Development');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg: string; isError?: boolean }>({
    show: false,
    msg: '',
  });

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    if (giantRef.current) {
      gsap.fromTo(
        giantRef.current,
        { xPercent: 25, scale: 0.85 },
        {
          xPercent: -12,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }

    if (ctaBoxRef.current) {
      gsap.from(ctaBoxRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaBoxRef.current,
          start: 'top 88%',
        },
      });
    }
  }, { scope: containerRef });

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, msg: message, isError });
    setTimeout(() => {
      setToast({ show: false, msg: '', isError: false });
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service,
          message: msg.trim(),
          source: 'home-cta',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Message sent! We will reply within one working day.');
        setName('');
        setEmail('');
        setMsg('');
      } else {
        showToast(data.error || 'Failed to send message. Please try again.', true);
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please try again or email us directly.', true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={containerRef} id="contact" className={`after ${styles.section}`}>
      <div ref={giantRef} className={styles.giant} id="giant">
        Let&apos;s <span className="gold">fix it.</span>
      </div>
      <div className="wrap">
        <div ref={ctaBoxRef} className={styles.cta}>
          <div>
            <span className="eyebrow">Let&apos;s talk</span>
            <h2 style={{ margin: '14px 0' }}>
              Got a problem?<br />
              <span className="gold">Web will fix it.</span>
            </h2>
            <p>Tell us what you need. We reply with a plan and a quote within one working day.</p>
          </div>
          <form id="f" onSubmit={handleSubmit}>
            <input
              id="name"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              id="service"
              aria-label="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>Web Development</option>
              <option>AI Automation</option>
              <option>AI Chatbots</option>
              <option>AI Videos</option>
              <option>Video Editing</option>
              <option>Social Media Marketing</option>
            </select>
            <textarea
              id="msg"
              placeholder="Tell us about your project"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              className="btn btn-gold hov"
              type="submit"
              disabled={loading}
              style={{ justifyContent: 'center' }}
            >
              {loading ? 'Sending…' : 'Send message →'}
            </button>
          </form>
        </div>
      </div>

      <div
        id="toast"
        className={`${styles.toast} ${toast.show ? styles.on : ''} ${toast.isError ? styles.error : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast.msg}
      </div>
    </section>
  );
}

