import type { Audience } from './ministries.ts';

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  place: string;
  audience: Audience;
  ministryId?: string;
  cost: number;
  rsvp: boolean;
  summary: string;
}

export const events: readonly ChurchEvent[] = [
  { id: '2026-12-greening', title: 'Hanging of the Greens', date: '2026-12-05', start: '10:00', end: '12:30', place: 'Sanctuary', audience: 'everyone', cost: 0, rsvp: false, summary: 'Help hang wreaths and dress the sanctuary for Advent. We’ll have cider on the stove.' },
  { id: '2026-12-pantry-drive', title: 'Christmas Pantry Drive', date: '2026-12-08', start: '10:00', end: '13:00', place: 'Pantry, side entrance', audience: 'everyone', ministryId: 'food-pantry', cost: 0, rsvp: false, summary: 'Bring shelf-stable groceries or lend a hand packing holiday bags.' },
  { id: '2026-12-kids-pageant', title: 'Kids’ Nativity Pageant', date: '2026-12-13', start: '10:45', end: '11:55', place: 'Sanctuary', audience: 'kids', ministryId: 'kids-trail', cost: 0, rsvp: false, summary: 'Kids’ Trail tells the Christmas story during the late service.' },
  { id: '2026-12-carols', title: 'Carols on the Lawn', date: '2026-12-18', start: '18:00', end: '19:30', place: 'Front lawn', audience: 'everyone', ministryId: 'choir', cost: 0, rsvp: false, summary: 'Put on a warm coat and join the choir for carols and hot cocoa.' },
  { id: '2026-12-blue-christmas', title: 'Blue Christmas', date: '2026-12-21', start: '19:00', end: '20:00', place: 'Sanctuary', audience: 'adults', ministryId: 'care-team', cost: 0, rsvp: false, summary: 'A quiet service for anyone carrying grief through the holidays.' },
  { id: '2026-12-christmas-eve', title: 'Christmas Eve Candlelight', date: '2026-12-24', start: '17:00', end: '18:15', place: 'Sanctuary', audience: 'everyone', cost: 0, rsvp: false, summary: 'Readings, familiar carols and candlelight for all ages.' },
  { id: '2027-01-new-groups', title: 'Kitchen Table Groups Launch', date: '2027-01-12', start: '19:00', end: '20:30', place: 'Fellowship hall', audience: 'adults', ministryId: 'small-groups', cost: 0, rsvp: true, summary: 'Meet the hosts and find a group close to home.' },
  { id: '2027-01-youth-retreat', title: 'Youth Snow Retreat', date: '2027-01-22', start: '16:00', end: '21:00', place: 'Meet at the church lot', audience: 'youth', ministryId: 'youth', cost: 45, rsvp: true, summary: 'An evening in the mountains with games, dinner and a fireside devotional.' },
  { id: '2027-02-first-lunch', title: 'First-Sunday Potluck', date: '2027-02-07', start: '12:00', end: '13:30', place: 'Fellowship hall', audience: 'everyone', cost: 0, rsvp: false, summary: 'Pull up a chair after church. Bring a dish if you’d like.' },
  { id: '2027-02-marriage', title: 'Valentine’s Dinner for Couples', date: '2027-02-13', start: '18:00', end: '20:30', place: 'Fellowship hall', audience: 'adults', cost: 20, rsvp: true, summary: 'Dinner and guided conversation for couples at any stage of life.' },
  { id: '2027-02-golden-thread', title: 'Golden Thread Hymn Sing', date: '2027-02-17', start: '11:00', end: '13:00', place: 'Fellowship hall', audience: 'seniors', ministryId: 'seniors', cost: 0, rsvp: false, summary: 'Choose a favourite hymn from the book and stay for lunch.' },
];
