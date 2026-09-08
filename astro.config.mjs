// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://syntegreti.com',
  integrations: [sitemap()],
  redirects: {
    '/products/controlplane': '/products/ai-governance',
    '/products/praetor': '/products/ai-governance',
    '/products/evaluetor': '/products/contract-intelligence',
    '/products/intuka': '/products/business-operations',
    '/products/regassure': '/products/regulatory-reporting',
    '/products/workweave': '/products/agent-platform',
    '/products/bettersdlc': '/products/ai-sdlc',
    '/case-studies/renuity-compliance-platform': '/case-studies/contractor-compliance-platform',
  },
  vite: {
    plugins: [tailwindcss()]
  },
  // Only use Cloudflare adapter for builds, not dev server
  ...(isProduction ? { adapter: cloudflare() } : {}),
});
