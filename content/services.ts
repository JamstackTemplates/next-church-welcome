export interface Service {
  id: string;
  name: string;
  day: 'Sunday';
  start: string;
  end: string;
  style: string;
  childcare: string;
  notes: string;
}

export const services: readonly Service[] = [
  { id: 'early', name: 'Early Service', day: 'Sunday', start: '09:00', end: '10:10',
    style: 'A quieter service with hymns, piano and weekly communion.',
    childcare: 'Nursery only (ages 0–3).', notes: 'Large-print bulletins at the door.' },
  { id: 'late', name: 'Late Service', day: 'Sunday', start: '10:45', end: '11:55',
    style: 'Full band with contemporary and classic songs.',
    childcare: 'Nursery and Kids’ Trail (ages 4–11).', notes: 'Livestreamed and archived.' },
];

export type SundayItem = { id: string; label: string; detail: string; icon: string } &
  ({ time: string; serviceId?: never } | { serviceId: string; time?: never });

export const sundayOrder: readonly SundayItem[] = [
  { id: 'coffee', time: '08:30', label: 'Coffee’s on', detail: 'Local roast from the Laurel Hollow market in the fellowship hall.', icon: 'coffee' },
  { id: 'early-service', serviceId: 'early', label: 'Early Service', detail: 'Hymns, piano and a 25-minute message.', icon: 'music' },
  { id: 'between', time: '10:10', label: 'Between services', detail: 'Coffee, pastries and a chance to stop by the welcome table.', icon: 'tag' },
  { id: 'late-service', serviceId: 'late', label: 'Late Service', detail: 'Full band. Kids’ Trail starts after the first song.', icon: 'crayon' },
  { id: 'lunch', time: '12:00', label: 'First-Sunday lunch', detail: 'Potluck on the lawn on the first Sunday of each month.', icon: 'potluck' },
];
