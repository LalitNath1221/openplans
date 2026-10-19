import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/site';
import { Icon } from './icons';

export function StoreButtons() {
  return (
    <>
      <a className="store-btn" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Icon name="play" />
        <span><small>GET IT ON</small><strong>Google Play</strong></span>
      </a>
      <a className="store-btn" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Icon name="apple" />
        <span><small>Download on the</small><strong>App Store</strong></span>
      </a>
    </>
  );
}
