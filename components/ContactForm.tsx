'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ContactForm.module.css';

const SERVICES_LIST = [
  'Web Development',
  'AI Automation',
  'AI Chatbots',
  'AI Videos',
  'Video Editing',
  'Social Media Marketing',
  'Graphic Design',
  'Not sure yet',
];

const BUDGET_LIST = [
  'Not sure',
  'Under £1k',
  '£1k – £3k',
  '£3k – £10k',
  '£10k+',
];

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('Not sure');
  const [timeline, setTimeline] = useState('As soon as possible');
  const [msg, setMsg] = useState('');
  const [consent, setConsent] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Read ?service= from URL
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const match = SERVICES_LIST.find(
        (s) => s.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        setSelectedServices([match]);
      }
    }
  }, [searchParams]);

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    const probs: string[] = [];
    const newFieldErrors: { name?: boolean; email?: boolean } = {};

    if (!name.trim()) {
      probs.push('your name');
      newFieldErrors.name = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      probs.push('a valid email');
      newFieldErrors.email = true;
    }
    if (selectedServices.length === 0) {
      probs.push('at least one service');
    }
    if (!consent) {
      probs.push('your agreement to be contacted');
    }

    if (probs.length > 0) {
      setFieldErrors(newFieldErrors);
      setGeneralError(`Please add ${probs.join(', ')}.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          service: selectedServices.join(', '),
          services: selectedServices,
          budget,
          timeline,
          message: msg.trim() || undefined,
          source: 'contact-page',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsDone(true);
      } else {
        setGeneralError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setGeneralError('Network error. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setSelectedServices([]);
    setBudget('Not sure');
    setTimeline('As soon as possible');
    setMsg('');
    setConsent(false);
    setFieldErrors({});
    setGeneralError('');
    setIsDone(false);
  };

  return (
    <div className={`${styles.cformwrap} ar`}>
      {!isDone ? (
        <form className={styles.cform} id="cform" noValidate onSubmit={handleSubmit}>
          <div className={styles.cstep}>
            <span>01</span>
            <h3>About you</h3>
          </div>
          <div className={styles.crow}>
            <div className={`${styles.fld} ${fieldErrors.name ? styles.bad : ''}`}>
              <input
                id="c-name"
                name="name"
                placeholder=" "
                required
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: false }));
                }}
              />
              <label htmlFor="c-name">Full name *</label>
            </div>
            <div className={`${styles.fld} ${fieldErrors.email ? styles.bad : ''}`}>
              <input
                id="c-email"
                name="email"
                type="email"
                placeholder=" "
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: false }));
                }}
              />
              <label htmlFor="c-email">Email address *</label>
            </div>
          </div>
          <div className={styles.crow}>
            <div className={styles.fld}>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                placeholder=" "
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="c-phone">Phone / WhatsApp</label>
            </div>
            <div className={styles.fld}>
              <input
                id="c-company"
                name="company"
                placeholder=" "
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <label htmlFor="c-company">Company or website</label>
            </div>
          </div>

          <div className={styles.cstep}>
            <span>02</span>
            <h3>What do you need?</h3>
          </div>
          <div className={styles.pills} id="c-svc" role="group" aria-label="Services">
            {SERVICES_LIST.map((svc) => (
              <label key={svc} className={styles.pill}>
                <input
                  type="checkbox"
                  name="svc"
                  value={svc}
                  checked={selectedServices.includes(svc)}
                  onChange={() => toggleService(svc)}
                />
                <span>{svc}</span>
              </label>
            ))}
          </div>

          <div className={styles.cstep}>
            <span>03</span>
            <h3>Budget &amp; timeline</h3>
          </div>
          <div className={styles.pills} role="radiogroup" aria-label="Budget">
            {BUDGET_LIST.map((b) => (
              <label key={b} className={styles.pill}>
                <input
                  type="radio"
                  name="bud"
                  value={b}
                  checked={budget === b}
                  onChange={() => setBudget(b)}
                />
                <span>{b}</span>
              </label>
            ))}
          </div>
          <div className={`${styles.fld} ${styles.fsel}`}>
            <select
              id="c-time"
              name="time"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            >
              <option>As soon as possible</option>
              <option>Within a month</option>
              <option>In 1–3 months</option>
              <option>Just exploring</option>
            </select>
            <label htmlFor="c-time">When do you want to start?</label>
          </div>

          <div className={styles.cstep}>
            <span>04</span>
            <h3>Tell us more</h3>
          </div>
          <div className={styles.fld}>
            <textarea
              id="c-msg"
              name="msg"
              placeholder=" "
              rows={5}
              maxLength={1200}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <label htmlFor="c-msg">Your project, goals or problem</label>
            <small className={styles.cnt} id="c-cnt">
              {msg.length} / 1200
            </small>
          </div>

          <label className={styles.consent}>
            <input
              type="checkbox"
              id="c-ok"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>I agree that Webwillfixit can contact me about this enquiry.</span>
          </label>

          {generalError && (
            <p className={styles.cerr} id="c-err" role="alert">
              {generalError}
            </p>
          )}

          <button
            className={`btn btn-gold hov ${styles.csend}`}
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Sending enquiry…' : 'Send enquiry'}</span> →
          </button>
        </form>
      ) : (
        <div className={styles.cdone} id="cdone">
          <div className={styles.tick}>
            <svg viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="24" />
              <path d="M15 27l7 7 15-15" />
            </svg>
          </div>
          <h3>Thanks, {name.split(' ')[0]}!</h3>
          <p>
            We&apos;ve got your enquiry about <b>{selectedServices.join(', ')}</b>. Our team
            replies within one working day to <b>{email}</b>.
          </p>
          <button
            type="button"
            className="btn btn-ghost hov"
            id="c-again"
            onClick={handleReset}
          >
            Send another enquiry
          </button>
        </div>
      )}
    </div>
  );
}

