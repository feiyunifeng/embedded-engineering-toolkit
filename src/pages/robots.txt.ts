import { siteConfig } from '../config/site';

export const GET = () => new Response(`User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap-index.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
