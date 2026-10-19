'use client';

import { MotionConfig } from 'framer-motion';

// Respect the OS "reduce motion" setting for every Framer Motion animation on the site.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
