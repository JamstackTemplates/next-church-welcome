import { services } from '../content/services.ts';
import { displayTime } from './schedule.ts';

export const sundayServices = [...services].sort((a, b) => a.start.localeCompare(b.start));
export const serviceTimes = sundayServices.map(service => displayTime(service.start)).join(' & ');
export const serviceTimesProse = new Intl.ListFormat('en-US', { type: 'conjunction' })
  .format(sundayServices.map(service => displayTime(service.start)));
