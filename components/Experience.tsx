import { experience } from '@/data/site';
import { tag } from '@/lib/icons';
import SectionTitle from './SectionTitle';
import Tag from './Tag';

// Turns **bold** markers in data strings into <strong>.
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
  );
}

export default function Experience() {
  const e = experience;
  return (
    <section id="experience" className="section section-alt">
      <div className="exp-pad">
        <SectionTitle ghost="Journey" title="Experience" />

        <article className="exp reveal">
          <div className="exp-head">
            <div className="exp-id">
              <span className="exp-mark orb">M</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
                  <h3 className="orb">{e.role}</h3>
                  <span className="chip">{e.type}</span>
                </div>
                <span className="exp-company">{e.company}</span>
              </div>
            </div>
            <div className="exp-when">
              <span className="orb">{e.period}</span>
              <span>
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {e.location}
              </span>
            </div>
          </div>

          <div className="kpis">
            {e.highlights.map((h) => (
              <div className="kpi" key={h.label}>
                <b className="orb gtext">{h.value}</b>
                <span>{h.label}</span>
              </div>
            ))}
          </div>

          <div className="exp-block">
            <h4 className="orb">Key responsibilities</h4>
            <ul>
              {e.responsibilities.map((r) => (
                <li key={r.slice(0, 40)}>{rich(r)}</li>
              ))}
            </ul>
          </div>

          <div className="exp-block">
            <h4 className="orb">Projects at Muzigal</h4>
            {/* Bento: the featured project is a tall lead card, the rest fill a 2×2 grid beside it. */}
            <div className="subprojects">
              {e.projects.map((p, i) => {
                const featured = 'featured' in p && p.featured;
                return (
                  <div key={p.title} className={featured ? 'subproject featured' : 'subproject'}>
                    <div className="sp-head">
                      <span className="sp-num orb">{String(i + 1).padStart(2, '0')}</span>
                      {featured && <span className="sp-badge">Flagship</span>}
                    </div>
                    <div className="sp-title">
                      <h5 className="orb">{p.title}</h5>
                      <small>{p.sub}</small>
                    </div>
                    <ul className="sp-points">
                      {p.points.map((pt) => (
                        <li key={pt.slice(0, 40)}>{rich(pt)}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="exp-block exp-tech">
            <h4 className="orb">Technologies used</h4>
            <div className="tags" style={{ gap: 8 }}>
              {e.tech.map((t) => (
                <Tag key={t} tag={tag(t)} outline />
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
