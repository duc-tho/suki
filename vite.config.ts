import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
   plugins: [
      adonisjs({
         /**
          * Entrypoints of your application. Each entrypoint will
          * result in a separate bundle.
          */
         entrypoints: ['resources/css/app.css', 'resources/js/app.tsx'],

         /**
          * Paths to watch and reload the browser on file change
          */
         reload: ['resources/views/**/*.edge'],
      }),
      react(),
      tailwindcss(),
      VitePWA({
         outDir: 'public',
         registerType: 'autoUpdate',
         injectRegister: false,
         workbox: {
            navigateFallback: '/',
            navigateFallbackDenylist: [
               new RegExp('^/*/sw\\.js$'),
               new RegExp('^/*/manifest\\.webmanifest$'),
               new RegExp('^/*/android-icon.*\\.png$'),
               new RegExp('^/*/logo\\.png$'),
               new RegExp('^/api/'), // nếu có API
            ],
            additionalManifestEntries: [
               {
                  url: '/',
                  revision: 'v1',
               },
            ],
            globPatterns: [
               './*.{js,css,html,png,svg,ico,json}',
               './assets/app*.{js,css}',
               './assets/manifest.webmanifest',
               './images/backgrounds/**/*.*',
               './images/icons/**/*.*',
               './images/stickers/**/*.*',
            ],
            runtimeCaching: [
               {
                  urlPattern: /\/videos\/backgrounds\/.*\.mp4$/,
                  handler: 'CacheFirst',
                  options: {
                     cacheName: 'suki-video-cache',
                     expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                     },
                     cacheableResponse: {
                        statuses: [200],
                     },
                  },
               },
            ],
         },
         manifest: {
            lang: 'vi',
            short_name: 'Suki',
            name: 'Suki',
            description: 'Suki App made by ntho with love <3',
            icons: [
               {
                  src: '\/android-icon-36x36.png',
                  sizes: '36x36',
                  type: 'image\/png',
               },
               {
                  src: '\/android-icon-48x48.png',
                  sizes: '48x48',
                  type: 'image\/png',
               },
               {
                  src: '\/android-icon-72x72.png',
                  sizes: '72x72',
                  type: 'image\/png',
               },
               {
                  src: '\/android-icon-96x96.png',
                  sizes: '96x96',
                  type: 'image\/png',
               },
               {
                  src: '\/android-icon-144x144.png',
                  sizes: '144x144',
                  type: 'image\/png',
               },
               {
                  src: '\/android-icon-192x192.png',
                  sizes: '192x192',
                  type: 'image\/png',
               },
               {
                  src: 'logo.png',
                  type: 'image/png',
                  sizes: '490x490',
               },
               {
                  src: '/logo.png',
                  type: 'image/png',
                  sizes: '490x490',
               },
            ],
            start_url: '/',
            display: 'standalone',
            theme_color: '#272b30',
            background_color: '#272b30',
         },
      }),
   ],
   resolve: {
      alias: {
         '@': path.resolve(import.meta.dirname, './resources/js'),
      },
   },
})
