import { site } from '@/data/site';
import TypedRole from './TypedRole';

export default function Hero() {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero">
          <span aria-hidden="true" className="hero-grid" />
          <span aria-hidden="true" className="hero-glow gbg" />
          <span aria-hidden="true" className="hero-mono orb">
            {site.initials}
          </span>

          <div className="hero-content">
            <div className="hero-main">
              <span className="badge in" style={{ animationDelay: '.1s' }}>
                <span className="dot" />
                Open to new opportunities
              </span>
              <span className="typed orb in" style={{ animationDelay: '.15s' }}>
                {site.shortName} · <TypedRole roles={site.typedRoles} />
              </span>
              <h1 className="orb in" style={{ animationDelay: '.25s' }}>
                Build fast,
                <br />
                <span className="gtext">ship reliable.</span>
              </h1>
              <p className="hero-lead in" style={{ animationDelay: '.35s' }}>
                Full stack developer with <strong>5+ years</strong> building SaaS and CRM platforms with Next.js, React,
                Vite, Node.js, NestJS and MySQL.
              </p>
              <div className="btn-row in" style={{ animationDelay: '.45s' }}>
                <a href="#projects" className="btn btn-dark">
                  View my work
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href={site.resume} target="_blank" rel="noopener" download className="btn btn-light">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>

            <div className="hero-side in" style={{ animationDelay: '.55s' }}>
              {site.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <b className="orb">{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
              <a href="#about" className="scroll">
                <span aria-hidden="true" className="mouse">
                  <span className="wheel" />
                </span>
                Scroll down
              </a>
            </div>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="hero-fade" />
    </>
  );
}
