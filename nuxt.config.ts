import process from 'node:process'
import { consola } from 'consola'
import { prefetchQuery, siteQuery } from './queries'

const shouldPrerender = process.env.NITRO_PRERENDER_PAGES === 'true'
if (shouldPrerender) consola.info('Prerendering enabled')

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // If you project doesn't require i18n, use the `without-i18n` branch instead:
  // https://github.com/johannschopplich/cacao-kit-frontend/tree/chore/without-i18n
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  app: {
    rootId: 'app',
  },

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  ssr: false,

  kql: {
    auth: 'bearer',
  },

  // nitro: {
  //   prerender: {
  //     // Enable Nitro's crawler to prerender all pages (optional)
  //     // If Kirby content changes, the frontend will have to be rebuilt
  //     ...(shouldPrerender && {
  //       crawlLinks: shouldPrerender,
  //       routes: ['/en'],
  //     }),
  //   },
  // },

  vite: {
    server: {
      // This is only required for the `pnpm dev:tunnel` command
      // to proxy Kirby requests, especially images
      proxy: {
        '/__kirby': {
          target: process.env.KIRBY_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/__kirby/, ''),
        },
      },
    },
  },
})
