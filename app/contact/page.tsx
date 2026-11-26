import type { Metadata } from 'next';
import { business } from '../../content/business';
import { team } from '../../content/team';
import { PageArt, Portrait } from '../../components/church-art';
import { ChurchAddress, ChurchContactLinks, OfficeHours } from '../../components/church-details';
import { CopyEmail } from '../../components/copy-email';
import { Paragraph, SectionTitle } from '../../components/church-layout';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = { title: 'Contact', description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') } };

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead art={<PageArt scene="contact" />}>
      <PageHead.Kicker>Contact</PageHead.Kicker>
      <PageHead.Title>We’d love to hear from you</PageHead.Title>
      <PageHead.Intro>{business.enquiries.introduction}</PageHead.Intro>
    </PageHead>
    <div className="wrap section-space grid items-start gap-9 md:grid-cols-[1.1fr_1fr] md:gap-13">
      <section className="bulletin grid gap-3 bg-surface p-5 sm:p-8" aria-labelledby="write">
        <SectionTitle id="write">{business.enquiries.title}</SectionTitle>
        <Paragraph>Ask a question, tell us you’re thinking of visiting, or send an RSVP enquiry for an event. You can also send a prayer request or an enquiry about a baptism, wedding, funeral, pastoral visit or using the fellowship hall.</Paragraph>
        <p>{business.enquiries.reply}</p>
        {hosted
          ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
          : <p className="mt-2 border-t border-line pt-4">Write to <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>.</p>}
      </section>
      <aside aria-label="Message guidance and office details" className="grid content-start gap-5">
        <div>
          <h2 className="text-3xl font-semibold">Helpful to include</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted">
            <li>Which Sunday and service you’re thinking of visiting.</li>
            <li>Kids’ names and ages if they’ll join Kids’ Trail.</li>
            <li>Any access needs.</li>
            <li>For an event RSVP enquiry, its name and how many are coming.</li>
            <li>For a wedding or hall enquiry, the date you have in mind and expected numbers.</li>
            <li>A phone number if you’d prefer a call back.</li>
          </ul>
        </div>
        <p className="border-l-2 border-accent bg-surface p-3">Prayer requests are read only by the pastoral team. Tell us if it’s fine to share with the prayer chain.</p>
        <div className="grid gap-3">
          <h2 className="text-3xl font-semibold">Church office</h2>
          <ChurchContactLinks />
          <div className="flex flex-wrap items-center gap-2"><CopyEmail email={business.email} /></div>
          <OfficeHours showBadge />
          <ChurchAddress />
        </div>
      </aside>
    </div>
    <section className="bg-surface">
      <div className="wrap section-space grid gap-6">
        <SectionTitle>Meet the team</SectionTitle>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map(person => <li key={person.id} className="grid content-start justify-items-center gap-1 text-center">
            <div className="mb-2 w-full max-w-37"><Portrait person={person.id} /></div>
            <h3 className="text-xl font-bold">{person.name}</h3>
            <p className="text-sm font-bold text-accent-ink">{person.role}</p>
            <p className="max-w-52 text-sm text-muted">{person.line}</p>
          </li>)}
        </ul>
      </div>
    </section>
  </>;
}
