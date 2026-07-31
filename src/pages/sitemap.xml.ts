import type { APIRoute } from 'astro';

const pages = ['', 'park/', 'season/', 'access/', 'food/', 'around/', 'memory-card/', 'privacy/'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://shinotsupark.com');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((path) => `<url><loc>${new URL(path, base).href}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
