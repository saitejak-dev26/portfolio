'use client';

import { useMemo, useRef, useState } from 'react';
import type { Project } from '@/data/site';
import type { Tag as TagT } from '@/lib/icons';
import SectionTitle from './SectionTitle';
import Tag from './Tag';

export type ProjectView = Project & { tags: TagT[] };

type Filter = { label: string; color: string | null; test: (p: ProjectView) => boolean };

const FILTERS: Filter[] = [
  { label: 'All', color: null, test: () => true },
  { label: 'SaaS & CRM', color: '#5B6BC0', test: (p) => p.category === 'SaaS & CRM' },
  { label: 'Websites', color: '#C0803A', test: (p) => p.category === 'Website' },
  { label: 'In development', color: '#F59E0B', test: (p) => !!p.inDevelopment },
];

const pad = (x: number) => String(x).padStart(2, '0');

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'prev' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
    </svg>
  );
}

function Shot({ p, className }: { p: ProjectView; className: string }) {
  return (
    <div className={className} style={{ background: p.bg }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt={p.imageAlt} loading="lazy" className={p.imageFit === 'logo' ? 'logo-fit' : 'cover'} />
    </div>
  );
}

export default function Projects({ projects }: { projects: ProjectView[] }) {
  const [filter, setFilter] = useState('All');
  const [index, setIndex] = useState(0);

  const ordered = useMemo(
    () => [...projects].sort((a, b) => Number(!!b.inDevelopment) - Number(!!a.inDevelopment)),
    [projects],
  );
  const active = FILTERS.find((f) => f.label === filter) ?? FILTERS[0];
  const list = ordered.filter(active.test);
  const n = list.length;
  const off = Math.max(0, Math.min(index, n - 1));

  const prev = () => setIndex(off === 0 ? n - 1 : off - 1);
  const next = () => setIndex(off >= n - 1 ? 0 : off + 1);

  // Horizontal swipe on touch screens; ignores mostly-vertical gestures so page scroll still works.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionTitle ghost="Shipped" title="Selected work" />

        <div className="ptabs reveal" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              className="ptab"
              aria-pressed={f.label === active.label}
              onClick={() => {
                setFilter(f.label);
                setIndex(0);
              }}
            >
              {f.color && <span className="pdot" style={{ background: f.color }} />}
              {f.label}
              <span className="count">{ordered.filter(f.test).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pband reveal">
        <button type="button" className="arw arw-prev" aria-label="Previous project" onClick={prev}>
          <Arrow dir="prev" />
        </button>
        <button type="button" className="arw arw-next" aria-label="Next project" onClick={next}>
          <Arrow dir="next" />
        </button>

        <div className="pviewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="track" style={{ transform: `translateX(calc(-${off} * (var(--pw) + var(--track-gap))))` }}>
            {list.map((p, i) => {
              const isActive = i === off;
              const num = pad(i + 1);
              return (
                <article key={p.title} className={isActive ? 'pslide active' : 'pslide'} aria-current={isActive || undefined}>
                  {/* Expanded detail card — shown for the active project */}
                  <div className={p.inDevelopment ? 'pdetail dev' : 'pdetail'} inert={!isActive} aria-hidden={!isActive}>
                    <div className="pd-head">
                      <Shot p={p} className="pd-thumb" />
                      <div className="pd-meta">
                        <span>Category:</span>
                        <b>{p.category}</b>
                      </div>
                      <span className={p.inDevelopment ? 'pd-status building' : 'pd-status'}>
                        <span className="devdot" />
                        {p.inDevelopment ? 'In development' : 'Live'}
                      </span>
                    </div>
                    <div className="pd-row">
                      <span>Type :</span>
                      <b>{p.kind}</b>
                    </div>
                    <div className="pd-grid">
                      <div>
                        <span>Project</span>
                        <b className="orb">
                          {num}/{pad(n)}
                        </b>
                      </div>
                      <div>
                        <span>Stack</span>
                        <b className="orb">{p.stack.length}</b>
                      </div>
                      <div className="wide">
                        <span>Built with</span>
                        <div className="tags">
                          {p.tags.map((t) => (
                            <Tag key={t.name} tag={t} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="pd-bottom">
                      <div className="pd-copy">
                        <h3 className="orb">{p.title}</h3>
                        <p>{p.desc}</p>
                        {p.inDevelopment ? (
                          <span className="plink gtext">Launching soon</span>
                        ) : p.live ? (
                          <a href={p.live} target="_blank" rel="noopener" className="plink">
                            Visit live ↗
                          </a>
                        ) : null}
                      </div>
                      <Shot p={p} className="pd-peek" />
                    </div>
                  </div>

                  {/* Poster — shown for the projects waiting in line */}
                  <button
                    type="button"
                    className="pposter"
                    inert={isActive}
                    aria-hidden={isActive}
                    aria-label={`Show ${p.title}`}
                    onClick={() => setIndex(i)}
                  >
                    {p.inDevelopment && (
                      <span className="pp-flag" title="In development">
                        <span className="devdot" />
                      </span>
                    )}
                    <span className="pp-num orb" aria-hidden="true">
                      {num}
                    </span>
                    <Shot p={p} className="pp-shot" />
                    <span className="pp-foot">
                      <span className="pp-kind">
                        <span>{num}</span>
                        {p.kind}
                      </span>
                      <span className="pp-title orb">{p.title}</span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="pcontrols">
          <span className="counter orb" aria-live="polite">
            {pad(off + 1)} / {pad(n)}
          </span>
          <div className="progress">
            <span style={{ width: `${((off + 1) / Math.max(n, 1)) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
