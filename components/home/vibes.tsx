'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../reveal';

const VIBES = [
  { lead: 'Movie', last: 'nights', cat: 'movies' },
  { lead: 'chai', last: 'runs', cat: 'chill' },
  { lead: 'jam', last: 'sessions', cat: 'music' },
  { lead: 'badminton at', last: 'dawn', cat: 'sports' },
  { lead: 'street food', last: 'crawls', cat: 'food' },
  { lead: 'sunrise', last: 'drives', cat: 'travel' },
  { lead: 'console', last: 'nights', cat: 'gaming' },
];

export function Vibes() {
  return (
    <section className="section vibes" id="plans" aria-labelledby="plans-title">
      <div className="container">
        <h2 className="eyebrow" id="plans-title">Pick a vibe</h2>
        <Reveal as="p" className="vibe-line">
          {VIBES.map((v, i) => (
            <Fragment key={v.cat}>
              {v.lead}{' '}
              <span className="nowrap">
                {v.last}{' '}
                <motion.span
                  className="vibe-thumb"
                  data-cat={v.cat}
                  initial={{ scale: 0, rotate: -12 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 15, delay: 0.25 + i * 0.08 }}
                />
              </span>{' '}
            </Fragment>
          ))}
          <span className="script">and whatever you&apos;re into.</span>
        </Reveal>
      </div>
    </section>
  );
}
