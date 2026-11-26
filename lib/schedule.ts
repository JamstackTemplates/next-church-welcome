import type { ChurchEvent } from '../content/events.ts';
import type { Service } from '../content/services.ts';

export function displayTime(time: string) {
  return time.replace(/^0/, '');
}

export function clockTime(time: string) {
  const hour = Number(time.slice(0, 2));
  return `${hour % 12 || 12}:${time.slice(3)} ${hour >= 12 ? 'pm' : 'am'}`;
}

export function localClock(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const part = (name: Intl.DateTimeFormatPartTypes) => parts.find(value => value.type === name)!.value;
  return { date: `${part('year')}-${part('month')}-${part('day')}`, day: part('weekday'), time: `${part('hour')}:${part('minute')}` };
}

export function nextServiceLabel(services: readonly Service[], zone: string, now: Date) {
  if (!zone || !services.length) return 'Every Sunday';
  const local = localClock(now, zone);
  const ordered = [...services].sort((a, b) => a.start.localeCompare(b.start));
  const current = local.day === 'Sunday' ? ordered.find(service => local.time >= service.start && local.time < service.end) : undefined;
  if (current) return `${local.time === current.start ? 'Starting now' : 'In progress'}: ${current.name}`;
  const today = local.day === 'Sunday' ? ordered.find(service => service.start > local.time) : undefined;
  const when = local.day === 'Sunday' ? today ? 'today' : 'next Sunday' : 'this Sunday';
  return `Next: ${when} at ${displayTime((today ?? ordered[0]).start)}`;
}

export function orderedEvents(events: readonly ChurchEvent[]) {
  return [...events].sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
}

export function upcomingEvents(events: readonly ChurchEvent[], today: string | null) {
  return orderedEvents(events).filter(event => today === null || event.date >= today);
}

export function dateLabel(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}
