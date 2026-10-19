'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from './icons';

const NAV = [
  { href: '/#how', label: 'How it works' },
  { href: '/#plans', label: 'Plans' },
  { href: '/safety', label: 'Safety' },
  { href: '/#faq', label: 'FAQ' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Header: add a hairline once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: close on Escape, and when the viewport grows to desktop.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen((wasOpen) => {
          if (wasOpen) toggleRef.current?.focus();
          return false;
        });
      }
    };
    const onDesktop = () => setOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, []);

  return (
    <motion.header
      className={`site-header${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Open Plans home">
          <Image src="/open-plans-logo.svg" alt="Open Plans" width={69} height={42} preload unoptimized />
        </Link>
        <nav className={`nav${open ? ' open' : ''}`} id="site-nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary header-cta" href="/#download">Get the app</Link>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="menu" className="icon-open" />
          <Icon name="close" className="icon-close" />
        </button>
      </div>
    </motion.header>
  );
}
