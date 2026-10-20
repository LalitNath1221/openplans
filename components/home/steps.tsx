'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '../reveal';

const STEPS = [
  {
    title: 'Find your kind of plan.',
    body: "See what's happening nearby, from a quick chai to a full-day trip. The soonest and closest plans come first.",
  },
  {
    title: 'Ask to join, or host your own.',
    body: 'Tap Request to Join and the host looks at your profile. Or drop a plan of your own and accept the people you want.',
  },
  {
    title: 'Show up. See what happens.',
    body: "Once you're in, you get the exact spot and a group chat with everyone going.",
  },
];

// How far through the pinned section's scroll travel (0..1) the reader is.
function scrollProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  return travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
}

export function Steps() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // The section is taller than the screen and its content is pinned, so scrolling through it
  // walks the steps: each step owns an equal slice of the scroll travel.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(Math.min(STEPS.length - 1, Math.floor(scrollProgress(section) * STEPS.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Picking a step scrolls to the middle of its slice, so scroll stays the single source of truth.
  const pick = useCallback((i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / STEPS.length) * travel });
  }, []);

  return (
    // Scroll track: the 120svh beyond one screen is the travel that walks the three steps.
    // overflow-x-clip (never hidden) so the pinned child keeps sticking.
    <section ref={sectionRef} className="h-[220svh] overflow-x-clip bg-white" id="how" aria-labelledby="how-title">
      <div className="sticky top-0 flex h-svh items-center-safe overflow-hidden pt-[calc(var(--header-h)+16px)] pb-4">
      <div className="container">
        {/* Desktop: heading and steps in the left column, the phone spanning both rows on the right.
            Mobile: heading, phone, then only the active step. */}
        <div className="grid grid-cols-1 items-start gap-x-[clamp(32px,6vw,88px)] min-[901px]:grid-cols-[1fr_minmax(320px,0.85fr)]">
          <Reveal className="col-start-1 row-start-1 mb-4 self-end min-[901px]:mb-[clamp(16px,3svh,32px)]">
            <h2
              className="section-title text-[clamp(28px,8vw,40px)]! min-[901px]:text-[clamp(34px,min(4.4vw,7svh),60px)]!"
              id="how-title"
            >
              From “any plans?”<br />to <span className="script">“that was fun.”</span>
            </h2>
          </Reveal>

          {/* On mobile every step sits in the same grid cell, so the block keeps the tallest step's height. */}
          <div className="col-start-1 row-start-3 grid min-[901px]:row-start-2 min-[901px]:gap-2">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                className={`col-start-1 row-start-1 grid w-full cursor-pointer grid-cols-[36px_1fr] items-start gap-2.5 rounded-(--r-lg) px-4.5 py-4 text-left transition-colors duration-300 sm:grid-cols-[52px_1fr] sm:gap-4.5 min-[901px]:visible min-[901px]:row-start-auto min-[901px]:px-6 min-[901px]:py-5 ${
                  active === i ? 'bg-(--cream)' : 'invisible'
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={active === i}
                aria-controls="app-screens"
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pick(i);
                  }
                }}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.08 }}
              >
                <span
                  className={`pt-1 text-[15px] font-extrabold transition-[color,opacity] duration-300 min-[901px]:opacity-100 ${
                    active === i ? 'text-(--primary-ink) opacity-100' : 'text-(--muted) opacity-0'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={`grid gap-2 transition-opacity duration-300 min-[901px]:opacity-100 ${
                    active === i ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <h3 className="font-(family-name:--display) text-[clamp(20px,2vw,24px)] leading-[1.2] font-black">
                    {step.title}
                  </h3>
                  <p className="max-w-[460px] text-[15px] leading-[1.6] text-(--muted) sm:text-base">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative col-start-1 row-start-2 mb-4 grid place-items-center min-[901px]:col-start-2 min-[901px]:row-span-2 min-[901px]:row-start-1 min-[901px]:mb-0">
            <motion.div
              className="absolute z-0 aspect-square w-full rounded-full bg-[radial-gradient(closest-side,rgba(255,156,86,0.28),rgba(255,156,86,0))] min-[901px]:w-[120%]"
              aria-hidden="true"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Phone shrinks with screen height so the whole pinned view always fits. */}
            <motion.div
              className="phone rounded-[30px] md:rounded-[40px] w-[min(260px,calc((100svh-var(--header-h)-330px)*320/660))]! min-[901px]:w-[min(280px,calc((100svh-var(--header-h)-64px)*320/660))]!"
              id="app-screens"
              role="img"
              aria-label="Open Plans app screens: the Home feed, a plan page, and a group chat"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="phone-screen rounded-[20px] md:rounded-[40px]" aria-hidden="true">
                <Screen active={active === 0} src="/mockups/home.png" />
                <Screen active={active === 1} src="/mockups/plan.png" />
                <Screen active={active === 2} src="/mockups/chat.png" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

// Captured from the live HTML mockup at desktop size (notch included), so the screens stay crisp and keep
// their layout however small the phone gets.
function Screen({ active, src }: { active: boolean; src: string }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, visibility: 'visible' }
          : { opacity: 0, y: 12, transitionEnd: { visibility: 'hidden' } }
      }
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Image src={src} alt="" fill sizes="280px" className="object-cover" />
    </motion.div>
  );
}
