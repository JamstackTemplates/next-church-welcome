import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { ChurchEvent } from '../content/events.ts';
import type { Service } from '../content/services.ts';
import { DAYS, openingLabel } from '../lib/hours.ts';
import { localClock, nextServiceLabel, upcomingEvents } from '../lib/schedule.ts';

const zone = 'America/New_York';
// Pin the fixture so the owner can change the production service times without editing these tests.
const services: Service[] = [
  { id: 'early', name: 'Early Service', day: 'Sunday', start: '09:00', end: '10:10', style: '', childcare: '', notes: '' },
  { id: 'late', name: 'Late Service', day: 'Sunday', start: '10:45', end: '11:55', style: '', childcare: '', notes: '' },
];

test('church office opening and closing boundaries use Eastern Time', () => {
  const hours = DAYS.map((day, index) => index >= 1 && index <= 4
    ? { day, opens: '09:00', closes: day === 'Friday' ? '12:00' : '15:00' }
    : { day });
  const open = (now: string) => openingLabel(hours, zone, new Date(now));
  assert.equal(open('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(open('2026-11-17T14:00:00Z'), 'Open now · until 15:00');
  assert.equal(open('2026-11-17T19:59:00Z'), 'Open now · until 15:00');
  assert.equal(open('2026-11-17T20:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(open('2026-11-20T17:00:00Z'), 'Closed · opens Tuesday at 09:00');
  for (const change of ['2026-11-01T14:00:00Z', '2027-03-14T13:00:00Z']) {
    assert.equal(open(change), 'Closed · opens Tuesday at 09:00');
  }
  assert.equal(open('2026-11-03T14:00:00Z'), 'Open now · until 15:00');
  assert.equal(open('2027-03-16T13:00:00Z'), 'Open now · until 15:00');
});

test('next service handles starts, the gap, the last minute and week rollover on both DST transitions', () => {
  const label = (now: string) => nextServiceLabel(services, zone, new Date(now));
  assert.equal(label('2026-11-01T13:59:00Z'), 'Next: today at 9:00');
  assert.equal(label('2026-11-01T14:00:00Z'), 'Starting now: Early Service');
  assert.equal(label('2026-11-01T15:09:00Z'), 'In progress: Early Service');
  assert.equal(label('2026-11-01T15:10:00Z'), 'Next: today at 10:45');
  assert.equal(label('2026-11-01T15:45:00Z'), 'Starting now: Late Service');
  assert.equal(label('2026-11-01T16:55:00Z'), 'Next: next Sunday at 9:00');
  assert.equal(label('2027-03-14T12:59:00Z'), 'Next: today at 9:00');
  assert.equal(label('2027-03-14T13:00:00Z'), 'Starting now: Early Service');
  assert.equal(label('2027-03-14T14:20:00Z'), 'Next: today at 10:45');
  assert.equal(label('2027-03-14T15:00:00Z'), 'In progress: Late Service');
  assert.equal(label('2027-03-15T02:00:00Z'), 'Next: next Sunday at 9:00');
  assert.equal(label('2027-03-15T04:00:00Z'), 'Next: this Sunday at 9:00');
});

test('upcoming events retain the entire current local date and drop the last event the following date', () => {
  const event = (id: string, date: string, start = '10:00'): ChurchEvent =>
    ({ id, title: id, date, start, end: '12:00', place: 'Hall', audience: 'everyone', cost: 0, rsvp: false, summary: 'Gather in the hall.' });
  const fixtures = [
    event('last', '2027-02-17'), event('current-late', '2027-02-07', '11:30'),
    event('past', '2027-02-06'), event('current-early', '2027-02-07'),
  ];
  const list = (now: string | null) => upcomingEvents(fixtures, now ? localClock(new Date(now), zone).date : null).map(item => item.id);
  assert.deepEqual(list(null), ['past', 'current-early', 'current-late', 'last']);
  assert.deepEqual(list('2027-02-08T04:59:00Z'), ['current-early', 'current-late', 'last']);
  assert.deepEqual(list('2027-02-08T05:00:00Z'), ['last']);
  assert.deepEqual(list('2027-02-18T04:59:00Z'), ['last']);
  assert.deepEqual(list('2027-02-18T05:00:00Z'), []);
});
