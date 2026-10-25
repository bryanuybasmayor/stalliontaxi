import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// TODO: when the owner confirms a domain, set `site: 'https://...'` here so
// canonical URLs and og:image can be absolute.
export default defineConfig({
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
