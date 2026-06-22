/**
 * @fileoverview SEO metadata helpers — keep the document <title> and the
 * social/crawler meta tags (description, canonical, Open Graph, Twitter Card)
 * in sync with the active route. The router's afterEach hook calls applySeo()
 * on every navigation. Matching STATIC defaults live in index.html so crawlers
 * and social scrapers that don't execute JS still get sensible values.
 */

/**
 * Production origin — also used for canonical URLs and the sitemap. Change this
 * one constant (and the matching absolute URLs in index.html / sitemap.xml) if
 * the site moves to a custom domain.
 */
export const SITE_URL = 'https://blooddestiny.com';

/** Brand suffix appended to inner-page titles. */
export const SITE_NAME = 'Blood Destiny';

/** Home / fallback title (kept identical to index.html's static <title>). */
export const DEFAULT_TITLE = 'Blood Destiny — A Visual Novel by Ashes Aflame';

/** Fallback meta description (kept identical to index.html's static one). */
export const DEFAULT_DESCRIPTION =
  'Blood Destiny — a dark supernatural visual novel set in the year 2245. '
  + 'Mercenaries, Synchronizers and the secrets of four supernations. By Ashes Aflame.';

/** Default social share image (absolute URL — required by Open Graph). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/graphics/jack_fuyumi_promo.png`;

/** Per-route SEO overrides; attached to each route's meta.seo. */
export interface RouteSeo {
  /** Page title WITHOUT the brand suffix (added automatically). Omit on home. */
  title?: string;
  /** ~50–160 char summary for search results and social cards. */
  description?: string;
  /** Share image — absolute, or root-relative (resolved against SITE_URL). */
  image?: string;
}

/** Resolve a root-relative asset path to the absolute URL Open Graph needs. */
function toAbsolute(src?: string): string | undefined {
  if (!src) return undefined;
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

/** Create-or-update a <meta> tag, keyed by its name or property attribute. */
function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Create-or-update the single <link rel="canonical">. */
function upsertCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Apply a route's SEO metadata to the document head.
 *
 * @param seo  Per-route overrides (falls back to the site defaults).
 * @param path Canonical route path with no query/hash, e.g. '/characters/jackSmith'.
 */
export function applySeo(seo: RouteSeo, path: string): void {
  const title = seo.title ? `${seo.title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const description = seo.description ?? DEFAULT_DESCRIPTION;
  const image = toAbsolute(seo.image) ?? DEFAULT_OG_IMAGE;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertCanonical(url);

  // Open Graph (Facebook, Discord, iMessage, …)
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', image);

  // Twitter Card
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);
}
