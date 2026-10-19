'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../icons';
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

export function Steps() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const userPicked = useRef(false);

  const pick = useCallback((i: number) => {
    userPicked.current = true;
    setActive(i);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const steps = stepRefs.current.filter((s): s is HTMLDivElement => s !== null);

    // Desktop: the phone is sticky, so follow whichever step crosses the middle of the viewport.
    const stepObserver = new IntersectionObserver(
      (entries) => {
        if (!desktop.matches) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(steps.indexOf(entry.target as HTMLDivElement));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    steps.forEach((s) => stepObserver.observe(s));

    // Mobile: the phone sits above the steps, so walk through them slowly while the section is
    // on screen, and stop as soon as someone taps a step themselves.
    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) return;
        if (entry.isIntersecting && !desktop.matches && !userPicked.current && !timer) {
          timer = setInterval(() => {
            if (userPicked.current || desktop.matches) return stop();
            setActive((a) => (a + 1) % STEPS.length);
          }, 4500);
        } else if (!entry.isIntersecting) {
          stop();
        }
      },
      { threshold: 0.35 },
    );
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    return () => {
      stop();
      stepObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="steps section" id="how" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="section-title" id="how-title">
            From “any plans?”<br />to <span className="script">“that was fun.”</span>
          </h2>
        </Reveal>

        <div className="steps-layout">
          <div className="steps-list">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`step${active === i ? ' active' : ''}`}
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
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="steps-stage">
            <motion.div
              className="stage-glow"
              aria-hidden="true"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="phone"
              id="app-screens"
              role="img"
              aria-label="Open Plans app screens: the Home feed, a plan page, and a group chat"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="phone-screen" aria-hidden="true">
                <div className="phone-island" />
                <Screen active={active === 0}><HomeScreen /></Screen>
                <Screen active={active === 1}><PlanScreen /></Screen>
                <Screen active={active === 2}><ChatScreen /></Screen>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Screen({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`screen is-motion${active ? ' active' : ''}`}
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, visibility: 'visible' }
          : { opacity: 0, y: 12, transitionEnd: { visibility: 'hidden' } }
      }
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function StatusBar() {
  return <div className="status-bar"><span>9:41</span><i /></div>;
}

function HomeScreen() {
  return (
    <>
      <StatusBar />
      <div className="app-head">
        <div className="app-head-left">
          <span className="avatar v2">MS</span>
          <span className="loc-pill"><Icon name="pin-bold" />Ganeshguri<Icon name="chevron-down" /></span>
        </div>
        <span className="verified-chip"><Icon name="verified" />Verified</span>
      </div>
      <div className="app-hello">Hey Meera 👋</div>
      <div className="app-title">What&apos;s the plan?</div>
      <div className="app-search"><Icon name="search" />Search plans</div>
      <div className="app-chips">
        <span className="app-chip on"><Icon name="grid" />All</span>
        <span className="app-chip">🍕 Food</span>
        <span className="app-chip">☕ Chill</span>
        <span className="app-chip">🏸 Sports</span>
      </div>
      <div className="app-section"><small>Nearby</small><strong>6 plans happening</strong></div>
      <div className="app-feed">
        <div className="plan-card" data-cat="food">
          <div className="plan-top"><span className="plan-chip">Food</span><span className="plan-spots">3 spots left</span></div>
          <div className="plan-body">
            <div className="plan-title">Street Food Crawl</div>
            <div className="plan-meta">
              <span><Icon name="calendar" />Today · Evening</span>
              <span><Icon name="pin" />Fancy Bazar · 1.2 km away</span>
            </div>
          </div>
          <div className="plan-foot">
            <div className="host">
              <span className="avatar">RK</span>
              <div>
                <div className="host-name">Riya <Icon name="verified" /></div>
                <div className="host-sub">24 <span className="rating"><Icon name="star" />4.8</span></div>
              </div>
            </div>
            <span className="plan-btn">Request to Join</span>
          </div>
        </div>
        <div className="plan-card" data-cat="sports">
          <div className="plan-top"><span className="plan-chip">Sports</span><span className="plan-spots">1 spot left</span></div>
          <div className="plan-body">
            <div className="plan-title">Badminton at Dawn</div>
            <div className="plan-meta">
              <span><Icon name="calendar" />Tomorrow · Morning</span>
              <span><Icon name="pin" />Khanapara · 3.4 km away</span>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-bar">
        <span className="tab on"><Icon name="home-bold" />Home</span>
        <span className="tab"><Icon name="people" /></span>
        <span className="tab"><Icon name="bell" /><i className="tab-dot" /></span>
        <span className="tab"><Icon name="user" /></span>
      </div>
    </>
  );
}

function PlanScreen() {
  return (
    <>
      <div className="plan-card detail-banner" data-cat="movies">
        <StatusBar />
        <div className="plan-top"><span className="plan-chip">Movies</span><span className="plan-spots">2 spots left</span></div>
        <div className="plan-body">
          <div className="plan-title">Movie night at City Centre</div>
          <div className="plan-meta"><span><Icon name="calendar" />Sat, 26 Oct · Evening</span></div>
        </div>
      </div>
      <div className="detail-body">
        <div className="info-row"><span className="avatar v4">AK</span><div>Hosted by Aman <small>26 · 12 plans hosted</small></div></div>
        <div className="info-row"><Icon name="pin" /><div>Christian Basti <small>Area shown to everyone</small></div></div>
        <div className="info-row locked"><Icon name="lock" /><div>Exact address &amp; time <small>Unlocks when the host approves you</small></div></div>
        <div className="going">
          <span>4 of 6 going</span>
          <span className="avatar-stack">
            <span className="avatar v4">AK</span><span className="avatar v5">SD</span><span className="avatar v3">JB</span><span className="avatar">RK</span>
          </span>
        </div>
      </div>
      <div className="app-toast"><Icon name="check-bold" />Request sent. Aman will take a look.</div>
      <div className="app-cta pending"><Icon name="hourglass" />Pending</div>
    </>
  );
}

function ChatScreen() {
  return (
    <>
      <StatusBar />
      <div className="chat-head">
        <span className="avatar-cat" />
        <div><strong>Movie night at City Centre</strong><small>5 members</small></div>
        <Icon name="people" />
      </div>
      <div className="safety-banner">
        <Icon name="shield" />
        <span>Meeting up? Keep it public and don&apos;t share personal info here. Tap for tips.</span>
      </div>
      <div className="messages">
        <div className="msg"><small>Aman · host</small><p>Meeting at the PVR lobby, 6:45. Tickets are booked 🍿</p></div>
        <div className="msg"><small>Sneha</small><p>Perfect, I&apos;ll be there by 6:40</p></div>
        <div className="msg me"><p>On my way! Saving seats for snacks</p></div>
        <div className="msg"><small>Jay</small><p>Running 5 min late, start without me 😅</p></div>
      </div>
      <div className="composer">Message the group<b><Icon name="arrow-up" /></b></div>
    </>
  );
}
