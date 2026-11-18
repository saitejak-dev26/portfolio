import type { Icon } from '@/lib/icons';

type Props = { icon: Icon; name: string; size?: number; fallbackClass?: string };

/** Brand logo from Simple Icons, or neat initials when no logo exists. */
export default function TechIcon({ icon, name, size = 19, fallbackClass = 'initials' }: Props) {
  if (icon) {
    return (
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flex: 'none' }}>
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
    );
  }
  const initials = name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
  return (
    <span aria-hidden="true" className={fallbackClass}>
      {initials}
    </span>
  );
}
