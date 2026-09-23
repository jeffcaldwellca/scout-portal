import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.jeffcaldwell.ca',
  base: '/scout-portal',
  trailingSlash: 'ignore',
  // Astro 7 defaults to 'jsx' whitespace stripping, which drops the space in
  // templates like "portal for\n<span>FreeScout</span>". Keep v6 HTML rules.
  compressHTML: true,
  integrations: [
    sitemap({
      serialize(item) {
        const root = 'https://www.jeffcaldwell.ca/scout-portal/';
        if (item.url !== root) {
          item.url = item.url.replace(/\/$/, '');
        }
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
