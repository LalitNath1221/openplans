'use client';

import { motion, type Variants } from 'framer-motion';
import { Icon, type IconName } from './icons';
import { EASE_OUT } from './reveal';

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
// The <h1> is the LCP element: it moves in but is never hidden.
const riseOnly: Variants = { hidden: { y: 20 }, show: { y: 0, transition: { duration: 0.7, ease: EASE_OUT } } };

export function PageHero({
  icon,
  eyebrow,
  title,
  lede,
  children,
}: {
  icon: IconName;
  eyebrow: string;
  title: string;
  lede: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <motion.div className="container" variants={group} initial="hidden" animate="show">
        <motion.span className="eyebrow" variants={rise}><Icon name={icon} className="icon-sm" />{eyebrow}</motion.span>
        <motion.h1 variants={riseOnly}>{title}</motion.h1>
        <motion.p className="lede" variants={rise}>{lede}</motion.p>
        {children && <motion.div variants={rise}>{children}</motion.div>}
      </motion.div>
    </section>
  );
}
