import { siGithub } from 'simple-icons';
import { site } from '@/data/site';
import Logo from './Logo';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

// LinkedIn's mark isn't shipped by simple-icons, so its path lives here.
const LINKEDIN =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

function Social({ href, label, external, children }: { href: string; label: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="f-social"
      aria-label={external ? `${label} (opens in a new tab)` : label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-wrap">
      <div className="footer">
        <div className="f-top">
          <div className="f-brand">
            <a href="#top" className="f-logo" aria-label={`${site.name} — back to top`}>
              <Logo size={56} />
            </a>
            <div>
              <p className="f-name orb">{site.name}</p>
              <p className="f-role">
                {site.role} · {site.location}
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="f-nav">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="f-socials">
            <Social href={site.github} label="GitHub" external>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d={siGithub.path} />
              </svg>
            </Social>
            <Social href={site.linkedin} label="LinkedIn" external>
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d={LINKEDIN} />
              </svg>
            </Social>
            <Social href={`mailto:${site.email}`} label={`Email ${site.email}`}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </Social>
            <Social href={site.resume} label="Download CV (PDF)">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
            </Social>
          </div>
        </div>

        <div className="f-rule" aria-hidden="true" />

        <div className="f-bottom">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="f-status">
            <span className="dot" aria-hidden="true" />
            Open to new opportunities
          </p>
          <a href="#top" className="f-top-btn">
            Back to top
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
