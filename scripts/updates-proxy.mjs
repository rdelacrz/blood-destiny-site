/* =====================================================================
   BLOOD DESTINY — local updates shim (dev only)
   The live backend exposes its devlog only through a Telefunc RPC endpoint
   (POST /_telefunc, { ret: [...] } envelope, Telefunc-serialized "!Date:"
   timestamps, no CORS) — none of which a browser SPA can consume directly.
   This tiny zero-dependency proxy relays that RPC server-side and re-serves it
   as a plain, CORS-enabled JSON array that the SPA's fetch() can read.

   Run:   npm run updates:proxy        (defaults to the public Vercel deploy)
   Then:  VITE_UPDATES_API_URL=http://localhost:8787/updates  (see .env)

   For production you'd deploy the equivalent: a public JSON route (or add a
   CORS-enabled REST endpoint to the backend). Never expose the DB URL.
   ===================================================================== */
import http from 'node:http';
import https from 'node:https';

const PORT = Number(process.env.PORT ?? 8787);
const UPSTREAM = (process.env.UPDATES_UPSTREAM ?? 'https://blood-destiny-site.vercel.app').replace(/\/+$/, '');
const TELEFUNC_FILE = process.env.UPDATES_TELEFUNC_FILE ?? '/pages/updates/UpdateContent.telefunc.ts';
const CACHE_MS = Number(process.env.UPDATES_CACHE_MS ?? 30_000);

let cache = { at: 0, body: '' };

/** Call the upstream Telefunc endpoint and return the raw `posts` rows. */
function fetchTelefuncRows() {
  const payload = JSON.stringify({ file: TELEFUNC_FILE, name: 'onLoad', args: [] });
  const url = new URL(`${UPSTREAM}/_telefunc`);
  const client = url.protocol === 'http:' ? http : https;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain', 'Content-Length': Buffer.byteLength(payload) },
  };
  return new Promise((resolve, reject) => {
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (!res.statusCode || res.statusCode >= 400) {
          return reject(new Error(`Upstream telefunc HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
        try {
          const parsed = JSON.parse(data);
          resolve(Array.isArray(parsed?.ret) ? parsed.ret : Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/** Normalise a Telefunc row into clean JSON: strip the "!Date:" date prefix. */
function normalise(row) {
  const date = typeof row.date === 'string' ? row.date.replace(/^!Date:/, '') : row.date;
  return {
    postid: row.postid,
    title: row.title,
    description: row.description,
    coverimage: row.coverimage ?? null,
    date,
    updateby: row.updateby ?? null,
  };
}

async function getBody() {
  const now = Date.now();
  if (cache.body && now - cache.at < CACHE_MS) return cache.body;
  const rows = await fetchTelefuncRows();
  cache = { at: now, body: JSON.stringify(rows.map(normalise)) };
  return cache.body;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  try {
    const body = await getBody();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
  } catch (e) {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: String(e?.message ?? e) }));
  }
});

server.listen(PORT, () => {
  console.log(`updates shim → ${UPSTREAM}/_telefunc  ·  serving http://localhost:${PORT}/updates`);
});
