import SectionTitle from './SectionTitle';

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionTitle ghost="About" title="Who I am" />
      <div className="about-grid">
        <div className="about-lead reveal">
          <span className="orb">
            Logic, consistency
            <br />
            <span className="gtext">&amp; clean code</span>
          </span>
          <small>Full stack · Edtech SaaS · Hyderabad, India</small>
        </div>
        <div className="about-body reveal">
          <p>
            I’m a full stack developer at an edtech company, where I build and maintain the SaaS products that music and
            arts academies run on — <strong>Studio11 CRM (S11pro)</strong> and <strong>Muzigal CRM</strong> — and I’m
            leading <strong>YumCrm</strong>, our subscription and billing platform.
          </p>
          <p>
            I enjoy owning features end to end: data models, APIs, admin dashboards, payments with Razorpay and messaging
            with MSG91 — and shipping fast, accessible front ends in Next.js.
          </p>
        </div>
      </div>
    </section>
  );
}
