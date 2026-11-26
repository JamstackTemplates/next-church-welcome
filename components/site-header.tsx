import { DarkModeToggle } from 'jamstacks';
import { PaneStrip, SteepleMark } from './church-art';
import { SiteLink } from './site-link';
import { SiteNav } from './site-nav';
import { business } from '../content/business';
import { serviceTimes } from '../lib/church-content';

export function SiteHeader() {
  const wordmark = business.name.match(/^(.*) (Community Church)$/);
  return <header className="paper relative z-10">
    <div className="wrap flex min-h-18 items-center justify-between gap-2 py-2.5 lg:min-h-22 lg:gap-5">
      <SiteLink href="/" aria-label={business.name} className="flex min-w-0 shrink items-center gap-1.5 hover:no-underline sm:gap-2.5">
        <span className="wordmark-mark w-8 shrink-0 text-accent-ink sm:w-11"><SteepleMark /></span>
        <span className="wordmark grid font-display text-[clamp(.98rem,4.5vw,1.7rem)] font-bold tracking-[-.03em]">
          {wordmark ? <>{wordmark[1]}<span className="mt-1 font-sans text-[clamp(.56rem,2vw,.68rem)] font-bold tracking-[.11em] uppercase">{wordmark[2]}</span></> : business.name}
        </span>
      </SiteLink>
      <div className="hidden xl:block"><span className="hymn-tile font-display text-sm font-bold">Sundays {serviceTimes}</span></div>
      <SiteNav />
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <DarkModeToggle />
        <SiteNav mobile />
      </div>
    </div>
    <PaneStrip compact />
  </header>;
}
