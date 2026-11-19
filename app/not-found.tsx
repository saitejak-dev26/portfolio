import type { Metadata } from 'next';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="nf">
      <a href="/" className="nf-logo" aria-label="Back to the homepage">
        <Logo size={72} />
      </a>
      <p className="nf-code orb gtext">404</p>
      <h1 className="orb">Page not found</h1>
      <p className="nf-copy">The page you’re looking for has moved or never existed.</p>
      <a href="/" className="btn btn-dark">
        Back to the homepage
      </a>
    </main>
  );
}
