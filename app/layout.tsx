import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import '@fontsource-variable/petrona';
import '@fontsource-variable/petrona/wght-italic.css';
import '@fontsource-variable/radio-canada';
import '@fontsource/sue-ellen-francisco';
import { asset } from '../lib/paths';
import './tailwind.input.css';

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description: site.description || business.introduction,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: { type: 'website', siteName: business.name, title: business.name,
    description: site.description || business.introduction,
    images: [{ url: site.url ? `${site.url}/og.png` : asset('/og.png'), width: 1200, height: 630, alt: business.tagline }] },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
