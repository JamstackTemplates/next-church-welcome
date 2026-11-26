import type { Metadata } from 'next';
import { PageArt, RoseWindow, WelcomeSign } from '../../components/church-art';
import { Action, Kicker, Paragraph, SectionTitle } from '../../components/church-layout';
import { OfferingEnvelope, PantryItem, PantryShelf } from '../../components/church-sections';
import { PageHead } from '../../components/page-head';
import { addressLine } from '../../content/business';
import { budget } from '../../content/giving';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Giving',
  description: 'See where giving goes at Hope Valley, how to give in person or by mail, and what the pantry needs.',
  alternates: { canonical: absoluteUrl('/giving/') },
};

export default function GivingPage() {
  return <>
    <PageHead art={<PageArt scene="giving" />}>
      <PageHead.Kicker>Give</PageHead.Kicker>
      <PageHead.Title>Giving at Hope Valley</PageHead.Title>
      <PageHead.Intro>Gifts buy groceries for the pantry, keep the lights on, and support the people who lead and care for our church.</PageHead.Intro>
    </PageHead>
    <section className="wrap grid items-center gap-2 border-b border-line py-7 sm:grid-cols-[15rem_1fr] sm:gap-8">
      <div aria-hidden="true" className="giving-note mx-auto w-48 sm:w-full">
        <WelcomeSign>Guests, please<br />don’t feel you<br />need to give.</WelcomeSign>
      </div>
      <div className="grid gap-2">
        <h2 className="sr-only">Guests, please don’t feel you need to give</h2>
        <Paragraph>We’re glad to have you with us. Come for coffee and stay for worship.</Paragraph>
      </div>
    </section>
    <section className="wrap section-space grid items-center gap-10 md:grid-cols-[.85fr_1fr] md:gap-17">
      <div className="mx-auto w-full max-w-md"><RoseWindow /></div>
      <div className="grid gap-5">
        <SectionTitle>Where it goes</SectionTitle>
        <dl className="grid gap-2">
          {budget.map(item => <div key={item.id} className="grid grid-cols-[3.9rem_1fr] gap-3 border-b border-line pb-2">
            <dt className="contents">
              <span className="font-display text-3xl font-extrabold text-accent-ink tabular-nums">{item.percent}%</span>
              <strong className="self-center">{item.label}</strong>
            </dt>
            <dd className="col-start-2 -mt-2 text-sm text-muted">{item.detail}</dd>
          </div>)}
        </dl>
      </div>
    </section>
    <section className="bg-surface">
      <div className="wrap section-space grid gap-6">
        <SectionTitle>Ways to give</SectionTitle>
        <ul className="grid gap-4 md:grid-cols-3">
          <OfferingEnvelope><h3 className="text-2xl font-bold">At church</h3><p className="mt-2">Drop your gift in the offering box at the back of the sanctuary.</p></OfferingEnvelope>
          <OfferingEnvelope><h3 className="text-2xl font-bold">By check</h3><p className="mt-2">Mail a check to the church at {addressLine}.</p></OfferingEnvelope>
          <OfferingEnvelope><h3 className="text-2xl font-bold">Recurring giving</h3><p className="mt-2"><Action href="/contact/" quiet>Ask the office</Action> about setting up a recurring gift through your bank.</p></OfferingEnvelope>
        </ul>
        <div className="grid gap-2 border-t border-line pt-5">
          <h3 className="text-2xl font-bold">Giving statements and finances</h3>
          <Paragraph>Ask the office about your annual giving statement. Our yearly finance summary is shared at the January members’ meeting. Ask the office for a copy.</Paragraph>
        </div>
      </div>
    </section>
    <section className="wrap section-space grid gap-7 lg:grid-cols-[.75fr_1fr] lg:items-end lg:gap-14">
      <div className="grid gap-3">
        <Kicker>Hope Valley Pantry</Kicker>
        <SectionTitle>Stock the pantry shelf</SectionTitle>
        <Paragraph>Bring non-perishables to the side entrance on Tuesdays during pantry hours or drop them off on Sundays.</Paragraph>
      </div>
      <PantryShelf>
        <PantryItem shape="jar">Peanut butter</PantryItem>
        <PantryItem shape="can">Canned beans</PantryItem>
        <PantryItem shape="jar">Rice</PantryItem>
        <PantryItem shape="box">Cereal</PantryItem>
        <PantryItem shape="box">Diapers</PantryItem>
        <PantryItem shape="can">Toiletries</PantryItem>
      </PantryShelf>
    </section>
  </>;
}
