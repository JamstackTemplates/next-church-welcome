import { business } from '../content/business';
import { serviceTimes } from '../lib/church-content';
import { RidgeEdge, SteepleMark } from './church-art';
import { ChurchAddress, ChurchContactLinks, OfficeHours } from './church-details';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return <footer>
    <RidgeEdge fill="var(--valley)" />
    <div className="site-footer bg-valley px-0 pb-7 pt-5">
      <div className="wrap">
        <div className="grid gap-9 pb-10 md:grid-cols-[1.15fr_1fr_1fr]">
          <div className="grid content-start gap-2">
            <SiteLink href="/" className="flex w-fit items-center gap-2 font-display text-2xl leading-tight font-bold"><SteepleMark />{business.name}</SiteLink>
            <ChurchAddress />
            <p className="max-w-64 text-sm text-muted">{business.landmark}</p>
          </div>
          <div className="grid content-start gap-3">
            <h2 className="text-2xl font-bold">Sundays at {serviceTimes}</h2>
            <OfficeHours />
          </div>
          <div className="grid content-start gap-3">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <ChurchContactLinks />
            <SiteLink className="text-link w-fit" href="/contact/">Contact the office</SiteLink>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-current/20 pt-4">
          <span className="font-hand text-3xl">All are welcome.</span>
          <small className="text-sm text-muted">Hope Valley is a fictional church created for the Jamstacks gallery.</small>
        </div>
      </div>
    </div>
  </footer>;
}
