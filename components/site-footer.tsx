import Image from 'next/image';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/site';
import { FooterWord } from './footer-word';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Open Plans home">
              <Image src="/open-plans-logo.svg" alt="Open Plans" width={86} height={52} unoptimized />
            </Link>
            <p>Make plans. Meet people. Go live a little.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link href="/#how">How it works</Link></li>
              <li><Link href="/#plans">Plans</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><Link href="/safety">Safety</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Open Plans</span>
          <span>For adults 18+</span>
        </div>
      </div>
      <FooterWord />
    </footer>
  );
}
