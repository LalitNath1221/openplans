// Set NEXT_PUBLIC_SITE_URL to the production origin before deploying; it drives
// canonical URLs, the sitemap, robots.txt, Open Graph and JSON-LD.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://openplans.app').replace(/\/$/, '');

export const SITE_NAME = 'Open Plans';
export const SITE_TAGLINE = 'Real plans with people nearby';
export const SITE_DESCRIPTION =
  'Open Plans shows you real plans happening near you, from movie nights to badminton at dawn. Ask to join one, or drop your own and choose who comes along.';
export const SUPPORT_EMAIL = 'info@openplans.app';

// TODO before launch: swap for the real store listing URLs (see the v4 README).
export const PLAY_STORE_URL = '#';
export const APP_STORE_URL = '#';
