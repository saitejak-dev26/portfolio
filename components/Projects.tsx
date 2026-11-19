'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

const MAX_TAGS = 4;
const pad = (x: number) => String(x).padStart(2, '0');

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'prev' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
    </svg>
  );
}

function ProjectCard({ p, num }: { p: ProjectView; num: string }) {
  const extra = p.tags.length - MAX_TAGS;
  return (
    <article className="pcard">
      <div className="pc-shot" style={{ background: p.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.imageAlt} loading="lazy" className={p.imageFit === 'logo' ? 'logo-fit' : 'cover'} />
        <span className={p.inDevelopment ? 'pc-status building' : 'pc-status'}>
          <span className="devdot" />
          {p.inDevelopment ? 'In development' : 'Live'}
        </span>
      </div>

      <div className="pc-body">
        <div className="pc-meta">
          <span className="orb">{num}</span>
          <span>{p.kind}</span>
        </div>
        <h3 className="orb">{p.title}</h3>
        <p>{p.desc}</p>
        <div className="tags">
          {p.tags.slice(0, MAX_TAGS).map((t) => (
            <Tag key={t.name} tag={t} />
          ))}
          {extra > 0 && <span className="tag">+{extra}</span>}
        </div>
        <div className="pc-foot">
          {p.inDevelopment ? (
            <span className="pc-link muted">Launching soon</span>
          ) : p.live ? (
            <a href={p.live} target="_blank" rel="noopener" className="pc-link">
              Visit live <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="pc-link muted">Internal project</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects }: { projects: ProjectView[] }) {
  const [filter, setFilter] = useState('All');
  const [pos, setPos] = useState({ index: 0, atStart: true, atEnd: false });
  const rail = useRef<HTMLDivElement>(null);

  const ordered = useMemo(
    () => [...projects].sort((a, b) => Number(!!b.inDevelopment) - Number(!!a.inDevelopment)),
    [projects],
  );
  const active = FILTERS.find((f) => f.label === filter) ?? FILTERS[0];
  const list = ordered.filter(active.test);
  const n = list.length;

  const step = () => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
  };

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const s = step();
    const max = el.scrollWidth - el.clientWidth;
    setPos({
      index: s ? Math.min(n - 1, Math.round(el.scrollLeft / s)) : 0,
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, [n]);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [filter, sync]);

  const go = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  // How many cards are fully in view, so the progress bar reflects the visible window.
  const visible = rail.current && step() ? Math.max(1, Math.round(rail.current.clientWidth / step())) : 1;
  const last = Math.min(n, pos.index + visible);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionTitle ghost="Shipped" title="Selected work" />

        <div className="phead reveal">
          <div className="ptabs" role="group" aria-label="Filter projects by category">
            {FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                className="ptab"
                aria-pressed={f.label === active.label}
                onClick={() => setFilter(f.label)}
              >
                {f.color && <span className="pdot" style={{ background: f.color }} />}
                {f.label}
                <span className="count">{ordered.filter(f.test).length}</span>
              </button>
            ))}
          </div>
          <div className="parrows">
            <button type="button" className="arw" aria-label="Previous projects" onClick={() => go(-1)} disabled={pos.atStart}>
              <Arrow dir="prev" />
            </button>
            <button type="button" className="arw" aria-label="Next projects" onClick={() => go(1)} disabled={pos.atEnd}>
              <Arrow dir="next" />
            </button>
          </div>
        </div>

        <div
          ref={rail}
          className={`prail reveal${pos.atStart ? '' : ' fade-l'}${pos.atEnd ? '' : ' fade-r'}`}
          onScroll={sync}
          tabIndex={0}
          aria-label="Projects"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
          }}
        >
          {list.map((p, i) => (
            <ProjectCard key={p.title} p={p} num={pad(i + 1)} />
          ))}
        </div>

        <div className="pcontrols">
          <span className="counter orb" aria-live="polite">
            {pad(Math.min(n, pos.index + 1))}
            {last > pos.index + 1 && `–${pad(last)}`} / {pad(n)}
          </span>
          <div className="progress">
            <span
              style={{
                left: `${(pos.index / Math.max(n, 1)) * 100}%`,
                width: `${((last - pos.index) / Math.max(n, 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
