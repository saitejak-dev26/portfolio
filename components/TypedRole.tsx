'use client';

import { useEffect, useState } from 'react';

/** Types out each role, pauses, deletes it, then moves to the next. */
export default function TypedRole({ roles }: { roles: string[] }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(roles[0]);
      return;
    }
    let w = 0;
    let c = 0;
    let deleting = false;
    let hold = 0;
    const id = window.setInterval(() => {
      const word = roles[w];
      if (hold > 0) {
        hold -= 1;
        return;
      }
      if (!deleting) {
        if (c < word.length) c += 1;
        else {
          deleting = true;
          hold = 28;
        }
      } else if (c > 0) {
        c -= 1;
      } else {
        deleting = false;
        w = (w + 1) % roles.length;
        hold = 4;
      }
      setText(roles[w].slice(0, c));
    }, 75);
    return () => window.clearInterval(id);
  }, [roles]);

  return (
    <>
      {text}
      <span className="caret" aria-hidden="true" />
      <span className="sr-only">{roles.join(', ')}</span>
    </>
  );
}
