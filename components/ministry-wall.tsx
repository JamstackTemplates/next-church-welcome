'use client';

import { useState } from 'react';
import type { Ministry } from '../content/ministries';
import { AudienceFilter, type Selection } from './audience-filter';
import { MinistryWindow } from './ministry-window';

export function MinistryWall({ ministries }: { ministries: readonly Ministry[] }) {
  const [selection, setSelection] = useState<Selection>('all');
  const visible = ministries.filter(item => selection === 'all' || item.audience === selection);
  return <div className="grid gap-6">
    <AudienceFilter selection={selection} onChange={setSelection} count={visible.length} noun="ministry" />
    <div className="glass-wall window-wall">
      {visible.map(ministry => <MinistryWindow key={ministry.id} ministry={ministry} />)}
      {!visible.length && <p className="col-span-full p-4 text-tile">There are no ministries listed for this group.</p>}
    </div>
  </div>;
}
