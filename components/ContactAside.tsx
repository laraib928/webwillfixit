'use client';

import React from 'react';
import styles from '@/app/contact/contact.module.css';

export default function ContactAside() {
  const handleOpenChat = () => {
    if (typeof window !== 'undefined') {
      const w = window as unknown as { openChat?: () => void };
      w.openChat?.();
    }
  };

  return (
    <aside className={styles.cside}>
      <div className={`${styles.ccard} ar`}>
        <span className={styles.cic}>
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </span>
        <div>
          <small>EMAIL</small>
          <b className={styles.ph}>Business email</b>
          <em>Add your email address</em>
        </div>
      </div>

      <div className={`${styles.ccard} ar`}>
        <span className={styles.cic}>
          <svg viewBox="0 0 24 24">
            <path d="M21 12a9 9 0 0 1-13.4 7.9L3 21l1.2-4.4A9 9 0 1 1 21 12z" />
            <path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.2-1.2 1.8.8-.3 1.6c-3.7.4-7.6-3.5-7.2-7.2l1.6-.3.8 1.8z" />
          </svg>
        </span>
        <div>
          <small>WHATSAPP</small>
          <b className={styles.ph}>UK number</b>
          <em>Add your WhatsApp number</em>
        </div>
      </div>

      <div className={`${styles.ccard} ar`}>
        <span className={styles.cic}>
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
        </span>
        <div>
          <small>REGISTERED OFFICE</small>
          <b>United Kingdom</b>
          <em>Full address after registration</em>
        </div>
      </div>

      <div className={`${styles.ccard} ar`}>
        <span className={styles.cic}>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <div>
          <small>OPENING HOURS</small>
          <b>Mon – Fri, 9am – 6pm</b>
          <em>UK time · replies within 1 working day</em>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.ccard} ${styles.cchat} ar`}
        id="c-chat"
        onClick={handleOpenChat}
      >
        <span className={styles.cic}>
          <svg viewBox="0 0 24 24">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          </svg>
        </span>
        <div>
          <small>NEED A QUICK ANSWER?</small>
          <b>Chat with our assistant</b>
          <em>Instant replies, 24/7</em>
        </div>
        <span className={styles.carr}>→</span>
      </button>
    </aside>
  );
}

