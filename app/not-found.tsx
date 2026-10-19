import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>This plan fell through.</h1>
          <p className="lede">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="store-row" style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" href="/">Back to home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
