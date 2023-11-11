import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

async function getUpdates(request: VercelRequest, response: VercelResponse) {
  try {
    const result = await sql`SELECT post_id, title, content, image, post_date, post_by FROM posts`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET': return getUpdates(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}