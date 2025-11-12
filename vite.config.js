// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // 不要な設定を削除し、Vercelが自動検出に成功するようシンプルにします
  server: {
    // host: '0.0.0.0' や port: 5173 はローカル専用のため削除
  },
  base: '/',
  // root: process.cwd(), も publicDir: 'public' もVercelでは不要なため削除
});