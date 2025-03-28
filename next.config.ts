import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'fr', 'es'], // Add all supported locales
    defaultLocale: 'en', // Set your default locale
  },
};

export default nextConfig;
