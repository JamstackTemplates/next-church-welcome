import type { Metadata } from 'next';
import { ArcadeEdge, DrawnIcon, PaneStrip, Portrait, RidgeEdge, RoseWindow, StringLights, WelcomeSign } from '../components/church-art';
import { ChurchAddress, ChurchContactLinks, OfficeHours } from '../components/church-details';
import { Action, Kicker, Paragraph, SectionTitle } from '../components/church-layout';
import { SundayBulletin } from '../components/church-sections';
import { HomeNoticeboard } from '../components/event-board';
import { GoogleMap } from '../components/google-map';
import { Hero } from '../components/hero';
import { MinistryWindow } from '../components/ministry-window';
import { addressLine, business } from '../content/business';
import { events } from '../content/events';
import { budget } from '../content/giving';
import { featuredMinistryIds, ministries } from '../content/ministries';
import { team } from '../content/team';
import { sundayOrder } from '../content/services';
import { serviceTimesProse } from '../lib/church-content';
import { absoluteUrl } from '../lib/paths';
import { mapDirectionsUrl } from '../lib/maps';
import { displayTime } from '../lib/schedule';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };
const pastor = team.find(person => person.id === 'ruth-okafor');
const coffeeTime = sundayOrder.find(item => item.id === 'coffee')?.time;
const localCare = budget.find(item => item.id === 'local-care');

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    <Hero>
      <Hero.Kicker>Hope Valley · Asheville, NC</Hero.Kicker>
      <Hero.Heading>There's a seat<br className="hidden sm:block" /> <em>saved</em> for you.</Hero.Heading>
      <Hero.Introduction>Sundays at {serviceTimesProse} in Hope Valley. Come as you are: coffee’s on{coffeeTime && ` from ${displayTime(coffeeTime)}`}, kids have their own adventure, and nobody will put you on the spot.</Hero.Introduction>
      <Hero.Actions>
        <Hero.Action href="/visit/">Plan your first Sunday</Hero.Action>
        <Hero.Action href="/events/" quiet>See this month’s events</Hero.Action>
      </Hero.Actions>
      <div className="hero-details">
        <Hero.Board />
        <Hero.Address />
      </div>
    </Hero>

    <section className="light-beams bg-surface">
      <div className="wrap section-space grid items-center gap-8 pt-6! md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div className="letter max-w-2xl px-5 py-7 sm:px-10 sm:py-10">
          <Kicker>A note from our pastor</Kicker>
          <h2 className="mt-2 text-[clamp(2rem,4.5vw,4rem)] font-semibold tracking-[-.045em]">I’m glad you’re here.</h2>
          <p className="mt-4">Dear neighbour,</p>
          <p className="mt-3">If you’re new to the valley, you might be looking for a place to catch your breath and get to know a few people. I hope you’ll spend a Sunday with us. Wear what you’re comfortable in and sit wherever you like. We’ll show you where the coffee is.</p>
          <p className="mt-3">I’m usually by the fellowship hall after worship. Come say hello if you have a minute.</p>
          {pastor && <div className="mt-5">
            <div className="font-hand text-4xl text-accent-ink">{pastor.name}</div>
            <div className="text-sm font-semibold text-muted">{pastor.role}</div>
          </div>}
        </div>
        <div className="grid grid-cols-[.76fr_1fr] items-end gap-2">
          {pastor && <Portrait person={pastor.id} />}
          <WelcomeSign />
        </div>
      </div>
    </section>

    <section>
      <RidgeEdge fill="var(--valley)" className="bg-surface" />
      <div className="contours bg-valley">
        <div className="wrap section-space pt-6!">
          <SundayBulletin>
            <Kicker>The Sunday bulletin</Kicker>
            <SectionTitle>Your Sunday morning</SectionTitle>
            <Paragraph>There’s time to grab a coffee before the early service, find the kids’ wing, or stay and catch up between services.</Paragraph>
            <Action quiet href="/visit/">What to expect on your first visit</Action>
          </SundayBulletin>
        </div>
      </div>
    </section>

    <ArcadeEdge />
    <section className="glass-band">
      <div className="wrap section-space grid gap-6 md:gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><Kicker>Through the week</Kicker><div className="mt-2"><SectionTitle>Find your people</SectionTitle></div></div>
          <Action href="/ministries/" quiet>See all ministries</Action>
        </div>
        <div className="glass-wall">
          {featuredMinistryIds.map(id => {
            const ministry = ministries.find(item => item.id === id);
            return ministry && <MinistryWindow compact ministry={ministry} key={id} />;
          })}
        </div>
      </div>
    </section>

    <section className="porch">
      <StringLights />
      <div className="wrap section-space grid gap-6 pt-10!">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><Kicker>The fellowship hall noticeboard</Kicker><div className="mt-2"><SectionTitle>Coming up in the valley</SectionTitle></div></div>
        <Action href="/events/" quiet>See all events</Action>
      </div>
      <HomeNoticeboard events={events} ministries={ministries} empty="Nothing pinned yet. Check back soon." />
      </div>
    </section>

    <section className="tracery-band bg-surface">
      <div className="wrap section-space grid items-center gap-7 sm:grid-cols-[.8fr_1fr] md:gap-15">
        <div className="sunburst mx-auto w-full max-w-72"><RoseWindow /></div>
        <div className="grid justify-items-start gap-3">
          <Kicker>Giving at Hope Valley</Kicker>
          <SectionTitle>{localCare ? <><span className="block text-[clamp(4.5rem,9vw,8rem)] leading-none text-accent-ink tabular-nums">{localCare.percent}%</span> for the pantry and local care</> : 'Giving in the valley'}</SectionTitle>
          <Paragraph>Your gifts help put groceries on the table for neighbours in the valley. Guests are never expected to give.</Paragraph>
          <Action href="/giving/" quiet>See where giving goes</Action>
        </div>
      </div>
    </section>

    <PaneStrip />
    <section className="contours contours--faint">
    <div className="wrap section-space grid items-center gap-9 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <GoogleMap address={addressLine} title="Google map for Hope Valley Community Church’s sample address in Asheville" />
      <div className="grid gap-4">
        <Kicker>Laurel Hollow Road</Kicker>
        <SectionTitle>Find us</SectionTitle>
        <div className="flex gap-3"><DrawnIcon name="pin" className="mt-0.5 text-accent-ink" /><ChurchAddress /></div>
        <a className="text-link w-fit" href={mapDirectionsUrl(addressLine)}>Get directions</a>
        <Paragraph>{business.landmark}</Paragraph>
        <Paragraph>{business.parking}</Paragraph>
        <OfficeHours showBadge />
        <ChurchContactLinks />
      </div>
    </div>
    </section>
  </>;
}
