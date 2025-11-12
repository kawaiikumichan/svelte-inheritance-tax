// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // Vercelがすべて自動検出するよう、base, server, root, publicDir設定を削除し、
  // デフォルト設定のみに戻します。
});
