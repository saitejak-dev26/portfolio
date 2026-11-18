import Logo from './Logo';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner in">
        <div className="nav-bar">
          <nav aria-label="Primary" className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="nav-cta gbg">
            Let’s talk
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
        <a href="#top" className="logo" aria-label="Saiteja — home">
          <Logo />
        </a>
      </div>
    </header>
  );
}
