'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '@/data/site';
import type { Tag as TagT } from '@/lib/icons';
import SectionTitle from './SectionTitle';
import Tag from './Tag';

export type ProjectView = Project & { tags: TagT[] };

type Filter = { label: string; color: string | null; test: (p: ProjectView) => boolean };

const FILTERS: Filter[] = [
  { label: 'All', color: null, test: () => true },
  { label: 'SaaS & CRM', color: 'var(--a1)', test: (p) => p.category === 'SaaS & CRM' },
  { label: 'Websites', color: 'var(--a2)', test: (p) => p.category === 'Website' },
  { label: 'In development', color: 'var(--warn)', test: (p) => !!p.inDevelopment },
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

function Status({ building }: { building?: boolean }) {
  return (
    <span className={building ? 'pc-status building' : 'pc-status'}>
      <span className="devdot" />
      {building ? 'In development' : 'Live'}
    </span>
  );
}

function ProjectCard({ p, num, i }: { p: ProjectView; num: string; i: number }) {
  const extra = p.tags.length - MAX_TAGS;
  const isLogo = p.imageFit === 'logo';
  return (
    <article className="pcard" style={{ '--i': i } as React.CSSProperties}>
      <div className={isLogo ? 'pc-shot' : 'pc-shot framed'} style={{ background: p.bg }}>
        {isLogo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.imageAlt} loading="lazy" draggable={false} className="logo-fit" />
            <Status building={p.inDevelopment} />
          </>
        ) : (
          // A small browser window so every screenshot reads as a product, not a cropped image.
          <div className="pc-window">
            <div className="pc-chrome" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <Status building={p.inDevelopment} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.imageAlt} loading="lazy" draggable={false} />
          </div>
        )}
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
            // The link stretches over the whole card (see .pc-link.stretch), so the card is one big target.
            <a href={p.live} target="_blank" rel="noopener" className="pc-link stretch" draggable={false}>
              Visit live
              <span aria-hidden="true" className="pc-go">
                ↗
              </span>
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
  const [pos, setPos] = useState({ index: 0, atStart: true, atEnd: false, visible: 1 });
  const [dragging, setDragging] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [tabPill, setTabPill] = useState<{ left: number; width: number } | null>(null);
  const drag = useRef({ x: 0, left: 0, moved: 0, lastX: 0, lastT: 0, v: 0 });

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
      visible: s ? Math.max(1, Math.round(el.clientWidth / s)) : 1,
    });
  }, [n]);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [filter, sync]);

  // Sliding pill behind the active filter.
  const placeTabPill = useCallback(() => {
    const el = tabRefs.current[filter];
    setTabPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [filter]);
  useLayoutEffect(placeTabPill, [placeTabPill]);
  useEffect(() => {
    window.addEventListener('resize', placeTabPill);
    document.fonts?.ready.then(placeTabPill);
    return () => window.removeEventListener('resize', placeTabPill);
  }, [placeTabPill]);

  const goTo = (index: number) => rail.current?.scrollTo({ left: index * step(), behavior: 'smooth' });
  const go = (dir: 1 | -1) => goTo(Math.max(0, Math.min(n - 1, pos.index + dir)));

  // Mouse drag-to-scroll. Touch and trackpads already scroll natively, so only plain mouse input is handled.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (!el || e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: 0, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (!el || !dragging) return;
    const d = drag.current;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = (e.clientX - d.lastX) / dt; // px per ms, for flick detection
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    d.moved = Math.max(d.moved, Math.abs(e.clientX - d.x));
    el.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (!el || !dragging) return;
    el.releasePointerCapture?.(e.pointerId);
    const s = step();
    const { v, moved } = drag.current;
    let target = s ? el.scrollLeft / s : 0;
    // A quick flick advances one card in the flick direction; otherwise settle on the nearest card.
    target = Math.abs(v) > 0.4 && moved > 10 ? (v < 0 ? Math.ceil(target) : Math.floor(target)) : Math.round(target);
    target = Math.max(0, Math.min(n - 1, target));
    el.scrollTo({ left: target * s, behavior: 'smooth' });
    // Re-enable scroll-snap once the glide finishes so it doesn't fight the animation.
    const done = () => setDragging(false);
    if ('onscrollend' in el) el.addEventListener('scrollend', done, { once: true });
    window.setTimeout(done, 700);
    // The click that follows pointerup is swallowed below; clear the flag after it so later clicks work.
    window.setTimeout(() => (drag.current.moved = 0), 0);
  };

  const dots = Math.max(1, n - pos.visible + 1);
  const shownTo = Math.min(n, pos.index + pos.visible);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionTitle ghost="Shipped" title="Selected work" />

        <div className="phead reveal">
          <div className="ptabs" role="group" aria-label="Filter projects by category">
            {tabPill && <span aria-hidden="true" className="ptab-pill" style={{ transform: `translateX(${tabPill.left}px)`, width: tabPill.width }} />}
            {FILTERS.map((f) => (
              <button
                key={f.label}
                ref={(el) => {
                  tabRefs.current[f.label] = el;
                }}
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
          key={filter}
          ref={rail}
          className={`prail reveal${pos.atStart ? '' : ' fade-l'}${pos.atEnd ? '' : ' fade-r'}${dragging ? ' dragging' : ''}`}
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          // Swallow the click that ends a drag so it doesn't open a project.
          onClickCapture={(e) => {
            if (drag.current.moved > 6) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = 0;
            }
          }}
          tabIndex={0}
          aria-label="Projects"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
          }}
        >
          {list.map((p, i) => (
            <ProjectCard key={p.title} p={p} num={pad(i + 1)} i={i} />
          ))}
        </div>

        <div className="pcontrols">
          <span className="sr-only" aria-live="polite">
            Showing projects {pos.index + 1} to {shownTo} of {n}
          </span>
          {dots > 1 && (
            <div className="pdots">
              {Array.from({ length: dots }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="pdot-btn"
                  aria-label={`Go to project ${i + 1}`}
                  aria-current={i === Math.min(pos.index, dots - 1) ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
