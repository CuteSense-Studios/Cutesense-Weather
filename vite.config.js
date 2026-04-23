import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

export default defineConfig({
  plugins: [react()],
  base: '/Cutesense-Weather/', 
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        const shouldLog =
          url.includes('/assets/icons/favicon.svg') ||
          url.includes('/assets/fonts/kalam-v18-latin-regular.woff2') ||
          url.includes('/favicon.ico')

        if (!shouldLog) return next()

        const start = Date.now()
        res.on('finish', () => {
          try {
            fs.appendFileSync(
              'debug-1b9c81.log',
              `${JSON.stringify({
                sessionId: '1b9c81',
                runId: 'pre-fix',
                hypothesisId: 'H6',
                location: 'vite.config.js:configureServer',
                message: 'Asset request observed',
                data: {
                  method: req.method,
                  url,
                  statusCode: res.statusCode,
                  durationMs: Date.now() - start,
                },
                timestamp: Date.now(),
              })}\n`
            )
          } catch {
            // ignore
          }
        })

        next()
      })
    },
  },
})