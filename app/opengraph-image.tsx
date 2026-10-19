import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Open Plans · Real plans with people nearby';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Social share card in the site's palette: cream paper, dark ink, logo orange.
export default async function Image() {
  const photo = await readFile(join(process.cwd(), 'public/assets/photos/friends-table.jpg'));
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#faf7f2', color: '#1a1d2e' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px', width: 640 }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#c2410c', letterSpacing: 1 }}>OPEN PLANS</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 800, lineHeight: 1, marginTop: 24 }}>
            <span>Plans are better</span>
            <span>
              with&nbsp;<span style={{ color: '#ff6a00' }}>people.</span>
            </span>
          </div>
          <div style={{ fontSize: 28, color: '#626a85', marginTop: 28, lineHeight: 1.4 }}>
            Find a plan near you, meet new people, and do something fun offline.
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', background: '#ff9c56' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={440}
            height={520}
            style={{ objectFit: 'cover', transform: 'rotate(3deg)', border: '10px solid #ffffff' }}
          />
        </div>
      </div>
    ),
    size,
  );
}
