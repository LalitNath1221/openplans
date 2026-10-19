import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: "What information Open Plans collects, how it's used, and the choices you have.",
  alternates: { canonical: '/privacy' },
  openGraph: {
    url: '/privacy',
    title: 'Privacy policy · Open Plans',
    description: "What information Open Plans collects, how it's used, and the choices you have.",
  },
};

const mail = <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;

// Review with legal counsel before launch: confirm the legal entity, retention periods,
// and that the listed providers and practices match production.
export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHero
        icon="doc"
        eyebrow="Privacy"
        title="Privacy policy"
        lede="Open Plans helps you meet people in real life, which means handling some personal information. Here's what we collect, why, and who can see it."
      >
        <p className="updated">Last updated 19 October 2026</p>
      </PageHero>

      <div className="container">
        <article className="prose">
          <h2>1. Information you give us</h2>
          <ul>
            <li><strong>Account:</strong> your email address and password.</li>
            <li><strong>Profile:</strong> your name, username, date of birth, gender, city (optional) and profile photo.</li>
            <li><strong>Plans and activity:</strong> plans you create, join requests, invites, group chat messages, crew connections, and reports you make.</li>
            <li><strong>Support:</strong> anything you send us by email.</li>
          </ul>

          <h2>2. Verification</h2>
          <p>Verification is optional. If you choose to verify, you submit photos of the front and back of your Aadhaar card and a selfie. Our team uses them only to review your identity and decide your verification status. They are never shown to other members.</p>

          <h2>3. Location</h2>
          <p>If you allow it, the app uses your device location to set your area and show how far plans are from you. When you host a plan you can pin its location on a map. You can choose a location manually instead of sharing your device location.</p>

          <h2>4. How we use information</h2>
          <ul>
            <li>To run your account and show you plans near you.</li>
            <li>To share plan details with the right people and run group chats.</li>
            <li>To send notifications about requests, invites, crew and messages.</li>
            <li>To review verification submissions and reports, and keep the community safe.</li>
            <li>To fix problems and improve the app.</li>
          </ul>

          <h2>5. What other members can see</h2>
          <p>Your profile (name, username, age, photo, verified badge) is visible to other members. For each plan, anyone browsing can see its title, description, area, date and time of day. The exact address and start time are shown only to the host and approved members. Group chats are visible only to the host and approved members.</p>
          <p>Please don&apos;t put personal details like your phone number or home address in your profile, plan descriptions or chats.</p>

          <h2>6. Service providers</h2>
          <p>We use trusted providers to run Open Plans: Supabase for our database and accounts, Cloudinary for storing photos (including verification photos), Expo and Firebase Cloud Messaging for push notifications, and Brevo for password reset emails. They process information only to provide these services to us.</p>
          <p>We don&apos;t sell your personal information. We may share information if required by law or to protect someone&apos;s safety.</p>

          <h2>7. How long we keep information</h2>
          <p>Plans you hosted or joined stay in your history after they end. Cancelled plans are hidden from members and kept for a limited time so our team can review reports. You can ask us to delete your account and associated information at any time.</p>

          <h2>8. Your choices</h2>
          <ul>
            <li>Edit or remove your profile photo and details in the app.</li>
            <li>Turn off location access or notifications in your device settings.</li>
            <li>Ask us for a copy of your information, a correction, or account deletion by emailing {mail}.</li>
          </ul>

          <h2>9. Age</h2>
          <p>Open Plans is only for people aged 18 and over. We don&apos;t knowingly collect information from anyone younger.</p>

          <h2>10. Changes and contact</h2>
          <p>If we change this policy in a meaningful way, we&apos;ll update the date above and let you know in the app. Questions? Email {mail}.</p>
        </article>
      </div>
    </main>
  );
}
