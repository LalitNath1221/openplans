import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff6a00',
    icons: [
      { src: '/assets/favicon.png', sizes: '48x48', type: 'image/png' },
      { src: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
