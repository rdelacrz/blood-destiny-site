import { sql } from '@vercel/postgres';

/*
 * GET /api/updates — public JSON feed for the devlog timeline.
 *
 * Deployed automatically by Vercel as a serverless function (any file under
 * /api is served at /api/<name>). Mirrors master's Telefunc onLoad() query but
 * returns plain JSON — lowercase keys + ISO dates, no { ret } envelope — which
 * src/api/updates.ts maps to the Update view model.
 *
 * Same-origin with the SPA, so no CORS is required. To read it from another
 * origin, uncomment the CORS block below.
 *
 * The connection string is read server-side from POSTGRES_URL (set on the
 * Vercel project, or pulled locally via `vercel env pull`). It is NEVER part of
 * the client bundle — only this function touches the database.
 *
 * @param req  Vercel request  (req.method, req.query, …)
 * @param res  Vercel response (res.status().json(), res.setHeader(), …)
 */
export default async function handler(req, res) {
  // --- Cross-origin access? Uncomment to let other origins read this feed. ---
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Accept');
  // if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { rows } = await sql`
      SELECT
        post_id     AS "postid",
        title       AS "title",
        content     AS "description",
        cover_image AS "coverimage",
        post_date   AS "date",
        post_by     AS "updateby"
      FROM posts
      ORDER BY post_date DESC
    `;
    // Edge cache: 60s fresh, then serve stale up to 5 min while revalidating.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(rows);
  } catch (err) {
    console.error('GET /api/updates failed:', err);
    return res.status(500).json({ error: 'Failed to load updates' });
  }
}
