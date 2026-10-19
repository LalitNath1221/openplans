'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

export const EASE_OUT = [0.2, 0.7, 0.2, 1] as const;

// Fade-and-rise on first scroll into view (replaces the static site's `.reveal`).
export function Reveal({
  as = 'div',
  delay = 0,
  ...props
}: HTMLMotionProps<'div'> & { as?: 'div' | 'p' | 'h2'; delay?: number }) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      {...props}
    />
  );
}
