import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

async function getUpdatePosts(request: VercelRequest, response: VercelResponse) {
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
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET': return getUpdatePosts(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}