/**
 * dsh-pixel-ui — node half.
 *
 * Serves the bundled pixel fonts to the browser half under
 * `/dsh-pixel-ui/fonts/<file>` (filename whitelist — no path traversal).
 * The theme itself lives entirely in the browser half; this package is
 * dual-face only so the fonts have a stable same-origin URL.
 *
 * @module dsh-pixel-ui
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Plugin name; also the patch row id. */
export const name = 'dsh-pixel-ui'

/** Required services: the web route registry. */
export const inject = ['webServer']

const FONTS_DIR = fileURLToPath(new URL('../assets/fonts/', import.meta.url))

const FONT_TYPES = {
  'fusion-pixel-12px.woff2': 'font/woff2',
  'PressStart2P-Regular.ttf': 'font/ttf',
}

/**
 * Mount the font route.
 * @param ctx - context carrying webServer.
 */
export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: '/dsh-pixel-ui/fonts',
    handler: (req, res) => {
      const pathname = new URL(req.url ?? '/', 'http://x').pathname
      const file = pathname.slice('/dsh-pixel-ui/fonts/'.length)
      const type = FONT_TYPES[file]
      if (type === undefined) {
        res.writeHead(404)
        res.end()
        return
      }
      res.writeHead(200, {
        'content-type': type,
        'cache-control': 'public, max-age=86400',
      })
      res.end(readFileSync(join(FONTS_DIR, file)))
    },
  }), 'dsh-pixel-ui: fonts route')
}
