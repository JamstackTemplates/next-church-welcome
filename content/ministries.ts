import type { Day } from '../lib/hours.ts';

export const audiences = ['kids', 'youth', 'adults', 'seniors', 'everyone'] as const;
export type Audience = typeof audiences[number];
export const glassColors = ['amber', 'sky', 'sage', 'rose'] as const;
export type GlassColor = typeof glassColors[number];

export interface Ministry {
  id: string;
  name: string;
  audience: Audience;
  ages?: string;
  meets: { day: Day; start: string; end: string } | null;
  place: string;
  summary: string;
  icon: string;
  glass: GlassColor;
}

export const ministries: readonly Ministry[] = [
  { id: 'nursery', name: 'Little Lambs Nursery', audience: 'kids', ages: '0–3', meets: { day: 'Sunday', start: '08:45', end: '12:00' }, place: 'Nursery room', summary: 'A quiet room for stories, soft toys and naps during either service.', icon: 'tag', glass: 'amber' },
  { id: 'kids-trail', name: 'Kids’ Trail', audience: 'kids', ages: '4–11', meets: { day: 'Sunday', start: '10:45', end: '11:55' }, place: 'Blue door wing', summary: 'Bible stories, messy crafts and games during the late service.', icon: 'crayon', glass: 'rose' },
  { id: 'youth', name: 'Valley Youth', audience: 'youth', ages: '12–18', meets: { day: 'Wednesday', start: '18:30', end: '20:00' }, place: 'The Loft', summary: 'Midweek games, dinner and honest conversations about faith.', icon: 'music', glass: 'sky' },
  { id: 'small-groups', name: 'Kitchen Table Groups', audience: 'adults', meets: { day: 'Tuesday', start: '19:00', end: '20:30' }, place: 'Homes around the valley', summary: 'Read Scripture and get to know your neighbours around a kitchen table.', icon: 'coffee', glass: 'sage' },
  { id: 'womens-bible', name: 'Women’s Morning Study', audience: 'adults', meets: { day: 'Thursday', start: '09:30', end: '11:00' }, place: 'Library room', summary: 'Bring your Bible and a mug for a steady, small-group study.', icon: 'bulletin', glass: 'rose' },
  { id: 'mens-breakfast', name: 'Men’s Breakfast', audience: 'adults', meets: { day: 'Saturday', start: '08:00', end: '09:30' }, place: 'Fellowship hall', summary: 'A hot breakfast, a short devotional and time to catch up.', icon: 'potluck', glass: 'amber' },
  { id: 'young-adults', name: 'Porch Night', audience: 'adults', ages: '18–30', meets: { day: 'Thursday', start: '19:00', end: '21:00' }, place: 'Front porch or hall', summary: 'An easy evening of board games and conversation for young adults.', icon: 'door', glass: 'sky' },
  { id: 'seniors', name: 'Golden Thread', audience: 'seniors', ages: '65+', meets: { day: 'Wednesday', start: '11:00', end: '13:00' }, place: 'Fellowship hall', summary: 'Hymns, conversation and lunch together each Wednesday.', icon: 'communion', glass: 'amber' },
  { id: 'choir', name: 'Valley Choir & Band', audience: 'everyone', meets: { day: 'Thursday', start: '18:30', end: '20:00' }, place: 'Sanctuary', summary: 'Sing or play with the group that leads music on Sundays.', icon: 'music', glass: 'rose' },
  { id: 'food-pantry', name: 'Hope Valley Pantry', audience: 'everyone', meets: { day: 'Tuesday', start: '10:00', end: '13:00' }, place: 'Pantry, side entrance', summary: 'Pick up groceries or help sort and share food with local households.', icon: 'loaf', glass: 'sage' },
  { id: 'care-team', name: 'Care Team', audience: 'everyone', meets: null, place: 'Arranged through the office', summary: 'Bring a meal, make a call or visit someone who could use company.', icon: 'envelope', glass: 'sky' },
];

export const featuredMinistryIds = ['kids-trail', 'youth', 'small-groups', 'seniors', 'choir', 'food-pantry'];
