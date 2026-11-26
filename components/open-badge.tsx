"use client";
import { useChurchClock } from './church-clock';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Optional. Neutral static output; browser refreshes in the business zone every minute. */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const now = useChurchClock();
  const label = now ? openingLabel(hours, site.timeZone, now) : 'See opening hours';
  return <span>{label.replace('opening hours', 'office hours')}</span>;
}
