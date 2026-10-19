'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FAQ } from '@/lib/faq';
import { Icon } from '../icons';
import { EASE_OUT, Reveal } from '../reveal';

// Native <details> keeps every answer in the HTML for crawlers; motion only adds the entrance.
export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <Reveal className="faq-side">
          <h2 className="section-title" id="faq-title">Before you <span className="script">head out.</span></h2>
          <p>
            Still curious?{' '}
            <Link className="text-link" href="/support">Ask us anything <Icon name="arrow-right" /></Link>
          </p>
        </Reveal>
        <div className="faq-list">
          {FAQ.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.05 }}
            >
              <summary>{item.q}<Icon name="chevron-down" /></summary>
              <p>{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
