'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/contact/contact.module.css';

export default function LondonTimeStatus() {
  const [time, setTime] = useState('--:--');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const t = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);

        const parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          weekday: 'short',
          hour: 'numeric',
          hour12: false,
        }).formatToParts(now);

        const wd = parts.find((p) => p.type === 'weekday')?.value || '';
        const h = Number(parts.find((p) => p.type === 'hour')?.value) || 0;
        const open = !['Sat', 'Sun'].includes(wd) && h >= 9 && h < 18;

        setTime(t);
        setIsOpen(open);
      } catch (err) {
        console.error(err);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.cstatus} ${isOpen ? styles.open : ''}`} id="cstatus">
      <i />
      <span>
        London time <b id="ltime">{time}</b>
      </span>
      <em id="lopen">
        {isOpen ? "We're online now" : "Office closed, we'll reply next working day"}
      </em>
    </div>
  );
}

