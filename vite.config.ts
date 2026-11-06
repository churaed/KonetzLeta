import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import eventPageContent from './content/event-pages.json'
// @ts-expect-error Build-time content validation is shared with the Node route generator.
import { loadEventPages } from './scripts/event-pages.mjs'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  define: { __EVENT_PAGES__: JSON.stringify(loadEventPages(eventPageContent).filter((page: { status: string }) => command === 'serve' || page.status === 'published')) },
  base: '/',
  plugins: [react({
    babel: {
      plugins: ['styled-jsx/babel'],
    },
  }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
