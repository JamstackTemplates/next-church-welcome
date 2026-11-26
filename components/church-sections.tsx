import type { ReactNode } from 'react';
import { ministries } from '../content/ministries';
import { sundayOrder, services } from '../content/services';
import { DAYS } from '../lib/hours';
import { clockTime, displayTime } from '../lib/schedule';
import { DrawnIcon, Quatrefoil } from './church-art';

export function SundayBulletin({ children }: { children: ReactNode }) {
  return <div className="bulletin bulletin--spread grid gap-7 bg-bg p-5 sm:p-8 md:grid-cols-[1fr_1fr] md:gap-14 md:p-12 lg:gap-20">
    <div className="grid content-center gap-4">{children}</div>
    <ol className="grid gap-3">
      {sundayOrder.map(item => {
        const time = item.time ?? services.find(service => service.id === item.serviceId)?.start;
        if (!time) throw new Error(`sundayOrder.${item.id}.serviceId: unknown service ${item.serviceId}`);
        return <li key={item.id} className="border-b border-line pb-2 last:border-0 last:pb-0">
          <div className="order-row">
            <DrawnIcon name={item.icon} className="text-accent-ink" />
            <time className="font-display text-2xl/none font-extrabold tabular-nums" dateTime={time}>{displayTime(time)}</time>
            <span className="dot-rule" />
            <strong className="text-sm sm:text-base">{item.label}</strong>
          </div>
          <p className="mt-1 pl-8 text-sm text-muted">{item.detail}</p>
        </li>;
      })}
    </ol>
  </div>;
}

export function PewFAQ({ id, question, children }: { id: string; question: string; children: ReactNode }) {
  return <details id={id} className="pew-card px-5 py-3.5 md:even:translate-y-3">
    <summary className="relative pr-8 font-display text-xl font-bold">
      {question}
      <svg aria-hidden="true" viewBox="0 0 40 40" className="absolute top-0 right-0 w-7 text-accent-ink"><Quatrefoil /></svg>
    </summary>
    <p className="mt-2 max-w-lg text-muted">{children}</p>
  </details>;
}

export function IconItem({ icon, children }: { icon: string; children: ReactNode }) {
  return <li className="flex items-start gap-2.5"><DrawnIcon className="mt-0.5 text-accent-ink" name={icon} /><span>{children}</span></li>;
}

export function WeeklyRhythms() {
  return <ul className="week-strip grid gap-px border border-line bg-line">
    {DAYS.map(day => {
      const meetings = ministries.filter(ministry => ministry.meets?.day === day)
        .sort((a, b) => a.meets!.start.localeCompare(b.meets!.start));
      return <li key={day} className="paper min-w-0 p-3">
        <h3 className="text-lg font-bold">{day}</h3>
        <ul className="mt-2 grid gap-2">
          {meetings.map(ministry => <li className="border-t border-line pt-1.5 text-sm" key={ministry.id}>
            <time className="block font-semibold text-accent-ink" dateTime={ministry.meets!.start}>{clockTime(ministry.meets!.start)}</time>
            {ministry.name}
          </li>)}
        </ul>
      </li>;
    })}
  </ul>;
}

export function OfferingEnvelope({ children }: { children: ReactNode }) {
  return <li className="envelope-card min-h-42 px-7 pt-14 pb-7">
    <svg aria-hidden="true" viewBox="0 0 320 190" preserveAspectRatio="none" fill="none">
      <rect x="1" y="1" width="318" height="188" rx="4" fill="var(--surface)" stroke="var(--wood)" strokeWidth="2" />
      <path d="M3 187L160 70L317 187M3 3L160 59L317 3" stroke="var(--wood)" strokeOpacity=".52" />
      <circle cx="160" cy="58" r="8" fill="var(--accent)" />
    </svg>
    {children}
  </li>;
}

export function PantryShelf({ children }: { children: ReactNode }) {
  return <ul className="pantry-items">{children}</ul>;
}

export function PantryItem({ children, shape }: { children: ReactNode; shape: 'jar' | 'can' | 'box' }) {
  return <li>
    <svg aria-hidden="true" viewBox="0 0 100 110" preserveAspectRatio="none" stroke="#674d3a" strokeWidth="2">
      {shape === 'jar' && <>
        <path d="M21 19H79V29Q93 34 93 46V103Q93 108 86 108H14Q7 108 7 103V46Q7 34 21 29Z" fill="#dfc097" />
        <path d="M18 11H82V26H18Z" fill="#977450" /><path d="M23 15v7m8-7v7m8-7v7m8-7v7m8-7v7m8-7v7m8-7v7m8-7v7" stroke="#60452f" />
      </>}
      {shape === 'can' && <>
        <path d="M9 24Q50 14 91 24V102Q50 114 9 102Z" fill="#bdc9ad" />
        <ellipse cx="50" cy="24" rx="41" ry="8" fill="#dfd3b7" /><path d="M9 30Q50 40 91 30M9 98Q50 110 91 98" fill="none" />
      </>}
      {shape === 'box' && <>
        <path d="M8 20L24 9H88V101L76 108H8Z" fill="#dcaaa2" />
        <path d="M8 20H76L88 9M76 20V108" fill="none" />
      </>}
      <path d={`M11 43H${shape === 'box' ? 73 : 89}V94H11Z`} fill="#f6e9ca" strokeOpacity=".45" />
    </svg>
    {children}
  </li>;
}
