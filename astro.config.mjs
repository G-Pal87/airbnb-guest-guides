import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://g-pal87.github.io',
  base: '/airbnb-guest-guides',
  integrations: [tailwind()],
  output: 'static',
});
