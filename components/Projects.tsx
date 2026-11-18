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

  const pad = (x: number) => String(x).padStart(2, '0');
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

        <div className="pcontrols reveal">
          <span className="counter orb" aria-live="polite">
            {pad(off + 1)} / {pad(n)}
          </span>
          <div className="progress">
            <span className="gbg" style={{ width: `${((off + 1) / Math.max(n, 1)) * 100}%` }} />
          </div>
          <div className="arrows">
            <button type="button" className="arw" aria-label="Previous project" onClick={prev}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" className="arw" aria-label="Next project" onClick={next}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="track"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ transform: `translateX(calc(-${off} * (min(380px, 82vw) + var(--track-gap))))` }}>
          {list.map((p) => (
            <article key={p.title} className={p.inDevelopment ? 'pcard dev' : 'pcard'}>
              <div className="pstage" style={{ background: p.bg }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className={p.imageFit === 'logo' ? 'logo-fit' : 'cover'}
                />
                <span className="pcat">{p.category}</span>
                {p.inDevelopment && (
                  <span className="pdev">
                    <span className="devdot" />
                    In development
                  </span>
                )}
              </div>
              <div className="pbody">
                <span className="kind">{p.kind}</span>
                <h3 className="orb">{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pfoot">
                  <div className="tags">
                    {p.tags.map((t) => (
                      <Tag key={t.name} tag={t} />
                    ))}
                  </div>
                  {p.inDevelopment ? (
                    <span className="plink gtext">Launching soon</span>
                  ) : p.live ? (
                    <a href={p.live} target="_blank" rel="noopener" className="plink">
                      Live ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
