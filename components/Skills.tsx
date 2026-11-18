import { skillGroups } from '@/data/site';
import { iconFor } from '@/lib/icons';
import SectionTitle from './SectionTitle';
import TechIcon from './TechIcon';

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="skills-pad">
        <SectionTitle ghost="Toolkit" title="Skills & tools" />
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div key={g.title} className="card skill-card reveal">
              <div className="skill-head">
                <span className="ico">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={g.icon} />
                  </svg>
                </span>
                <span>
                  <span className="orb">{g.title}</span>
                  <small>{g.sub}</small>
                </span>
              </div>
              <div className="skill-items">
                {g.items.map((s) => (
                  <span key={s.name} className="skill">
                    <span className="tile">
                      <TechIcon icon={iconFor(s.icon)} name={s.name} />
                    </span>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
