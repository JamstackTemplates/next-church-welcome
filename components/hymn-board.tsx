import { sundayServices } from '../lib/church-content';
import { displayTime } from '../lib/schedule';
import { BoardFrame } from './board-frame';
import { NextService } from './church-clock';

export function HymnBoard({ live = false }: { live?: boolean }) {
  return <BoardFrame>
    <h2>This Sunday</h2>
    <ul className="hymn-slots">
      {sundayServices.map(service => <li className="hymn-tile" key={service.id}>
        <strong><time dateTime={service.start}>{displayTime(service.start)}</time></strong>
        <span>{service.name.replace(/ Service$/, '')}</span>
      </li>)}
    </ul>
    {live && <NextService services={sundayServices} />}
  </BoardFrame>;
}
