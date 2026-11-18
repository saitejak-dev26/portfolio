import type { Tag as TagT } from '@/lib/icons';
import TechIcon from './TechIcon';

export default function Tag({ tag, outline = false }: { tag: TagT; outline?: boolean }) {
  return (
    <span className={outline ? 'tag outline' : 'tag'}>
      <TechIcon icon={tag.icon} name={tag.name} size={outline ? 15 : 14} fallbackClass="mini" />
      {tag.name}
    </span>
  );
}
