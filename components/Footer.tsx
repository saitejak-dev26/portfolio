import { site } from '@/data/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        <Logo size={32} />© {new Date().getFullYear()} {site.shortName}
      </span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
