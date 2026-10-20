'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { EASE_OUT } from '../reveal';
import { StoreButtons } from '../store-buttons';

const copy: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};
// The headline is the LCP element, so it only moves; it never starts invisible.
const riseOnly: Variants = {
  hidden: { y: 28 },
  show: { y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const CUTS = [
  { cls: 'cut-a', src: '/assets/photos/outdoors.jpg', delay: 0.25 },
  { cls: 'cut-b', src: '/assets/photos/cafe.jpg', delay: 0.4 },
  { cls: 'cut-c', src: '/assets/photos/friends-table.jpg', delay: 0.55 },
];

// Hand-drawn arrows: shaft, then arrowhead, for find -> join -> meet.
const LINES = [
  'M232 118C178 124 144 152 138 192', 'M126 180l12 14 13-12',
  'M258 392C300 376 346 384 386 412', 'M370 416l17-3-6-16',
  'M506 324C522 288 520 250 500 214', 'M490 230l9-17 17 7',
];

const STICKERS = [
  { cls: 'stk stk-live', delay: 0.9, content: <><i />Happening now</> },
  { cls: 'stk stk-chat', delay: 0.75, content: <><i /><i /><i /></> },
  { cls: 'stk stk-join', delay: 1.05, content: <>Request to Join</> },
  { cls: 'stk stk-in', delay: 1.2, content: <>You&apos;re in! 🎉</> },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={copy} initial="hidden" animate="show">
          <motion.h1 className="display" variants={riseOnly}>
            Plans are better with{' '}
            <motion.span
              className="script"
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.55 }}
            >
              people.
            </motion.span>
          </motion.h1>
          <motion.p className="lede" variants={rise}>
            Find something happening near you, or post a plan and choose who comes along. Then go meet them.
          </motion.p>
          <motion.div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3" variants={rise}>
            <StoreButtons />
          </motion.div>
        </motion.div>

        <div
          className="doodle"
          role="img"
          aria-label="Three people connected by hand-drawn arrows: find a plan, ask to join, meet up"
        >
          <svg
            className="doodle-lines"
            viewBox="0 0 600 560"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {LINES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: i % 2 ? 0.25 : 0.6, ease: 'easeInOut', delay: 0.7 + Math.floor(i / 2) * 0.25 + (i % 2) * 0.55 },
                  opacity: { duration: 0.01, delay: 0.7 + Math.floor(i / 2) * 0.25 + (i % 2) * 0.55 },
                }}
              />
            ))}
          </svg>

          {CUTS.map((cut) => (
            <motion.figure
              key={cut.cls}
              className={`cut ${cut.cls}`}
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: cut.delay }}
            >
              <Image src={cut.src} alt="" fill preload sizes="(max-width: 640px) 45vw, (max-width: 900px) 40vw, 260px" />
            </motion.figure>
          ))}

          {STICKERS.map((s) => (
            <motion.span
              key={s.cls}
              className={s.cls}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 16, delay: s.delay } }}
              whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
            >
              {s.content}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
