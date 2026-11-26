import type { Metadata } from 'next';
import { PageArt } from '../../components/church-art';
import { Action, SectionTitle } from '../../components/church-layout';
import { WeeklyRhythms } from '../../components/church-sections';
import { EventCalendar } from '../../components/event-board';
import { PageHead } from '../../components/page-head';
import { events } from '../../content/events';
import { ministries } from '../../content/ministries';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Events',
  description: 'See seasonal events and regular weekly gatherings at Hope Valley Community Church.',
  alternates: { canonical: absoluteUrl('/events/') },
};

export default function EventsPage() {
  return <>
    <PageHead art={<PageArt scene="events" />} edge="var(--spotlight)">
      <PageHead.Kicker>Events</PageHead.Kicker>
      <PageHead.Title>What’s on at Hope Valley</PageHead.Title>
      <PageHead.Intro>Here’s what’s pinned to the fellowship hall noticeboard, from potlucks and pantry drives to seasonal services.</PageHead.Intro>
    </PageHead>
    <EventCalendar events={events} ministries={ministries}
      heading="Next on the board" empty="Nothing pinned yet. Check back soon."
      noMatch="Nothing pinned for this audience." />
    <section className="bg-surface">
      <div className="wrap section-space grid gap-6">
        <SectionTitle>Weekly rhythms</SectionTitle>
        <WeeklyRhythms />
        <p>Events marked RSVP: send us a note through <Action href="/contact/" quiet>Contact</Action> so we can plan food and seats. We’ll reply to your enquiry.</p>
      </div>
    </section>
  </>;
}
