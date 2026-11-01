import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://hammadzaigham.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
