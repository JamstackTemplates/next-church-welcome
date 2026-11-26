'use client';

import { useEffect, useState } from 'react';
import { audiences, type Audience } from '../content/ministries';

export type Selection = Audience | 'all';

export function AudienceFilter({ selection, onChange, count, noun }: {
  selection: Selection;
  onChange: (value: Selection) => void;
  count: number;
  noun: 'event' | 'ministry';
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <div className="filters flex flex-wrap items-center gap-2" hidden={!ready} role="group" aria-label={`Filter ${noun === 'event' ? 'events' : 'ministries'} by audience`}>
    {(['all', ...audiences] as const).map(value => (
      <button key={value} type="button" aria-pressed={selection === value} onClick={() => onChange(value)}
        className="min-h-11 rounded-[48%] border border-line bg-bg px-3.5 py-1.5 text-sm font-semibold capitalize">{value}</button>
    ))}
    <span className="ml-1 text-sm text-muted" role="status">
      {count} {count === 1 ? noun : noun === 'event' ? 'events' : 'ministries'}
    </span>
  </div>;
}
