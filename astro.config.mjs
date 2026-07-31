import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL || 'https://shinotsupark.com';

export default defineConfig({
  site,
  output: 'server',
  adapter: cloudflare(),
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
