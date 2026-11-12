import React from 'react';
import { faqs } from '@/data/faq';
import styles from './Faq.module.css';

export default function Faq() {
  return (
    <div className={styles.faq}>
      {faqs.map((faq, index) => (
        <details key={index} className="ar">
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

