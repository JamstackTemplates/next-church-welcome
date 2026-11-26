# Local verification

- The completed site passed all 33 unit tests and TypeScript checks. The full `npm run check` passed with webpack selected for local verification. Turbopack’s PostCSS worker hit a local port-binding restriction. The repository’s build command retains its original Next.js defaults.
- Chromium captures covered Home, Visit, Ministries, Events, Giving, Contact and the custom 404 in light and dark at 1440px and 390px. On mobile, the Home heading, address, both service times and primary action all fit in the first screen.
- Browser checks covered the skip link, keyboard menu, native FAQs, explicit theme switching, minute-by-minute updates, audience filters and counts, event expiry, ministry anchors, no-JavaScript rendering and print. The Home map request returned HTTP 200 for the sample address.
- Both `/preview` exports kept links and canonicals under the project path. The configured Contact page showed one host and requested one bootstrap on each full document load. The unconfigured page displayed the email without a host or bootstrap. The configured browser test intercepted the bootstrap request.
- In a temporary checkout, a March 2027 flyer and an 11:00 Late Service propagated to the rendered pages. An invalid ministry reference failed with the event ID and field name. The temporary checkout also built and tested without the gallery directory.
- The gallery manifest, JPEGs and capture report passed their separate test. The share image is 1200×630.
- Deployment and enquiry delivery require separate verification.
