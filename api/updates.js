
import { sql } from '@vercel/postgres';

// We use JSDoc instead of TypeScript because Vercel seems buggy with /api/**/*.ts files

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
async function getUpdatePosts(req, res) {
  try {
    const result = await sql`
      SELECT 
        post_id AS postId,
        title,
        content AS description,
        cover_image AS coverImage,
        post_date AS date,
        post_by AS updateBy
      FROM posts
    `;
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': return getUpdatePosts(req, res);
    default: return res.status(405).json({ error: 'You do not have access to the method.' });
  }
}