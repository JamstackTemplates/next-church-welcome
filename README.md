# Hope Valley Community Church

**Hymn Board Church** is a Jamstacks Next.js gallery template. The church, street address and people
are fictional. The Folk Art Center is a real Asheville landmark.

Use Node 24 or later and npm. Run `npm ci` and `npm run dev` for local development. To preview
the static export, run `npm run build` and `npm start`.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Sunday times, pastor’s letter, bulletin, ministries, events, giving and directions |
| `/visit/` | Illustrated first-visit route, service comparison, FAQs and accessibility |
| `/ministries/` | Audience-filterable groups and volunteer opportunities |
| `/events/` | Upcoming dates, audience filters, RSVP enquiries and weekly gatherings |
| `/giving/` | Budget, in-person and mail giving, and pantry supplies |
| `/contact/` | Hosted support form when configured, public email, office hours and team |
| `/404.html` | Illustrated 404 with links to Home, Visit and Events |

## Edit the site

| File | Owns |
| --- | --- |
| `app/page.tsx`, `app/<route>/page.tsx` | Page copy, headings, calls to action and composition |
| `content/business.ts` | Church name, introduction, email, phone, address, directions, parking, office hours and enquiries |
| `content/services.ts` | Sunday service name, `start`, `end`, style, childcare and notes, plus the `sundayOrder` bulletin |
| `content/events.ts` | Dated flyers, prices, RSVP flags and optional ministry references |
| `content/ministries.ts` | Ministry audience, age range, weekly meeting time, place, summary, icon, glass colour and Home feature IDs |
| `content/visit.ts` | The six numbered visit stops and native FAQ answers |
| `content/giving.ts` | The rose-window budget labels, integer percentages, glass colours and legend copy |
| `content/team.ts` | Names, roles and one-line introductions. Portraits are keyed by ID in `components/church-art.tsx` |
| `site.config.json` | Public name, description, hostname, IANA time zone and Jamstacks integration |
| `app/tailwind.input.css`, `components/church-art.tsx` | Theme tokens, textures and original SVG artwork |
| `public/hero-light.webp`, `public/hero-dark.webp` | The home page painting (Sunday morning / candlelit evening). Replace both together with the same composition: the left side should stay open, fading to the page colour, because the headline sits there |
| `public/pages/<page>-light.webp`, `-dark.webp` | The painted window in each page heading (`<PageArt scene="visit" />`). Scenes and their alt text are listed in `components/church-art.tsx`. Replace both versions together and keep the subject in the lower middle, because the window’s pointed top crops the corners |
| `lib/structured-data.ts`, `app/sitemap.ts` | Church JSON-LD and public route URLs |

Edit headings and calls to action where they appear in page JSX, such as `<Hero.Heading>` in
`app/page.tsx`. Backing components own styling and interactions. Rename the church in
`business.name` and `site.config.json.name`. Edit the public description in `site.config.json`.
The Jamstacks provisioner may rewrite that file and add a `provisioningId`.

### Add a flyer

Add an object to the `events` array in `content/events.ts`. For example:

```ts
{ id: '2027-03-spring-cleanup', title: 'Spring Cleanup',
  date: '2027-03-20', start: '09:00', end: '11:00', place: 'Church grounds',
  audience: 'everyone', ministryId: 'care-team', cost: 0, rsvp: true,
  summary: 'Bring work gloves and help clear the paths for spring.' },
```

Use a unique lowercase ID beginning with the event date’s `YYYY-MM-`, a valid calendar date
and same-day 24-hour times. Allowed audiences are `kids`, `youth`, `adults`, `seniors` and
`everyone`. Use whole USD dollars from 0 to 200 and a boolean for `rsvp`. Omit `ministryId`
when there is no sponsoring ministry. The site sorts by date then start time. All dated flyers
are available in the static HTML. The browser removes past dates using the church’s time zone,
keeping each event through the end of its calendar day.

### Move a service or edit hours

Change the `late` service’s `start` in `content/services.ts` to move the Late Service. Home, Visit, the
header, the Sunday bulletin and the footer read the same value. Service-based bulletin rows read their
times through `serviceId`; fixed rows have a `time` instead. Dated events and weekly ministry meetings
are scheduled independently. Review affected dates, the Kids’ Trail meeting time and the public meta
description when service times change.

Edit all seven `officeHours` entries in `content/business.ts`. Leave `opens` and `closes` absent
on closed days. Use `HH:MM` with `opens` earlier than `closes`. The office badge and next-service
label refresh each minute in the zone configured in `site.config.json`. The static labels are
“See office hours” and “Every Sunday.” Replace the sample address before using the Home directions
and Google map for a real location.

Run `npm run check` after content edits. The content suite reports the collection, item and field
when an ID or value is invalid. Keep rose-window budget shares at a total of 100.

## Appearance

Petrona Variable (including italic), Radio Canada Variable and Sue Ellen Francisco are
self-hosted from Fontsource npm packages. Their bundled licenses are SIL Open Font License 1.1.
The palette supports browser light/dark preference and the Jamstacks theme toggle. Inline SVGs,
CSS textures and real HTML tiles carry the design through both themes. The stylesheet includes
focus, reduced-motion and paper print styles.

## Public configuration

```json
{
  "name": "Hope Valley Community Church",
  "description": "Public description",
  "domain": "next-church-welcome.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

The gallery demo uses its template ID plus `.jamstacks.net`. Replace the domain with your own,
or leave it empty while the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content rules, optional opening hours,
and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions. GitHub ignores a CNAME file for Actions deployments, so do not
add public/CNAME; the custom domain is a repository setting. The workflow sets it before building
when a `PAGES_ADMIN_TOKEN` secret is available (a fine-grained token with Administration and Pages
write access to the repository, e.g. as an organisation secret). The domain is the `SITE_DOMAIN`
variable, else site.config.json's `domain`, else `<repo-name>.jamstacks.net` for JamstackTemplates
repositories. Once the domain is set and its certificate is issued, a later deploy also enforces HTTPS.
Without the secret the step only prints a notice; set the custom domain and HTTPS in Settings → Pages.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

The site icon lives in `app/icon.svg`. The 1200×630 share image at `public/og.png` is an illustrated
snapshot of the sample design. Regenerate it if you change branding or service times. After review,
remove `plan/` and `.claude/skills/` before publishing the template to the gallery.
