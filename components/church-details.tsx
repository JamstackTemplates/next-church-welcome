import { business } from '../content/business';
import { clockTime } from '../lib/schedule';
import { OpenBadge } from './open-badge';
import { DrawnIcon } from './church-art';

export function ChurchAddress() {
  const { street, locality, region, postalCode } = business.address;
  return <address className="not-italic">{street}<br />{locality}, {region} {postalCode}</address>;
}

export function ChurchContactLinks() {
  return <ul className="grid gap-2">
    <li className="flex min-w-0 items-start gap-2"><DrawnIcon className="mt-0.5" name="envelope" />
      <a className="underline wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></li>
    <li className="flex items-center gap-2"><DrawnIcon name="phone" />
      <a className="underline" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></li>
  </ul>;
}

const hourGroups = business.officeHours.reduce<{ days: string[]; opens?: string; closes?: string }[]>((groups, entry) => {
  const { day, opens, closes } = entry;
  const previous = groups.at(-1);
  if (previous && previous.opens === opens && previous.closes === closes) previous.days.push(day);
  else groups.push({ days: [day], opens, closes });
  return groups;
}, []);

export function OfficeHours({ showBadge = false }: { showBadge?: boolean }) {
  return <div className="grid gap-2">
    <h3 className="font-display text-xl font-bold">Office hours</h3>
    {showBadge && <p className="w-fit rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold"><OpenBadge hours={business.officeHours} /></p>}
    <dl className="grid w-fit gap-x-5 gap-y-0.5 text-sm [grid-template-columns:auto_auto]">
      {hourGroups.map(({ days, opens, closes }) => <div key={days[0]} className="contents">
        <dt>{days[0]}{days.length > 1 ? `–${days.at(-1)}` : ''}</dt>
        <dd>{opens && closes ? `${clockTime(opens)}–${clockTime(closes)}` : 'Closed'}</dd>
      </div>)}
    </dl>
  </div>;
}
