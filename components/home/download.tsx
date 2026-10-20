'use client';

import { motion } from 'framer-motion';
import { Reveal } from '../reveal';
import { StoreButtons } from '../store-buttons';

export function Download() {
  return (
    <section className="download section" id="download" aria-labelledby="download-title">
      <motion.span
        className="download-ring a"
        aria-hidden="true"
        animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="download-ring b"
        aria-hidden="true"
        animate={{ x: [0, -20, 0], y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container">
        <Reveal as="h2" className="section-title" id="download-title">
          Less “sometime.”<br /><span>More “see you there.”</span>
        </Reveal>
        <Reveal as="p" delay={0.1}>
          Find a plan for tonight, or drop one of your own. Open Plans is free to download.
        </Reveal>
        <Reveal className="mt-9 grid grid-cols-2 gap-2 sm:gap-3" delay={0.2}>
          <StoreButtons />
        </Reveal>
        <span className="download-note">For adults 18+ · Real plans, in real life</span>
      </div>
    </section>
  );
}
