// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  base: '/',
  root: process.cwd(), // この行はローカル実行用として残しておく
  
  // ★重要★ ここでルートディレクトリを設定し、index.html の場所を指定します
  publicDir: 'public', // public フォルダを静的アセットのベースとして指定
});