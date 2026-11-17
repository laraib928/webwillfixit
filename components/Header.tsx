'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import styles from './Header.module.css';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hide, setHide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastYRef = useRef(0);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll detection: solid background + hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setSolid(y > 20);
      setHide(y > lastYRef.current && y > 400 && !menuOpen);
      lastYRef.current = y;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Body scroll lock while mobile menu is open (supports browser + Lenis)
  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const win = window as unknown as {
        __lenis?: { stop: () => void; start: () => void };
      };
      win.__lenis?.stop();

      return () => {
        document.body.style.overflow = originalOverflow || '';
        win.__lenis?.start();
      };
    }
  }, [menuOpen]);

  // Keyboard accessibility: Escape key closes menu and refocuses burger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Reset menu open state if viewport is expanded to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        id="header"
        className={`${styles.header} ${solid ? styles.solid : ''} ${hide ? styles.hide : ''} ${
          menuOpen ? styles.open : ''
        }`}
      >
        <div className={`wrap ${styles.bar}`}>
          <Link
            href="/"
            className={`logo hov ${styles.logoLink}`}
            aria-label="Webwillfixit home"
            onClick={closeMenu}
          >
            <Logo showText={true} />
          </Link>

          <nav className={styles.links} aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                  <span>{link.label}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <Link href="/contact" className={`btn btn-gold hov ${styles.navcta}`}>
              Start a project →
            </Link>
            <button
              ref={burgerRef}
              className={styles.burger}
              id="burger"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={toggleMenu}
            >
              <i />
              <i />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown panel */}
        <div
          id="mobile-nav-menu"
          className={`${styles.mmenu} ${menuOpen ? styles.mmenuOpen : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mlink} ${isActive ? styles.mactive : ''}`}
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                {isActive && <span style={{ color: 'var(--gold)' }}>•</span>}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`btn btn-gold hov ${styles.mcta}`}
            onClick={closeMenu}
          >
            Start a project →
          </Link>
        </div>
      </header>

      {/* Backdrop overlay for closing on tap outside */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
