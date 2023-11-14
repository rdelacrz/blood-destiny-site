import { telefunc } from 'telefunc';

// We use JSDoc instead of TypeScript because Vercel seems buggy with /api/**/*.ts files

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async (req, res) => {
  console.log('telefunc body: ', {
    url: req.url,
    body: req.body,
    method: req.method,
  })
  const httpResponse = await telefunc({
    url: req.url,
    body: req.body,
    method: req.method,
  });
  res.setHeader("content-type", httpResponse.contentType);
  res.status(httpResponse.statusCode).send(httpResponse.body);
};