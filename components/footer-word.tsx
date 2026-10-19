'use client';

import { motion } from 'framer-motion';
import { EASE_OUT } from './reveal';

// The big "open plans" wordmark rises into its resting spot (translateY 12%) on view.
export function FooterWord() {
  return (
    <motion.div
      className="footer-word"
      aria-hidden="true"
      initial={{ y: '45%', opacity: 0 }}
      whileInView={{ y: '12%', opacity: 0.14 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE_OUT }}
    >
      open plans
    </motion.div>
  );
}
