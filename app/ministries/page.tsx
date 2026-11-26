import type { Metadata } from 'next';
import { PageArt } from '../../components/church-art';
import { Action, SectionTitle } from '../../components/church-layout';
import { MinistryWall } from '../../components/ministry-wall';
import { PageHead } from '../../components/page-head';
import { ministries } from '../../content/ministries';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Ministries',
  description: 'Find groups for kids, teens, adults and seniors at Hope Valley, along with the choir and pantry.',
  alternates: { canonical: absoluteUrl('/ministries/') },
};

export default function MinistriesPage() {
  return <>
    <PageHead art={<PageArt scene="ministries" />}>
      <PageHead.Kicker>Ministries</PageHead.Kicker>
      <PageHead.Title>Find your people</PageHead.Title>
      <PageHead.Intro>Share a meal, sing with the choir, or find a small group close to home. Here’s who meets and when.</PageHead.Intro>
    </PageHead>
    <section className="wrap section-space" aria-label="Ministry groups">
      <MinistryWall ministries={ministries} />
    </section>
    <section className="wood-band">
      <div className="wrap section-space grid items-center gap-6 md:grid-cols-[.75fr_1fr] md:gap-16">
        <p className="font-display text-2xl font-semibold"><strong className="block text-[clamp(5rem,16vw,12rem)] leading-[.85] tracking-[-.06em]">60+</strong> volunteers keep Hope Valley running.</p>
        <div className="grid justify-items-start gap-4">
          <SectionTitle>Every ministry here is run by volunteers</SectionTitle>
          <ul className="list-disc space-y-1 pl-5">
            <li>Welcome people at the red doors or pour coffee.</li>
            <li>Sort groceries or pack bags at the pantry.</li>
            <li>Help with kids’ activities, bring a meal, or make a care visit.</li>
          </ul>
          <Action href="/contact/" quiet>Ask about serving</Action>
        </div>
      </div>
    </section>
  </>;
}
