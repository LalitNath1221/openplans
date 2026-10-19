import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with your Open Plans account, plans, verification or a safety concern.',
  alternates: { canonical: '/support' },
  openGraph: {
    url: '/support',
    title: 'Support · Open Plans',
    description: 'Get help with your Open Plans account, plans, verification or a safety concern.',
  },
};

const HELP = [
  { title: 'Your account', body: 'Trouble logging in, resetting your password, changing your details, or deleting your account.' },
  { title: 'Plans & requests', body: "Something wrong with a plan you're hosting or joining, a request that's stuck, or a chat that won't open." },
  { title: 'Verification', body: "Questions about your Aadhaar and selfie submission, or a review decision you'd like us to look at again." },
];

export default function SupportPage() {
  return (
    <main id="main">
      <PageHero
        icon="question"
        eyebrow="Support"
        title="We're here to help."
        lede="Stuck on something, or something didn't feel right? Email us and a real person will get back to you."
      />

      <div className="container">
        <div className="prose" style={{ maxWidth: 'none' }}>
          <Reveal className="contact-card">
            <div>
              <strong>{SUPPORT_EMAIL}</strong>
              <span>For account issues, plan concerns, verification questions and feedback.</span>
            </div>
            <a className="btn btn-primary" href={`mailto:${SUPPORT_EMAIL}?subject=Open%20Plans%20support`}>Email us</a>
          </Reveal>

          <h2>What can we help with?</h2>
          <div className="help-grid">
            {HELP.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>

          <div style={{ maxWidth: 760 }}>
            <h2>What to include</h2>
            <ul>
              <li>The email address or username on your account. Never send your password.</li>
              <li>What happened and roughly when.</li>
              <li>The plan title, the person&apos;s username, or any error message you saw.</li>
            </ul>
            <p>Please don&apos;t email photos of your ID. If we need anything for verification, we&apos;ll ask you to resubmit it in the app.</p>

            <h2>Reporting someone</h2>
            <p>
              The fastest way is in the app: open the plan, go to Members, and tap Report next to the person. You can also
              email us with the details. <Link href="/safety#reporting">How reporting works</Link>
            </p>

            <Reveal className="callout" role="note">
              <Icon name="warning" />
              <p><strong>In immediate danger?</strong> Call 112, or your local emergency number. Our support team can&apos;t send help.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
