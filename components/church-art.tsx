import type { CSSProperties, ReactNode } from 'react';
import { asset } from '../lib/paths';
import { budget } from '../content/giving';
import { visitSteps } from '../content/visit';

const lancet = 'M2 54V23Q2 12 17 2Q32 12 32 23V54Z';

export function Lancet({ glass = 'amber', className = '' }: { glass?: string; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 34 56" className={`lancet ${className}`}>
    <path d={lancet} fill={`var(--glass-${glass})`} stroke="var(--lead)" strokeWidth="2" />
    <path d="M17 3V53M2 24L17 35L32 24M2 41L17 27L32 41" fill="none" stroke="var(--lead)" strokeWidth="1.5" />
    <path d="M5 23Q6 15 15 8V29Z" fill="#fff3cb" opacity=".45" />
  </svg>;
}

export function PaneStrip({ compact = false }: { compact?: boolean }) {
  return <div aria-hidden="true" className={compact ? 'pane-strip pane-strip--small' : 'pane-strip'}>
    {Array.from({ length: compact ? 48 : 23 }, (_, index) =>
      <Lancet key={index} glass={['sky', 'amber', 'sage', 'rose', 'amber', 'sky'][index % 6]} />)}
  </div>;
}

export function SteepleMark() {
  return <svg aria-hidden="true" viewBox="0 0 46 48" width="44" height="46" fill="none">
    <path d="M3 45H43M8 45V25L23 13L38 25V45M16 18V11L23 3L30 11V18M23 1V8M4 28L23 12L42 28" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M17 45V32Q17 27 23 23Q29 27 29 32V45Z" fill="var(--glass-amber)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M23 24V45M17 33L23 37L29 33" stroke="currentColor" strokeWidth="1.4" />
  </svg>;
}

/** Layered Blue Ridge silhouettes used as a section edge. `fill` is the colour of the section below. */
export function RidgeEdge({ fill = 'var(--surface)', flip = false, className = '' }: { fill?: string; flip?: boolean; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className={`ridge-edge ${flip ? 'ridge-edge--flip' : ''} ${className}`}>
    <path fill="var(--hill-far)" opacity=".28" d="M0 70C90 46 150 30 236 44S392 22 470 34 604 64 700 48 860 6 960 24 1110 60 1196 44 1330 18 1440 34V120H0Z" />
    <path fill="var(--hill-mid)" opacity=".42" d="M0 86C110 70 170 54 262 66S420 88 520 72 690 40 792 58 940 92 1050 76 1300 60 1440 74V120H0Z" />
    <path fill="var(--hill-near)" opacity=".34" d="M0 100C120 88 220 80 330 90S520 106 640 94 820 76 930 88 1120 104 1230 94 1380 86 1440 90V120H0Z" />
    <path fill={fill} d="M0 108C160 100 300 98 452 104S760 114 906 106 1220 98 1440 104V120H0Z" />
  </svg>;
}

/** A sagging string of porch bulbs, like the fellowship hall porch in the hero painting. */
export function StringLights({ count = 18 }: { count?: number }) {
  const step = 1440 / count;
  return <svg aria-hidden="true" viewBox="0 0 1440 64" preserveAspectRatio="none" className="string-lights">
    <path d={Array.from({ length: count }, (_, n) => `${n === 0 ? 'M0 6' : ''}Q${n * step + step / 2} 40 ${(n + 1) * step} 6`).join('')} fill="none" stroke="var(--lead)" strokeWidth="1.5" opacity=".55" />
    {Array.from({ length: count }, (_, n) => {
      const x = n * step + step / 2;
      const glass = ['amber', 'rose', 'amber', 'sky', 'amber', 'sage'][n % 6];
      return <g key={n} className="bulb" style={{ animationDelay: `${(n % 5) * .7}s` }}>
        <rect x={x - 3} y="21" width="6" height="6" rx="1" fill="var(--lead)" />
        <ellipse cx={x} cy="34" rx="5.5" ry="8" fill={`var(--glass-${glass})`} />
      </g>;
    })}
  </svg>;
}

/** A row of pointed gothic arches: the top edge of the dark stained-glass band. */
export function ArcadeEdge() {
  return <div aria-hidden="true" className="arcade-edge" />;
}

export function WelcomeSign({ children }: { children?: ReactNode }) {
  return <div className="easel">
    <svg aria-hidden="true" viewBox="0 0 286 256">
      <path d="M112 50L78 249H89L137 57M161 52L218 248H230L181 49M139 54L172 231H180L155 54M95 199H213V213H92Z" fill="var(--wood)" stroke="#403029" strokeWidth="3" />
      <path d="M131 59V11H154V59Z" fill="#a4774e" stroke="#403029" strokeWidth="3" />
      <path d="M35 50L247 39L255 179L42 193Z" fill="#93613f" stroke="#403029" strokeWidth="3" />
      <path d="M47 61L236 50L243 166L53 180Z" fill="#3d3832" stroke="#d0a674" strokeWidth="2" />
      <path d="M61 70L225 60L231 156L63 166Z" fill="none" stroke="#dbbf97" strokeDasharray="2 5" opacity=".8" />
    </svg>
    <span className="easel-copy">{children ?? <>Welcome!<br />Coffee’s this way →</>}</span>
  </div>;
}

function point(radius: number, angle: number) {
  return [150 + radius * Math.cos(angle), 150 + radius * Math.sin(angle)].join(' ');
}
export function RoseWindow() {
  let angle = -Math.PI / 2;
  return <svg role="img" aria-label="Rose window with glass segments proportional to the five budget allocations" viewBox="0 0 300 300" className="rose-window">
    <circle cx="150" cy="150" r="146" fill="var(--wood)" stroke="var(--lead)" strokeWidth="4" />
    <circle cx="150" cy="150" r="135" fill="var(--tile)" stroke="var(--lead)" strokeWidth="3" />
    {budget.map(({ id, percent, glass }) => {
      const start = angle;
      const span = percent / 100 * 2 * Math.PI;
      const end = start + span;
      angle = end;
      const middle = start + span / 2;
      return <g key={id} fill={`var(--glass-${glass})`} stroke="var(--lead)" strokeWidth="2.6">
        {percent === 100 ? <circle cx="150" cy="150" r="125" />
          : <path d={`M150 150L${point(125, start)}A125 125 0 ${percent > 50 ? 1 : 0} 1 ${point(125, end)}Z`} />}
        <path d={`M${point(35, middle)}Q${point(74, start)} ${point(114, middle)}Q${point(74, end)} ${point(35, middle)}Z`} fill="#fff1bd" fillOpacity=".43" />
        <path d={`M${point(43, middle)}L${point(114, middle)}M${point(102, start)}Q${point(87, middle)} ${point(102, end)}`} fill="none" strokeWidth="1.4" />
      </g>;
    })}
    <circle cx="150" cy="150" r="27" fill="var(--glass-rose)" stroke="var(--lead)" strokeWidth="3" />
    <Quatrefoil x={150} y={150} />
  </svg>;
}

export function Quatrefoil({ x = 20, y = 20 }: { x?: number; y?: number }) {
  return <path transform={`translate(${x} ${y})`} d="M0-15Q8-15 7-7Q15-8 15 0Q15 8 7 7Q8 15 0 15Q-8 15-7 7Q-15 8-15 0Q-15-8-7-7Q-8-15 0-15Z" fill="none" stroke="currentColor" strokeWidth="1.5" />;
}

export function Portrait({ person }: { person: string }) {
  const profiles: Record<string, { skin: string; cloth: string; hair: string; outline: string }> = {
    'ruth-okafor': { skin: '#a76e51', cloth: '#a25354', hair: '#382b28', outline: 'M49 74Q30 60 40 46Q32 29 49 25Q52 8 70 16Q81 7 91 19Q111 16 114 36Q126 50 110 72L102 51Q76 55 61 42L57 72Z' },
    'daniel-reyes': { skin: '#bd8967', cloth: '#647e80', hair: '#47332c', outline: 'M52 66Q39 45 54 29Q60 18 84 20Q116 18 112 59L104 57L101 39Q80 44 64 35L60 61Z' },
    'mae-holloway': { skin: '#e3af89', cloth: '#b7854c', hair: '#88563b', outline: 'M44 110Q49 93 44 64Q37 37 59 24Q79 9 100 24Q121 33 115 73L123 105L102 109L102 50Q78 49 67 35Q54 60 62 104Z' },
    'tom-bennett': { skin: '#d8a88f', cloth: '#706780', hair: '#b5a292', outline: 'M51 59Q41 35 60 25Q81 16 103 29Q117 35 111 62L103 59L101 41Q79 46 61 38L57 60Z' },
  };
  const { skin, cloth, hair, outline } = profiles[person] ?? profiles['ruth-okafor'];
  return <svg aria-hidden="true" viewBox="0 0 160 170" className="portrait">
    <path d="M14 156V77Q14 35 80 4Q146 35 146 77V156Z" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
    <path d="M30 153Q34 124 62 114L73 103H91L105 115Q133 128 137 153Z" fill={cloth} stroke="#49352f" strokeWidth="2" />
    <path d="M64 113L69 96H93L99 113Q83 130 64 113Z" fill={skin} stroke="#49352f" strokeWidth="2" />
    <path d="M53 48Q80 26 106 49L107 73Q104 101 82 110Q61 103 55 79Z" fill={skin} stroke="#49352f" strokeWidth="2" />
    <path d={outline} fill={hair} stroke="#49352f" strokeWidth="2" />
    <path d="M80 66L76 80H82M73 92Q83 96 91 91M62 67L72 66M90 66L100 67" fill="none" stroke="#49352f" strokeWidth="1.6" strokeLinecap="round" />
    {person === 'tom-bennett' && <path d="M57 65H76V76H58ZM86 65H106L104 76H86ZM76 69H86" fill="none" stroke="#49352f" strokeWidth="2" />}
    {person === 'ruth-okafor' && <circle cx="55" cy="83" r="4" fill="#ebbe64" />}
    <path d="M20 156H140" stroke="var(--line)" strokeWidth="2" />
  </svg>;
}

export function VisitMap() {
  const points = [[97, 348], [193, 269], [249, 222], [426, 220], [372, 107], [501, 114]];
  return <svg role="img" aria-label="Illustrated visit path from the parking lot through the church to the fellowship hall" viewBox="0 0 580 420" className="visit-map">
    <rect width="580" height="420" fill="var(--surface)" />
    <path d="M0 354L141 420H0Z" fill="var(--hill-mid)" />
    <path d="M14 397L168 300L237 381L174 420H23Z" fill="var(--hill-near)" opacity=".66" />
    <path d="M170 294L220 260L263 308L216 339Z" fill="var(--glass-sage)" stroke="var(--muted)" />
    <path d="M202 61H550V254H220V292H167V235H202Z" fill="var(--bg)" stroke="var(--muted)" strokeWidth="3" />
    <path d="M202 61H550V179H353V205H202Z" fill="var(--glass-amber)" fillOpacity=".19" stroke="var(--muted)" />
    <path d="M454 61H550V179H454ZM388 179H467V254H388Z" fill="var(--glass-sky)" fillOpacity=".25" stroke="var(--muted)" />
    <path d="M221 234H277V245H221Z" fill="var(--wood)" />
    <path d="M166 251V280M389 208V242" strokeWidth="7" stroke="var(--accent)" />
    <path d="M388 209V242" strokeWidth="7" stroke="var(--glass-sky)" />
    <g fill="var(--wood)" opacity=".85">
      {[0, 1, 2, 3, 4].map(n => <path key={n} d={`M${222 + n * 23} 104h10v67h-10zm0-25h10v15h-10z`} />)}
    </g>
    <path d="M66 308V292M45 291Q39 275 54 269Q62 252 75 268Q95 267 94 283Q85 301 69 290Q55 301 45 291Z" stroke="var(--muted)" strokeWidth="2" fill="var(--glass-sage)" />
    <path d={`M${points.map(pair => pair.join(' ')).join('L')}`} fill="none" stroke="var(--accent-ink)" strokeWidth="3" strokeDasharray="5 7" strokeLinejoin="round" />
    {visitSteps.map(({ id, number }, index) => {
      const [x, y] = points[index] ?? [0, 0];
      return <g key={id}>
        <circle cx={x} cy={y} r="14" fill="var(--tile)" stroke="var(--accent)" strokeWidth="2" />
        <text x={x} y={y + 5} textAnchor="middle" fontWeight="700" fill="#3e3029">{number}</text>
      </g>;
    })}
    <g fill="var(--text)" fontWeight="600" fontSize="14">
      <text x="25" y="329">Big oak</text><text x="113" y="374">Parking</text><text x="163" y="335">Ramp</text>
      <text x="274" y="241">Welcome table</text><text x="399" y="245">Kids’ Trail</text>
      <text x="310" y="83">Sanctuary</text><text x="478" y="149">Fellowship</text><text x="497" y="166">hall</text>
    </g>
  </svg>;
}

const icons: Record<string, string> = {
  coffee: 'M4 9h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zm13 2h2a3 3 0 0 1 0 6h-2M7 5l2-2m4 2 2-2M2 23h20',
  parking: 'M5 21V4h5a4 4 0 0 1 0 8H5m10 9c0-5 2-9 7-11 0 6-2 9-7 10m-1-7 1 6',
  door: 'M4 22V10q0-5 8-9 8 4 8 9v12zM12 4v17m-3-7h1m4 0h1',
  tag: 'M3 6h18v14H3zM8 3h8v6H8zm-1 10h10m-10 4h7',
  crayon: 'M4 20l2-7L17 2l5 5-11 11zm3-7 5 5m3-14 5 5',
  pew: 'M3 21V9q1-3 4-4 3 1 4 4v12zm8-8h11v8H11m2-12h7v4',
  hearing: 'M5 19 20 4M6 12a6 6 0 0 1 11-4m-1 7c-4 1-4 7-8 7-3 0-4-3-3-5m5-5q1-4 4-3',
  ramp: 'M2 20h20M3 17l11-8h8m-17 7v-5L15 4h7m-3 0v5',
  bulletin: 'M4 3h16v18H4zm4 5h8m-8 4h8m-8 4h5',
  communion: 'M5 3h14v5a7 7 0 0 1-14 0zm7 12v6m-5 0h10',
  livestream: 'M2 5h20v14H2zm8 4 5 3-5 3z',
  potluck: 'M2 20h20M4 17a8 8 0 0 1 16 0zm8-8V6m-2 0h4',
  calendar: 'M3 6h18v15H3zm0 5h18M7 3v5m10-5v5m-9 8h3m3 0h3',
  pin: 'M12 22S5 15 5 10a7 7 0 0 1 14 0c0 5-7 12-7 12zm0-15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  envelope: 'M2 5h20v14H2zm0 0 10 8L22 5M2 19l7-7m6 0 7 7',
  phone: 'M6 3l4 4-3 3c2 3 4 5 7 7l3-3 4 4-3 3C10 21 3 14 3 6z',
  loaf: 'M3 14v-3a9 6 0 0 1 18 0v3zm5-7 2 4m3-4 2 4M2 17l5 4h10l5-4',
  music: 'M8 18V5l12-3v13M8 18c0 3-6 4-6 1s6-4 6-1zm12-3c0 3-6 4-6 1s6-4 6-1zM8 9l12-3',
};

export function DrawnIcon({ name, className = '' }: { name: string; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={`drawn-icon ${className}`} fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" strokeLinecap="round">
    <path d={icons[name] ?? icons['door']} />
  </svg>;
}

export function EmptyPew() {
  return <svg aria-hidden="true" viewBox="0 0 460 290" className="empty-pew">
    <path d="M102 113V51Q102 27 230 9Q358 27 358 51V113Z" fill="var(--wood)" stroke="#503628" strokeWidth="3" />
    <path d="M120 94H340M120 104H340" stroke="#bb8d58" strokeWidth="3" />
    {[4, 0, 4].map((number, index) => <g key={index} transform={`translate(${139 + index * 65} 43)`}>
      <rect x="0" y="0" width="52" height="48" rx="2" fill="var(--tile)" />
      <text x="26" y="36" textAnchor="middle" fill="#3e3029" fontSize="35" className="svg-display">{number}</text>
    </g>)}
    <path d="M75 153H379L399 216H61Z" fill="#b68352" stroke="#594132" strokeWidth="3" />
    <path d="M61 213H399V236H61ZM69 242H393" fill="#a36d42" stroke="#594132" strokeWidth="3" />
    <path d="M49 275V165Q48 146 68 138Q88 145 88 164V275ZM373 275V165Q373 146 393 138Q413 145 413 164V275Z" fill="#89613e" stroke="#503628" strokeWidth="3" />
    <g color="#e8c997"><Quatrefoil x={69} y={197} /><Quatrefoil x={393} y={197} /></g>
    <g transform="rotate(172 245 204)"><path d="M182 180H303L310 228H177Z" fill="var(--tile)" stroke="#735941" strokeWidth="2" />
    <text x="244" y="210" textAnchor="middle" fill="#49362b" className="svg-hand" fontSize="23">Reserved for you</text></g>
  </svg>;
}

// Painted page-head windows (public/pages/<scene>-light.webp and -dark.webp), in the same hand-painted
// style as the home hero. The `.page-art` styles in app/tailwind.input.css swap the pair with the theme,
// so only the active theme's painting is downloaded.
const pageScenes = {
  visit: 'Painting of a mother and child walking up the path to the chapel’s open red doors, where a greeter waves beside the coffee table',
  ministries: 'Painting of people of all ages sharing coffee, crafts and music around a long table in the fellowship hall under a stained-glass window',
  events: 'Painting of the fellowship hall noticeboard with pinned flyers, an evergreen garland and a string of lights',
  giving: 'Painting of two volunteers packing groceries at the church food pantry beside a wooden offering box',
  contact: 'Painting of the church office desk with a telephone, coffee and letters by a window overlooking the Blue Ridge',
} as const;

export type PageScene = keyof typeof pageScenes;

export function PageArt({ scene }: { scene: PageScene }) {
  const style = {
    '--art-light': `url("${asset(`/pages/${scene}-light.webp`)}")`,
    '--art-dark': `url("${asset(`/pages/${scene}-dark.webp`)}")`,
  } as CSSProperties;
  return <div className="page-art" role="img" aria-label={pageScenes[scene]} style={style}>
    <div className="page-art__frame"><div className="page-art__glass" /></div>
  </div>;
}
