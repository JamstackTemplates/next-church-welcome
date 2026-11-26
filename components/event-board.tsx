'use client';

import { useState, type ReactNode } from 'react';
import type { ChurchEvent } from '../content/events';
import type { Ministry } from '../content/ministries';
import { clockTime, dateLabel, localClock, orderedEvents, upcomingEvents } from '../lib/schedule';
import { site } from '../lib/site';
import { AudienceFilter, type Selection } from './audience-filter';
import { BoardFrame } from './board-frame';
import { useChurchClock } from './church-clock';
import { SiteLink } from './site-link';

function useEventDate() {
  const now = useChurchClock(Boolean(site.timeZone));
  return now ? localClock(now, site.timeZone).date : null;
}

function Flyer({ event, ministry }: { event: ChurchEvent; ministry?: Ministry }) {
  const { id, title, date, start, end, place, rsvp, cost, summary } = event;
  return <article id={id} data-rsvp={rsvp} className="flyer">
    <div className="flex flex-wrap items-baseline gap-x-3 border-b border-current/25 pb-2">
      <time dateTime={date} className="font-display text-xl font-extrabold">{dateLabel(date, { month: 'short', day: 'numeric' })}</time>
      <span className="text-sm font-bold">{cost ? `$${cost}` : 'Free'}</span>
      {rsvp && <SiteLink href="/contact/" aria-label={`RSVP enquiry for ${title}`} className="text-sm font-bold underline">RSVP</SiteLink>}
    </div>
    <h3 className="mt-2 text-2xl font-bold">{title}</h3>
    <p className="mt-2 text-sm font-semibold">{clockTime(start)}–{clockTime(end)} · {place}</p>
    <p className="mt-2 text-base/snug">{summary}</p>
    {ministry && <SiteLink className="mt-2 inline-block text-sm font-bold underline" href={`/ministries/#${ministry.id}`}>{ministry.name}</SiteLink>}
  </article>;
}

function Flyers({ events, ministries = [], empty }: {
  events: readonly ChurchEvent[];
  ministries?: readonly Ministry[];
  empty: ReactNode;
}) {
  if (!events.length) return <p className="cork-empty">{empty}</p>;
  return <div className="flyer-list">
    {events.map(event => <Flyer key={event.id} event={event} ministry={ministries.find(item => item.id === event.ministryId)} />)}
  </div>;
}

export function HomeNoticeboard({ events, ministries, empty }: {
  events: readonly ChurchEvent[]; ministries: readonly Ministry[]; empty: ReactNode;
}) {
  const today = useEventDate();
  const upcoming = upcomingEvents(events, today).slice(0, 3);
  return <div className="cork grid gap-5 p-4 sm:p-7">
    {upcoming[0] && <p className="month-label -rotate-1 font-display leading-none">{dateLabel(upcoming[0].date, { month: 'long' })}</p>}
    <Flyers events={upcoming} ministries={ministries} empty={empty} />
  </div>;
}

export function EventCalendar({ events, ministries, heading, empty, noMatch }: {
  events: readonly ChurchEvent[];
  ministries: readonly Ministry[];
  heading: ReactNode;
  empty: ReactNode;
  noMatch: ReactNode;
}) {
  const today = useEventDate();
  const [selection, setSelection] = useState<Selection>('all');
  const upcoming = upcomingEvents(events, today);
  const next = upcoming[0];
  const visible = upcoming.filter(event => selection === 'all' || event.audience === selection);
  const months = new Set(orderedEvents(events).map(event => event.date.slice(0, 7)));

  return <>
    <section className="event-spotlight">
      <div className="wrap grid items-center gap-7 py-10 sm:grid-cols-[17rem_1fr] sm:gap-12">
        <BoardFrame>
          <h2>{heading}</h2>
          {next ? <div className="hymn-slots">
            <div className="hymn-tile"><strong><time dateTime={next.date}>{dateLabel(next.date, { month: 'short', day: 'numeric' })}</time></strong></div>
            <div className="hymn-tile"><strong><time dateTime={next.start}>{clockTime(next.start)}</time></strong></div>
          </div> : <p className="hymn-note">{empty}</p>}
        </BoardFrame>
        {next && <div className="grid max-w-xl gap-2">
          <p className="eyebrow">{dateLabel(next.date, { weekday: 'long' })} · {next.place}</p>
          <h2 className="section-title">{next.title}</h2>
          <p className="max-w-prose text-lg">{next.summary}</p>
        </div>}
      </div>
    </section>
    <section className="wrap section-space grid gap-8" aria-label="Events by month">
      <AudienceFilter selection={selection} onChange={setSelection} count={visible.length} noun="event" />
      {!months.size && <p>{empty}</p>}
      {Array.from(months, month => {
        const entries = visible.filter(event => event.date.startsWith(month));
        const hasUpcoming = upcoming.some(event => event.date.startsWith(month));
        return <section key={month} className="cork grid gap-6 p-4 sm:p-8">
          <h2 className="month-label -rotate-1">{dateLabel(`${month}-01`, { month: 'long', year: 'numeric' })}</h2>
          <Flyers events={entries} ministries={ministries} empty={hasUpcoming ? noMatch : empty} />
        </section>;
      })}
    </section>
  </>;
}
