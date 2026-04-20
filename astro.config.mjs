// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Roboto",
      cssVariable: "--font-roboto",
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
  ],
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
  integrations: [sitemap(), react()],
  adapter: cloudflare(),
  site: "https://haze.fyro.dev",
});