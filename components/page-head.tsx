import type { ReactNode } from 'react';
import { RidgeEdge } from './church-art';
import { Kicker } from './church-layout';

/** `edge` is the background colour of the section that follows, so the ridgeline blends into it. */
function Head({ children, art, edge = 'var(--bg)' }: { children: ReactNode; art: ReactNode; edge?: string }) {
  return <header className="interior-head light-beams">
    <div className="wrap grid items-end gap-7 pt-10 md:grid-cols-[1.5fr_1fr] md:gap-16 md:pt-13">
      <div className="grid content-center gap-4 pb-4 md:min-h-61 md:pb-14">{children}</div>
      <div className="interior-art md:justify-self-end">{art}</div>
    </div>
    <RidgeEdge fill={edge} className="interior-edge" />
  </header>;
}

function Title({ children }: { children: ReactNode }) {
  return <h1 className="max-w-[12ch] text-[clamp(3rem,7.1vw,7rem)] leading-[.92] font-semibold tracking-[-.055em] text-balance">{children}</h1>;
}
function Intro({ children }: { children: ReactNode }) {
  return <p className="max-w-lg text-lg/relaxed text-muted">{children}</p>;
}

export const PageHead = Object.assign(Head, { Kicker, Title, Intro });
