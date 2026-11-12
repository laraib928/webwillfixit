'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [hide, setHide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    // Close mobile menu on route change
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHide(y > lastYRef.current && y > 400 && !menuOpen);
      lastYRef.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      id="nav"
      className={`${styles.nav} ${solid ? styles.solid : ''} ${hide ? styles.hide : ''}`}
    >
      <div className={`wrap ${styles.wrap}`}>
        <Link href="/" className="logo hov" aria-label="Webwillfixit home">
          <Logo showText={true} />
        </Link>
        <div className={styles.links}>
          <Link href="/about">
            <span>About us</span>
            <span>About us</span>
          </Link>
          <Link href="/services">
            <span>Services</span>
            <span>Services</span>
          </Link>
          <Link href="/portfolio">
            <span>Portfolio</span>
            <span>Portfolio</span>
          </Link>
          <Link href="/contact">
            <span>Contact</span>
            <span>Contact</span>
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/contact" className={`btn btn-gold hov ${styles.navcta}`}>
            Start a project →
          </Link>
          <button
            className={styles.burger}
            id="burger"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mmenu"
            onClick={toggleMenu}
          >
            <i />
            <i />
          </button>
        </div>
      </div>
      <div className={styles.mmenu} id="mmenu" hidden={!menuOpen}>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About us
        </Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>
          Services
        </Link>
        <Link href="/portfolio" onClick={() => setMenuOpen(false)}>
          Portfolio
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <Link
          href="/contact"
          className="btn btn-gold"
          style={{ justifyContent: 'center', marginTop: '8px' }}
          onClick={() => setMenuOpen(false)}
        >
          Start a project →
        </Link>
      </div>
    </nav>
  );
}

