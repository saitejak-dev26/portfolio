'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import Logo from './Logo';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
];

// Sections that can be "current". Contact has no link (the CTA covers it) but still clears the highlight.
const spyIds = [...links.map((l) => l.id), 'contact'];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  // Scroll state + reading-progress line. Progress is written to a CSS variable so it doesn't re-render.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, y / max) : 0));
      setScrolled(y > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Scroll-spy: the current section is the last one whose top has passed the upper third of the viewport.
  useEffect(() => {
    const sections = spyIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = sections.at(-1)?.id ?? current;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Slide the highlight pill under the active link (desktop only; on mobile the links are a list).
  const placePill = useCallback(() => {
    const el = active ? linkRefs.current[active] : null;
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);
  useLayoutEffect(placePill, [placePill, scrolled]);
  useEffect(() => {
    window.addEventListener('resize', placePill);
    // Fonts can shift link widths after first paint.
    document.fonts?.ready.then(placePill);
    return () => window.removeEventListener('resize', placePill);
  }, [placePill]);

  // Mobile menu: close on Escape or when the viewport grows past the breakpoint; lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 861px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);
  const cls = ['nav', scrolled && 'scrolled', open && 'open'].filter(Boolean).join(' ');

  return (
    <header ref={header} className={cls}>
      <button type="button" aria-hidden="true" tabIndex={-1} className="nav-scrim" onClick={close} />
      <div className="nav-bar in">
        <a href="#top" className="brand" aria-label={`${site.name} — back to top`} onClick={close}>
          <span className="brand-mark">
            <Logo size={42} />
          </span>
        </a>

        <nav id="primary-nav" aria-label="Primary" className="nav-links">
          {pill && <span aria-hidden="true" className="nav-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} />}
          {links.map((l, i) => (
            <a
              key={l.id}
              ref={(el) => {
                linkRefs.current[l.id] = el;
              }}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              style={{ '--i': i } as React.CSSProperties}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href={site.resume} target="_blank" rel="noopener" download className="nav-icon" aria-label="Download CV" title="Download CV">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
            </svg>
          </a>
          <a href="#contact" className="nav-cta gbg" onClick={close}>
            Let’s talk
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <span aria-hidden="true" className="nav-progress" />
      </div>
    </header>
  );
}
