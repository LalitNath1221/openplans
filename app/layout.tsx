import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Caveat_Brush, Nunito } from 'next/font/google';
import { IconSprite } from '@/components/icons';
import { MotionProvider } from '@/components/motion-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';
import './globals.css';

// Same families and weights the static site pulled from Google Fonts, now self-hosted.
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

// Variable font with the optical-size axis, like the original opsz 12..96 request.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-caveat-brush',
  display: 'swap',
});

const title = `${SITE_NAME} · ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Open Plans',
    'plans near me',
    'meet new people',
    'things to do nearby',
    'make friends',
    'group plans',
    'social app',
    'meetups',
    'Guwahati',
  ],
  category: 'social',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    url: '/',
    title,
    description: 'Find a plan near you, meet new people, and do something fun offline.',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Find a plan near you, meet new people, and do something fun offline.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${bricolage.variable} ${caveatBrush.variable}`}
    >
      <body>
        <IconSprite />
        <a className="skip-link" href="#main">Skip to content</a>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
