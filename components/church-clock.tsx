'use client';

import { useEffect, useState } from 'react';
import { nextServiceLabel } from '../lib/schedule';
import { site } from '../lib/site';
import type { Service } from '../content/services';

export function useChurchClock(enabled = true) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const current = new Date();
      setNow(current);
      timer = setTimeout(update, 60_000 - current.getTime() % 60_000);
    };
    update();
    return () => clearTimeout(timer);
  }, [enabled]);
  return now;
}

export function NextService({ services }: { services: readonly Service[] }) {
  const now = useChurchClock();
  return <span className="hymn-note">{now ? nextServiceLabel(services, site.timeZone, now) : 'Every Sunday'}</span>;
}
