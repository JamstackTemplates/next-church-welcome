import type { Metadata } from 'next';
import { DrawnIcon, PageArt, Quatrefoil, VisitMap } from '../../components/church-art';
import { Action, Kicker, Paragraph, SectionTitle } from '../../components/church-layout';
import { IconItem, PewFAQ } from '../../components/church-sections';
import { HymnBoard } from '../../components/hymn-board';
import { PageHead } from '../../components/page-head';
import { faqs, visitSteps } from '../../content/visit';
import { sundayServices } from '../../lib/church-content';
import { absoluteUrl } from '../../lib/paths';
import { clockTime } from '../../lib/schedule';

export const metadata: Metadata = {
  title: 'Plan your first Sunday',
  description: 'From the parking lot to the pew, see what to expect on your first Sunday at Hope Valley.',
  alternates: { canonical: absoluteUrl('/visit/') },
};

export default function VisitPage() {
  return <>
    <PageHead art={<PageArt scene="visit" />}>
      <PageHead.Kicker>Plan a visit</PageHead.Kicker>
      <PageHead.Title>Your first Sunday, start to finish</PageHead.Title>
      <PageHead.Intro>From the big oak to the fellowship hall, here’s how to find your way around on your first morning with us.</PageHead.Intro>
    </PageHead>
    <section className="wrap section-space grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <div className="grid gap-4">
        <SectionTitle>Follow the red doors</SectionTitle>
        <VisitMap />
      </div>
      <ol className="grid gap-3 border-t border-line lg:mt-4">
        {visitSteps.map(step => <li key={step.id} id={step.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-line py-3">
          <span aria-hidden="true" className="hymn-tile justify-center! font-display text-xl font-bold">{step.number}</span>
          <div><h3 className="text-xl font-bold">{step.title}</h3><p className="mt-1 text-muted">{step.detail}</p></div>
          <DrawnIcon name={step.icon} className="hidden text-accent-ink sm:block" />
        </li>)}
      </ol>
    </section>
    <section className="wood-band">
      <div className="wrap section-space grid items-center gap-7 lg:grid-cols-[1fr_2.3fr] lg:gap-12">
        <div className="grid gap-5">
          <SectionTitle>Two Sunday services</SectionTitle>
          <div className="max-w-xs"><HymnBoard /></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sundayServices.map(service => <article className="bulletin grid content-start gap-3 bg-bg p-5 text-ink sm:p-7" key={service.id}>
            <h3 className="text-3xl font-bold">{service.name}</h3>
            <p className="text-sm font-bold text-accent-ink">{clockTime(service.start)}–{clockTime(service.end)}</p>
            <p>{service.style}</p><p>{service.childcare}</p><p>{service.notes}</p>
          </article>)}
        </div>
      </div>
      {sundayServices.length > 1 && <p className="wrap pb-6 text-sm font-semibold">Coffee hour runs from {clockTime(sundayServices[0].end)} to {clockTime(sundayServices[1].start)} between services.</p>}
    </section>
    <section className="wrap section-space">
      <Kicker>Before you come</Kicker>
      <div className="mt-2"><SectionTitle>Common questions</SectionTitle></div>
      <div className="mt-7 grid items-start gap-4 md:grid-cols-2">
        {faqs.map(faq => <PewFAQ key={faq.id} id={faq.id} question={faq.question}>{faq.answer}</PewFAQ>)}
      </div>
    </section>
    <section className="access-band bg-surface">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="access-watermark"><Quatrefoil /></svg>
      <div className="wrap section-space grid gap-6 md:grid-cols-[.75fr_1fr]">
        <div><SectionTitle>Getting settled</SectionTitle><div className="mt-3"><Paragraph>Ask a greeter or get in touch ahead of Sunday if there’s anything else that would make your visit easier.</Paragraph></div></div>
        <ul className="grid content-center gap-3 sm:grid-cols-2">
          <IconItem icon="ramp">Step-free ramp to the entrance</IconItem>
          <IconItem icon="hearing">Hearing loop in the sanctuary</IconItem>
          <IconItem icon="bulletin">Large-print bulletins at the door</IconItem>
          <IconItem icon="parking">Reserved accessible spaces by the ramp</IconItem>
          <IconItem icon="communion">Gluten-free communion option</IconItem>
          <IconItem icon="door">Nursing room off the foyer</IconItem>
        </ul>
      </div>
    </section>
    <section className="door-call border-b border-line bg-valley py-13 text-center sm:py-21">
      <div className="mx-auto grid w-[72%] max-w-2xl justify-items-center gap-5">
        <SectionTitle>Let us know you’re coming</SectionTitle>
        <Paragraph>Tell us which service you’re thinking about or ask us a question. We’ll reply to help you get ready.</Paragraph>
        <Action href="/contact/">Contact us about your visit</Action>
      </div>
    </section>
  </>;
}
