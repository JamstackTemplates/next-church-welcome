import type { ReactNode } from 'react';
import { SiteLink } from './site-link';

export function Kicker({ children, centered = false }: { children: ReactNode; centered?: boolean }) {
  return <p className={`eyebrow ${centered ? 'eyebrow--center' : ''}`}>{children}</p>;
}

export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return <h2 id={id} className="section-title">{children}</h2>;
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="max-w-[38rem] text-base/relaxed text-muted sm:text-lg/relaxed">{children}</p>;
}

export function Action({ href, children, quiet = false }: { href: string; children: ReactNode; quiet?: boolean }) {
  return <SiteLink href={href} className={quiet ? 'text-link inline-block' : 'button'}>{children}</SiteLink>;
}

export function TileLink({ href, children }: { href: string; children: ReactNode }) {
  return <SiteLink href={href} className="hymn-tile justify-center! px-4! py-2! font-semibold">{children}</SiteLink>;
}
