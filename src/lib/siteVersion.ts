export type SiteVersion = 'full-day' | 'evening-only';

export const siteVersion: SiteVersion =
  process.env.NEXT_PUBLIC_SITE_VERSION === 'evening-only' ? 'evening-only' : 'full-day';

export const isEveningOnly = siteVersion === 'evening-only';
