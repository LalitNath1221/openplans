import type { Metadata } from 'next';
import { Icon } from '@/components/icons';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Safety',
  description: 'How Open Plans keeps meetups safer, and practical tips for meeting new people in person.',
  alternates: { canonical: '/safety' },
  openGraph: {
    url: '/safety',
    title: 'Safety · Open Plans',
    description: 'How Open Plans keeps meetups safer, and practical tips for meeting new people in person.',
  },
};

export default function SafetyPage() {
  return (
    <main id="main">
      <PageHero
        icon="shield"
        eyebrow="Safety"
        title="Good plans start with looking out for each other."
        lede="Open Plans is built for meeting new people, so safety is part of how every plan works. Here's what the app does for you, and what you can do too."
      >
        <nav className="toc" aria-label="On this page">
          <a href="#built-in">Built into the app</a>
          <a href="#tips">Meeting up safely</a>
          <a href="#verification">About verification</a>
          <a href="#reporting">Reporting</a>
        </nav>
      </PageHero>

      <div className="container">
        <article className="prose">
          <h2 id="built-in">Built into the app</h2>
          <ul>
            <li><strong>Hosts approve every request.</strong> Nobody is added to a plan automatically. The host sees who&apos;s asking and decides.</li>
            <li><strong>The exact spot stays private.</strong> Anyone browsing sees the general area and time of day. The exact address and start time are shown only to the host and approved members.</li>
            <li><strong>Women-only plans.</strong> Hosts can make a plan women-only. Only women can see it or ask to join.</li>
            <li><strong>A chat just for the group.</strong> Only the host and approved members can read it, and it closes 6 hours after the plan starts.</li>
            <li><strong>Hosts can remove members.</strong> If someone isn&apos;t a good fit, the host can remove them. They lose access to the chat and the meetup details.</li>
            <li><strong>Adults only.</strong> Everyone on Open Plans must be 18 or older.</li>
          </ul>

          <h2 id="tips">Meeting up safely</h2>
          <p>You&apos;ll see these tips in the app before your first plan, and any time from a plan&apos;s private details or the group chat.</p>
          <ul>
            <li>Always meet in a public place, especially the first time.</li>
            <li>Bring a friend along, or tell someone where you&apos;re going.</li>
            <li>Don&apos;t share personal info like your home address, ID, or bank details in chat.</li>
            <li>Keep the conversation in the app until you actually trust the person.</li>
            <li>Arrange your own way there and back. Never rely on a stranger for a ride.</li>
            <li>Trust your gut. If something feels off, leave. It&apos;s always okay to back out.</li>
          </ul>

          <h2 id="verification">About verification</h2>
          <p>Members can verify their profile by submitting photos of the front and back of their Aadhaar card and a selfie. Our team reviews them, and approved profiles show a verified badge.</p>
          <p>A badge means someone&apos;s identity was checked. It is not a background check and doesn&apos;t guarantee how anyone will behave, so keep using your judgement with everyone you meet. A host approving you, or you approving someone, isn&apos;t a guarantee either.</p>

          <h2 id="reporting">Reporting a problem</h2>
          <p>From a plan&apos;s Members screen you can report anyone in the plan. Reports about a member go to the host, who can dismiss them or remove that person. Reports about the host go straight to our team.</p>
          <p>For anything else, or if you&apos;d rather talk to us directly, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>

          <Reveal className="callout" role="note">
            <Icon name="warning" />
            <p><strong>In immediate danger?</strong> Call 112, or your local emergency number, before contacting us. Our support team can&apos;t send help.</p>
          </Reveal>
        </article>
      </div>
    </main>
  );
}
