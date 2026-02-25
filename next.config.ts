import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
};

export default nextConfig;

// Для коректної роботи з віддаленими зображеннями у Next.js (аватар профілю) потрібно в next.config.ts додати розділ images з масивом remotePatterns, який обов’язково містить hostname: 'ac.goit.global'.
