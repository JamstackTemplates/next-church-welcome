import assert from 'node:assert/strict';
import { test } from 'node:test';
import { addressLine, business } from '../content/business.ts';
import { events, type ChurchEvent } from '../content/events.ts';
import { budget } from '../content/giving.ts';
import { audiences, featuredMinistryIds, glassColors, ministries } from '../content/ministries.ts';
import { services, sundayOrder } from '../content/services.ts';
import { team } from '../content/team.ts';
import { faqs, visitSteps } from '../content/visit.ts';
import { DAYS, validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;

function required(item: object, keys: string[], path: string) {
  for (const key of keys) {
    const value = (item as Record<string, unknown>)[key];
    assert.ok(typeof value === 'string' && value.trim(), `${path}.${key}: required text`);
  }
}

function ids(collection: string, items: readonly { id: string }[]) {
  const seen = new Set();
  for (const { id } of items) {
    assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${collection}.${id}.id: expected a lowercase, URL-safe ID`);
    assert.ok(!seen.has(id), `${collection}.${id}.id: duplicate ID`);
    seen.add(id);
  }
}

function interval(start: string, end: string, path: string) {
  assert.match(start, clock, `${path}.start: use HH:MM`);
  assert.match(end, clock, `${path}.end: use HH:MM`);
  assert.ok(start < end, `${path}.end: must be after start on the same day`);
}

function validateEvents(entries: readonly ChurchEvent[]) {
  ids('events', entries);
  for (const event of entries) {
    const { id, date, start, end, audience, ministryId, cost, rsvp } = event;
    const path = `events.${id}`;
    required(event, ['title', 'place', 'summary'], path);
    assert.match(date, /^\d{4}-\d{2}-\d{2}$/, `${path}.date: use YYYY-MM-DD`);
    const parsed = new Date(`${date}T00:00:00Z`);
    assert.ok(Number.isFinite(+parsed) && parsed.toISOString().startsWith(date), `${path}.date: use a valid calendar date`);
    assert.match(id, new RegExp(`^${date.slice(0, 7)}-[a-z0-9]`), `${path}.id: must begin with the date’s YYYY-MM followed by a slug`);
    interval(start, end, path);
    assert.ok(audiences.includes(audience), `${path}.audience: use an audience from content/ministries.ts`);
    assert.ok(ministryId === undefined || ministries.some(item => item.id === ministryId), `${path}.ministryId: unknown ministry ${ministryId}`);
    assert.ok(Number.isInteger(cost) && cost >= 0 && cost <= 200, `${path}.cost: expected whole USD dollars from 0 to 200`);
    assert.equal(typeof rsvp, 'boolean', `${path}.rsvp: expected true or false`);
  }
}

test('public details and office hours have actionable required fields', () => {
  required(business, ['name', 'tagline', 'introduction', 'email', 'phone', 'landmark', 'parking'], 'business');
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  required(business.address, ['street', 'locality', 'region', 'postalCode', 'country'], 'business.address');
  required(business.enquiries, ['title', 'introduction', 'reply'], 'business.enquiries');
  validateHours(business.officeHours);
});

test('Sunday services are non-overlapping and bulletin times resolve in order', () => {
  ids('services', services);
  assert.ok(services.length, 'services: add at least one Sunday service');
  const ordered = [...services].sort((a, b) => a.start.localeCompare(b.start));
  ordered.forEach((service, index) => {
    const path = `services.${service.id}`;
    required(service, ['name', 'style', 'childcare', 'notes'], path);
    assert.equal(service.day, 'Sunday', `${path}.day: expected Sunday`);
    interval(service.start, service.end, path);
    const previous = ordered[index - 1];
    assert.ok(!previous || previous.end <= service.start, `${path}.start: overlaps ${previous?.id}`);
  });

  ids('sundayOrder', sundayOrder);
  let previous = '';
  for (const item of sundayOrder) {
    const path = `sundayOrder.${item.id}`;
    required(item, ['label', 'detail', 'icon'], path);
    if (item.serviceId !== undefined) {
      assert.ok(item.time === undefined, `${path}.time: service entries get their start from services`);
      assert.ok(services.some(service => service.id === item.serviceId), `${path}.serviceId: unknown service ${item.serviceId}`);
    }
    const time = item.time ?? services.find(service => service.id === item.serviceId)!.start;
    assert.match(time, clock, `${path}.time: use HH:MM`);
    assert.ok(time > previous, `${path}.time: resolved times must be ascending`);
    previous = time;
  }
});

test('ministry records and home window references are valid', () => {
  ids('ministries', ministries);
  for (const ministry of ministries) {
    const path = `ministries.${ministry.id}`;
    required(ministry, ['name', 'place', 'summary', 'icon'], path);
    assert.ok(audiences.includes(ministry.audience), `${path}.audience: invalid audience`);
    assert.ok(glassColors.includes(ministry.glass), `${path}.glass: invalid glass colour`);
    if (ministry.ages !== undefined) required(ministry, ['ages'], path);
    if (ministry.meets !== null) {
      assert.ok(ministry.meets && DAYS.includes(ministry.meets.day), `${path}.meets.day: invalid weekday`);
      interval(ministry.meets.start, ministry.meets.end, `${path}.meets`);
    }
  }
  ids('featuredMinistryIds', featuredMinistryIds.map(id => ({ id })));
  for (const id of featuredMinistryIds) assert.ok(ministries.some(item => item.id === id), `featuredMinistryIds.${id}: unknown ministry`);
});

test('each event can be edited independently with a clear ID and valid fields', () => {
  validateEvents(events);
  const edit: ChurchEvent = { id: '2027-03-validation-fixture', title: 'Spring work day', date: '2027-03-20',
    start: '09:00', end: '11:00', place: 'Church grounds', audience: 'everyone', summary: 'Help tidy the grounds.', cost: 0, rsvp: false };
  assert.doesNotThrow(() => validateEvents([...events, { ...edit, ministryId: 'care-team' }]));
  assert.throws(() => validateEvents([...events, { ...edit, ministryId: 'missing' }]), /events\.2027-03-validation-fixture\.ministryId: unknown ministry missing/);
  assert.throws(() => validateEvents([{ ...edit, id: '2027-02-work-day' }]), /2027-02-work-day\.id/);
  assert.throws(() => validateEvents([{ ...edit, date: '2027-02-29' }]), /2027-03-validation-fixture\.date/);
  assert.throws(() => validateEvents([{ ...edit, cost: 201 }]), /2027-03-validation-fixture\.cost/);
});

test('budget percentages, visit stops, FAQs and team entries are valid', () => {
  ids('budget', budget);
  for (const item of budget) {
    const path = `budget.${item.id}`;
    required(item, ['label', 'detail'], path);
    assert.ok(Number.isInteger(item.percent) && item.percent > 0 && item.percent <= 100, `${path}.percent: use a whole percentage from 1 to 100`);
    assert.ok(glassColors.includes(item.glass), `${path}.glass: invalid glass colour`);
  }
  assert.equal(budget.reduce((sum, item) => sum + item.percent, 0), 100, `budget.percent: allocations must total 100 (${budget.map(item => `${item.id}=${item.percent}`).join(', ')})`);
  ids('visitSteps', visitSteps);
  assert.equal(visitSteps.length, 6, 'visitSteps: the illustrated map has six stops');
  visitSteps.forEach((step, index) => {
    required(step, ['title', 'detail', 'icon'], `visitSteps.${step.id}`);
    assert.equal(step.number, index + 1, `visitSteps.${step.id}.number: match the order of illustrated stops`);
  });
  ids('faqs', faqs);
  for (const faq of faqs) required(faq, ['question', 'answer'], `faqs.${faq.id}`);
  ids('team', team);
  for (const person of team) required(person, ['name', 'role', 'line'], `team.${person.id}`);
});

test('Church JSON-LD shares the public address, contact details and office hours', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'Church');
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.ok(addressLine.includes(schema.address.postalCode));
  assert.deepEqual(schema.openingHoursSpecification.map(item => item.dayOfWeek.split('/').at(-1)),
    business.officeHours.filter(item => item.opens).map(item => item.day));
  assert.ok(!('event' in schema));
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
