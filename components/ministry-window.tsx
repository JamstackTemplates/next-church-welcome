import type { Ministry } from '../content/ministries';
import { clockTime } from '../lib/schedule';
import { DrawnIcon } from './church-art';
import { SiteLink } from './site-link';

export function MinistryWindow({ ministry, compact = false }: { ministry: Ministry; compact?: boolean }) {
  const { id, icon, name, meets, summary, audience, ages, glass, place } = ministry;
  const className = `glass-pane glass-${glass} ${compact ? 'glass-feature' : 'glass-full'}`;
  const ornament = <>
    <svg aria-hidden="true" viewBox="0 0 100 150" preserveAspectRatio="none" className="glass-tracery" fill="none" stroke="var(--lead)" strokeWidth="1">
      <path d="M50 0V22M2 42L28 25L50 38L72 25L98 42M2 108L28 124L50 111L72 124L98 108M50 126V150M2 70L20 76L2 89M98 70L80 76L98 89" />
    </svg>
    <DrawnIcon name={icon} className="mb-2.5 size-6!" />
  </>;
  if (compact) return <SiteLink href={`/ministries/#${id}`} className={className}>
    {ornament}<strong className="font-display text-base/none sm:text-lg/none">{name}</strong>
    <span className="mt-2 text-sm font-semibold">{meets ? `${meets.day}s` : 'As arranged'}</span>
  </SiteLink>;

  return <article id={id} data-audience={audience} className={className}>
    {ornament}
    <h3 className="text-2xl font-bold">{name}</h3>
    <p className="mt-1.5 text-sm font-bold capitalize">{audience}{ages ? ` · Ages ${ages}` : ''}</p>
    <p className="mt-2 border-y border-current/25 px-2 py-1 text-sm font-semibold">
      {meets ? `${meets.day}s · ${clockTime(meets.start)}–${clockTime(meets.end)}` : 'As arranged'}
    </p>
    <p className="mt-1.5 text-sm font-semibold">{place}</p>
    <p className="mt-2 max-w-72 text-base/snug">{summary}</p>
  </article>;
}
