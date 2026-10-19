import type { Metadata } from 'next';
import { Crew } from '@/components/home/crew';
import { Download } from '@/components/home/download';
import { Faq } from '@/components/home/faq';
import { Hero } from '@/components/home/hero';
import { Steps } from '@/components/home/steps';
import { Vibes } from '@/components/home/vibes';
import { JsonLd } from '@/components/json-ld';
import { FAQ } from '@/lib/faq';
import { PLAY_STORE_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/app-icon.jpg`,
      email: SUPPORT_EMAIL,
      contactPoint: { '@type': 'ContactPoint', email: SUPPORT_EMAIL, contactType: 'customer support' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'MobileApplication',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      operatingSystem: 'Android, iOS',
      applicationCategory: 'SocialNetworkingApplication',
      image: `${SITE_URL}/assets/app-icon.jpg`,
      downloadUrl: PLAY_STORE_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={structuredData} />
      <Hero />
      <Steps />
      <Vibes />
      <Crew />
      <Download />
      <Faq />
    </main>
  );
}
