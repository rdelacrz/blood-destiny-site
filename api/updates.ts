import type { VercelRequest, VercelResponse } from '@vercel/node';

async function getUpdates(request: VercelRequest, response: VercelResponse) {
  return response.status(200).send(true);
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET': return getUpdates(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}