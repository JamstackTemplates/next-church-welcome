import type { CSSProperties, ReactNode } from 'react';
import { addressLine } from '../content/business';
import { asset } from '../lib/paths';
import { DrawnIcon, RidgeEdge } from './church-art';
import { Action, Kicker } from './church-layout';
import { HymnBoard } from './hymn-board';

// The home page painting: a white clapboard chapel in a Blue Ridge hollow with its red doors open,
// neighbours walking up the path on a Sunday morning (public/hero-light.webp), or the same scene at a
// candlelit evening service (public/hero-dark.webp). The `.hero-scene` styles in app/tailwind.input.css
// pick the pair so it follows the theme toggle, and only the active theme's image is downloaded.
function HeroScene() {
  const style = {
    '--hero-light': `url("${asset('/hero-light.webp')}")`,
    '--hero-dark': `url("${asset('/hero-dark.webp')}")`,
  } as CSSProperties;
  return <div className="hero-scene" style={style} role="img"
    aria-label="Painting of neighbours walking up a path to a white country chapel with its red doors open, under a big oak in the Blue Ridge hills" />;
}

function HeroSection({ children }: { children: ReactNode }) {
  return <section className="hero">
    <HeroScene />
    <div className="wrap hero-layout">
      <div className="hero-copy">{children}</div>
    </div>
    <RidgeEdge className="hero-edge" />
  </section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h1 className="hero-title">{children}</h1>;
}
function Introduction({ children }: { children: ReactNode }) {
  return <p className="hero-intro">{children}</p>;
}
function Actions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">{children}</div>;
}
function Board() {
  return <div className="hero-board"><HymnBoard live /></div>;
}
function Address() {
  return <address className="flex max-w-full items-start gap-2 text-sm font-semibold not-italic">
    <DrawnIcon className="text-accent-ink" name="pin" />{addressLine}
  </address>;
}

export const Hero = Object.assign(HeroSection, { Kicker, Heading, Introduction, Actions, Action, Board, Address });
