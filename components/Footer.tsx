import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  variant?: 'full' | 'simple';
  style?: React.CSSProperties;
}

export default function Footer({ variant = 'full', style }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer
      className={`after ${styles.footer}`}
      style={{
        marginTop: variant === 'simple' ? '40px' : '110px',
        ...style,
      }}
    >
      <div className={`wrap ${styles.wrap}`}>
        {variant === 'full' ? (
          <>
            <Link href="/" className={`logo ${styles.logo}`} aria-label="Webwillfixit home">
              Web<span className="gold">will</span>fixit
            </Link>
            <span>Complete Digital Solutions · © {currentYear}</span>
          </>
        ) : (
          <>
            <span>Webwillfixit · Complete Digital Solutions</span>
            <span>© {currentYear}</span>
          </>
        )}
      </div>
    </footer>
  );
}

