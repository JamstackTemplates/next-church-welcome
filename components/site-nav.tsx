'use client';

import { useRef } from 'react';
import { SiteLink } from './site-link';

const destinations = [
  ['/visit/', 'Visit'], ['/ministries/', 'Ministries'], ['/events/', 'Events'],
  ['/giving/', 'Give'], ['/contact/', 'Contact'],
];

export function SiteNav({ mobile = false }: { mobile?: boolean }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const links = <nav aria-label={mobile ? 'Mobile main menu' : 'Main menu'} className={mobile ? 'menu-panel absolute top-full right-0 mt-3 grid w-44 border border-line bg-bg px-4 py-2' : 'flex items-center gap-5 xl:gap-7'}>
    {destinations.map(([href, name]) => (
      <SiteLink key={href} href={href} markCurrent="page"
        onClick={mobile ? () => { disclosure.current?.removeAttribute('open'); } : undefined}
        className="py-2 font-semibold hover:text-accent-ink">{name}</SiteLink>
    ))}
  </nav>;
  if (!mobile) return <div className="hidden lg:block">{links}</div>;
  return <details className="mobile-menu relative lg:hidden" ref={disclosure}
    onKeyDown={event => {
      if (event.key === 'Escape' && disclosure.current?.open) {
        disclosure.current.open = false;
        disclosure.current.querySelector('summary')?.focus();
      }
    }}>
    <summary className="flex min-h-11 items-center gap-1.5 rounded-ui border border-line px-2.5 text-sm font-semibold">
      <svg aria-hidden="true" width="15" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 3h14M1 7h14M1 11h14" /></svg>
      Menu
    </summary>
    {links}
  </details>;
}
