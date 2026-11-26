import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const { street, locality, region, postalCode, country } = business.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    address: { '@type': 'PostalAddress', streetAddress: street, addressLocality: locality,
      addressRegion: region, postalCode, addressCountry: country },
    openingHoursSpecification: business.officeHours.flatMap(({ day, opens, closes }) =>
      opens && closes ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens, closes }] : []),
    ...(url ? { url } : {}),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
