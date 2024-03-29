/**
 * Uses Telefunc to transform queryFn function call into an HTTP API call.
 */

import { sql } from '@vercel/postgres';
import { Update } from '@/models';

export async function onLoad() {
  const result = await sql<Update>`
    SELECT 
    post_id AS postId,
    title,
    content AS description,
    cover_image AS coverImage,
    post_date AS date,
    post_by AS updateBy
    FROM posts
    ORDER BY post_date DESC
  `;
  return result.rows;
}