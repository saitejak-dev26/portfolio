import { site } from '@/data/site';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="section contact-wrap">
      <div className="contact">
        <span aria-hidden="true" className="contact-grid-bg" />
        <span aria-hidden="true" className="contact-glow gbg" />
        <span aria-hidden="true" className="contact-ghost orb">
          {site.shortName}
        </span>

        <div className="contact-inner">
          <div className="contact-copy">
            <span className="kicker">Something good starts with a conversation</span>
            <h2 className="orb">
              Let’s build
              <br />
              <span className="gtext">something great</span>
            </h2>
            <p>
              Hiring for a full-time role, planning a freelance project, or just want to say hi? Send a message and I’ll
              get back to you.
            </p>
            <div className="btn-row">
              <a href={`mailto:${site.email}`} className="btn btn-white">
                <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Email me
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">
                LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noopener" className="btn btn-ghost">
                GitHub
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
