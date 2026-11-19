'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS = ['Full-time role', 'Freelance project', 'Collaboration', 'Just saying hi'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Posts to /contact.php (runs on Hostinger, sends the email with PHP mail()).
 * If the endpoint is unavailable (e.g. `npm run dev` locally), it falls back to opening
 * the visitor's email app with the message pre-filled.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '', company: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  // Which field the current error belongs to, so it can be announced and linked to that input.
  const [errorField, setErrorField] = useState<'name' | 'email' | 'message' | null>(null);
  const [usedMailto, setUsedMailto] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError('');
    setErrorField(null);
  };

  const fail = (field: 'name' | 'email' | 'message', msg: string) => {
    setErrorField(field);
    setError(msg);
    document.getElementById(`cf-${field === 'message' ? 'msg' : field}`)?.focus();
  };

  function openMailto() {
    const subject = `[Portfolio] ${form.topic} — ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setUsedMailto(true);
    setStatus('sent');
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim()) return fail('name', 'Please add your name.');
    if (!EMAIL_RE.test(form.email.trim())) return fail('email', 'Please enter a valid email address.');
    if (form.message.trim().length < 10) return fail('message', 'Please write a short message (at least 10 characters).');

    setStatus('sending');
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        setUsedMailto(false);
        setStatus('sent');
        setForm({ name: '', email: '', topic: TOPICS[0], message: '', company: '' });
        return;
      }
      if (data?.error) {
        setStatus('error');
        setError(data.error);
        return;
      }
      openMailto();
    } catch {
      openMailto();
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-title">
        <span className="orb">Send a message</span>
        <span>Goes straight to {site.email}</span>
      </div>

      {/* Honeypot: hidden from people, bots fill it in and get rejected. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">
            Your name <span aria-hidden="true" className="req">*</span>
          </label>
          <input id="cf-name" className="fin" aria-required="true" aria-invalid={errorField === 'name'} aria-describedby={errorField === 'name' ? 'cf-error' : undefined} type="text" autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="cf-email">
            Your email <span aria-hidden="true" className="req">*</span>
          </label>
          <input id="cf-email" className="fin" aria-required="true" aria-invalid={errorField === 'email'} aria-describedby={errorField === 'email' ? 'cf-error' : undefined} type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-topic">What’s it about?</label>
        <select id="cf-topic" className="fin" value={form.topic} onChange={set('topic')}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-msg">
          Message <span aria-hidden="true" className="req">*</span>
        </label>
        <textarea id="cf-msg" className="fin" aria-required="true" aria-invalid={errorField === 'message'} aria-describedby={errorField === 'message' ? 'cf-error' : undefined} rows={5} placeholder="Tell me a little about the role or project…" value={form.message} onChange={set('message')} />
      </div>

      {error && (
        <span id="cf-error" role="alert" className="form-error">
          {error}
        </span>
      )}

      <button type="submit" className="sbtn gbg" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>

      <p className="form-note">
        Your details are only used to reply to you — never shared, no tracking, no newsletters.
      </p>

      {status === 'sent' && (
        <span role="status" className="form-ok">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {usedMailto
            ? `Your email app should open with the message ready — just press send. If it doesn’t, write to ${site.email}.`
            : 'Thanks! Your message has been sent — I’ll get back to you soon.'}
        </span>
      )}
    </form>
  );
}
