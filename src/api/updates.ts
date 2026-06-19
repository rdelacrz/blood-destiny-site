/* =====================================================================
   BLOOD DESTINY — updates API client
   The devlog feed is served as JSON from a backend endpoint configured via
   VITE_UPDATES_API_URL. On `master` the same data is produced by a Telefunc
   RPC (`onLoad`) running `SELECT post_id, title, content, cover_image,
   post_date, post_by FROM posts ORDER BY post_date DESC` against Vercel
   Postgres; this SPA consumes the equivalent JSON over fetch. UpdatePostDto
   mirrors those columns; toUpdate() normalises a row to the `Update` view
   model, and fetchUpdates() returns the feed newest-first.

   NOTE (verified against the live deployment): Postgres folds unquoted column
   aliases to lowercase, so the feed returns postid/coverimage/updateby — not
   the camelCase in master's models/update.ts. The mapper tolerates either.
   ===================================================================== */
import type { Update } from '@/data/updates';

/** One row from the `posts` table (field names lowercase, per Postgres). */
export interface UpdatePostDto {
  /** post_id */
  postid: number;
  title: string;
  /** post_date — ISO timestamp string. */
  date: string;
  /** content — body copy as HTML. */
  description: string;
  /** cover_image — absolute URL or path relative to VITE_UPDATES_IMAGE_BASE. */
  coverimage?: string | null;
  /** post_by — author handle. */
  updateby?: string | null;
}

/** Configured updates endpoint (trimmed; empty string when unset). */
export const UPDATES_ENDPOINT = (import.meta.env.VITE_UPDATES_API_URL ?? '').trim();

/** Whether a live endpoint is configured. When false the view uses the seed fallback. */
export const hasUpdatesEndpoint = UPDATES_ENDPOINT.length > 0;

const IMAGE_BASE = (import.meta.env.VITE_UPDATES_IMAGE_BASE ?? '').trim().replace(/\/+$/, '');

const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

/** Plain ISO string from a row date, tolerating the Telefunc "!Date:<iso>" form. */
function toIso(raw: unknown): string {
  return typeof raw === 'string' ? raw.replace(/^!Date:/, '') : '';
}

/** Epoch ms for sorting (0 when unparseable). */
function dateMs(raw: unknown): number {
  const t = new Date(toIso(raw)).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** Format a row date into the timeline's "May 2024" label. */
function formatDate(raw: unknown): string {
  const iso = toIso(raw);
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : monthYear.format(d);
}

/** Resolve a cover path to a usable URL, applying VITE_UPDATES_IMAGE_BASE to relatives. */
function resolveCover(raw?: string | null): string | undefined {
  const v = (raw ?? '').trim();
  if (!v) return undefined;
  if (/^https?:\/\//i.test(v) || v.startsWith('/')) return v;
  return IMAGE_BASE ? `${IMAGE_BASE}/${v.replace(/^\/+/, '')}` : v;
}

/** Pull the row list out of a bare array or an { items } / { ret } envelope. */
function extractRows(payload: unknown): UpdatePostDto[] {
  if (Array.isArray(payload)) return payload as UpdatePostDto[];
  if (payload && typeof payload === 'object') {
    const env = payload as { items?: unknown; ret?: unknown };
    if (Array.isArray(env.items)) return env.items as UpdatePostDto[];
    if (Array.isArray(env.ret)) return env.ret as UpdatePostDto[];
  }
  return [];
}

/** Map a raw API row to the `Update` view model (tolerates lowercase or camelCase). */
export function toUpdate(dto: UpdatePostDto): Update {
  const r = dto as unknown as Record<string, unknown>;
  const coverRaw = dto.coverimage ?? (r.coverImage as string | null | undefined);
  const authorRaw = dto.updateby ?? (r.updateBy as string | null | undefined);
  return {
    id: dto.postid ?? (r.postId as number | undefined) ?? dto.title,
    date: formatDate(dto.date),
    title: dto.title,
    body: dto.description ?? '',
    author: authorRaw ?? undefined,
    cover: resolveCover(coverRaw),
  };
}

/**
 * Fetch the updates feed and map it to view models, newest first.
 * Accepts a bare array (current backend) or an `{ items: [...] }` / `{ ret: [...] }`
 * envelope, so a paginated wrapper or a Telefunc-style shim drops in unchanged.
 */
export async function fetchUpdates(signal?: AbortSignal): Promise<Update[]> {
  const res = await fetch(UPDATES_ENDPOINT, {
    headers: { Accept: 'application/json' },
    signal,
  });
  if (!res.ok) throw new Error(`Updates request failed (HTTP ${res.status}).`);

  const rows = extractRows(await res.json());
  return rows
    .slice()
    .sort((a, b) => dateMs(b.date) - dateMs(a.date))
    .map(toUpdate);
}
