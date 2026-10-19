'use client';

import Image from 'next/image';
import { motion, type MotionStyle } from 'framer-motion';
import { Reveal } from '../reveal';

const MotionImage = motion.create(Image);

// Positions come straight from the static site: --x/--y/--w on desktop, --mx/--my/--mw on mobile.
type Pos = { x: string; y: string; r: number; w?: string; mx?: string; my?: string; mw?: string };
type Item =
  | ({ kind: 'photo'; src: string; alt: string; hideSm?: boolean } & Pos)
  | ({ kind: 'bubble'; text: string; tail: 'l' | 'r'; hideSm?: boolean } & Pos);

const ITEMS: Item[] = [
  { kind: 'photo', src: '/assets/photos/friends-outdoors.jpg', alt: 'Friends sitting together by the water', x: '-3%', y: '10%', w: '16%', r: -4, mx: '3%', my: '8%', mw: '45%' },
  { kind: 'photo', src: '/assets/photos/dinner.jpg', alt: 'Friends raising a toast at dinner', hideSm: true, x: '11%', y: '40%', w: '15%', r: 3 },
  { kind: 'bubble', text: 'that street food crawl was unreal 😭', tail: 'l', hideSm: true, x: '7%', y: '30%', r: -3 },
  { kind: 'photo', src: '/assets/photos/cafe.jpg', alt: 'Three friends laughing over coffee', x: '31%', y: '6%', w: '16%', r: 4, mx: '27%', my: '47%', mw: '46%' },
  { kind: 'bubble', text: 'same time next week?', tail: 'r', x: '21%', y: '2%', r: 3, mx: '40%', my: '40%' },
  { kind: 'photo', src: '/assets/photos/concert.jpg', alt: 'A crowd at a concert', hideSm: true, x: '48%', y: '36%', w: '15%', r: -3 },
  { kind: 'bubble', text: 'who’s in for the sunrise drive? 🚗', tail: 'l', x: '52%', y: '80%', r: -2, mx: '3%', my: '89%' },
  { kind: 'photo', src: '/assets/photos/crew.jpg', alt: 'Four friends watching the sunset with arms around each other', x: '63%', y: '4%', w: '18%', r: 3, mx: '52%', my: '2%', mw: '44%' },
  { kind: 'photo', src: '/assets/photos/cycling.jpg', alt: 'A group out on a bike ride', hideSm: true, x: '83%', y: '38%', w: '15%', r: -5 },
  { kind: 'bubble', text: 'adding you all to my crew 🙌', tail: 'r', hideSm: true, x: '80%', y: '24%', r: 4 },
];

function vars(p: Pos): MotionStyle {
  const style: Record<string, string> = { '--x': p.x, '--y': p.y, '--r': `${p.r}deg` };
  if (p.w) style['--w'] = p.w;
  if (p.mx) style['--mx'] = p.mx;
  if (p.my) style['--my'] = p.my;
  if (p.mw) style['--mw'] = p.mw;
  return style as MotionStyle;
}

export function Crew() {
  return (
    <section className="section crew" aria-labelledby="crew-title">
      <div className="container crew-head">
        <Reveal as="h2" className="section-title" id="crew-title">
          One plan can start <span className="script">a whole crew.</span>
        </Reveal>
        <Reveal as="p" className="lede" delay={0.1}>
          Met people you click with? Add them to your crew, and the next plan is one invite away. That&apos;s how
          strangers turn into the group chat you actually use.
        </Reveal>
      </div>
      <div className="crew-collage">
        {ITEMS.map((item, i) => {
          // Framer Motion owns `transform` here, so the CSS rotate(var(--r)) is passed as `rotate`.
          const motionProps = {
            style: vars(item),
            initial: { opacity: 0, y: 48, rotate: item.r * 2.5, scale: 0.9 },
            whileInView: { opacity: 1, y: 0, rotate: item.r, scale: 1 },
            whileHover: { scale: 1.04, rotate: 0, zIndex: 3 },
            viewport: { once: true, amount: 0.3 },
            transition: { type: 'spring' as const, stiffness: 120, damping: 16, delay: (i % 5) * 0.08 },
          };
          const hide = item.hideSm ? ' c-hide-sm' : '';
          return item.kind === 'photo' ? (
            <MotionImage
              key={item.src}
              className={`c-photo${hide}`}
              src={item.src}
              alt={item.alt}
              width={480}
              height={600}
              sizes="(max-width: 900px) 46vw, 18vw"
              {...motionProps}
            />
          ) : (
            <motion.p key={item.text} className={`c-bubble tail-${item.tail}${hide}`} {...motionProps}>
              {item.text}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
}
