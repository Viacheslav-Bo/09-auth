import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

// Для коректної роботи з віддаленими зображеннями у Next.js (аватар профілю) потрібно в next.config.ts додати розділ images з масивом remotePatterns, який обов’язково містить hostname: 'ac.goit.global'.
