import * as simpleIcons from 'simple-icons';
import { tagIcons } from '@/data/site';

export type Icon = { path: string; hex: string } | null;

type SimpleIcon = { slug: string; path: string; hex: string };

// Build a slug → icon lookup once, at build time (server only).
const bySlug = new Map<string, SimpleIcon>();
for (const value of Object.values(simpleIcons) as unknown[]) {
  const icon = value as SimpleIcon;
  if (icon && typeof icon === 'object' && 'slug' in icon && 'path' in icon) {
    bySlug.set(icon.slug, icon);
  }
}

export function iconFor(slug?: string): Icon {
  if (!slug) return null;
  const icon = bySlug.get(slug);
  return icon ? { path: icon.path, hex: icon.hex } : null;
}

export type Tag = { name: string; icon: Icon };

export function tag(name: string): Tag {
  return { name, icon: iconFor(tagIcons[name]) };
}

export function initials(name: string): string {
  return name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
}
