import type { OpeningHours } from '../lib/hours.ts';

export const business = {
  name: 'Hope Valley Community Church',
  tagline: "There's a seat saved for you.",
  introduction: 'A non-denominational church in the Blue Ridge foothills of Asheville, North Carolina.',
  email: 'hello@next-church-welcome.jamstacks.net',
  phone: '(828) 555-0142',
  address: { street: '214 Laurel Hollow Road', locality: 'Asheville', region: 'NC', postalCode: '28805', country: 'US' },
  landmark: 'Ten minutes from the Folk Art Center on the Blue Ridge Parkway.',
  parking: 'Turn in by the big oak on Laurel Hollow Road. First-time visitor spaces are near the doors, and accessible spaces are beside the ramp.',
  enquiries: {
    title: 'Send us a note',
    introduction: 'Write with a question, a prayer request, or an enquiry about a visit or event.',
    reply: 'We’ll reply within two working days to talk it through.',
  },
  officeHours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '09:00', closes: '15:00' },
    { day: 'Wednesday', opens: '09:00', closes: '15:00' },
    { day: 'Thursday', opens: '09:00', closes: '15:00' },
    { day: 'Friday', opens: '09:00', closes: '12:00' },
    { day: 'Saturday' },
    { day: 'Sunday' },
  ] satisfies OpeningHours[],
};

const { street, locality, region, postalCode } = business.address;
export const addressLine = `${street}, ${locality}, ${region} ${postalCode}`;
