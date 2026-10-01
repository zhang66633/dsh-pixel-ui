/**
 * dsh-pixel-ui — node half.
 *
 * Serves the bundled pixel fonts to the browser half under
 * `/dsh-pixel-ui/fonts/<file>` (filename whitelist — no path traversal) and
 * persists the selected theme under `$DSH_HOME/storages/dsh-pixel-ui/preference.json`
 * behind `/dsh-pixel-ui/preference` (GET reads, PUT writes).
 *
 * The durable preference is what fixes DSH Desktop's random local port: the
 * browser half keys `localStorage` per origin (including the port), so a
 * per-launch port forgot the chosen skin on every restart. The host file is
 * port-independent, and the browser half prefers it over its local mirror.
 *
 * @module dsh-pixel-ui
 */
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveDshHome } from '@deepseek-ai/dsh-home-paths'

/** Plugin name; also the patch row id. */
export const name = 'dsh-pixel-ui'

/** Required services: the web route registry. */
export const inject = ['webServer']

const FONTS_DIR = fileURLToPath(new URL('../assets/fonts/', import.meta.url))

const FONT_TYPES = {
  'fusion-pixel-12px.woff2': 'font/woff2',
  'PressStart2P-Regular.ttf': 'font/ttf',
}

/** Built-in preference ids plus this plugin's own pixel ids. */
const BUILTIN_IDS = new Set(['light', 'dark', 'system'])

/** Theme ids accepted from the wire: built-ins or `pixel-*`. */
function normalizeTheme(value) {
  if (typeof value !== 'string') return null
  const id = value.trim()
  if (BUILTIN_IDS.has(id) || /^pixel-[a-z0-9-]{1,48}$/.test(id)) return id
  return null
}

const PREFERENCE_DIR = join(resolveDshHome(), 'storages', 'dsh-pixel-ui')
const PREFERENCE_FILE = join(PREFERENCE_DIR, 'preference.json')

/**
 * Page-bootstrap global carrying the durable preference.
 *
 * DSH Desktop renders the page from `dsh-app://app/`, so a same-origin
 * relative fetch of the preference route (the Web deployment's transport)
 * cannot work there. The Host knows the value before the first paint, so the
 * index injection is the one transport that exists in both deployments.
 */
const BOOTSTRAP_GLOBAL = '__DSH_PIXEL_UI__'

/** Read the durable preference; missing or corrupt files read as unset. */
function readPreference() {
  try {
    const parsed = JSON.parse(readFileSync(PREFERENCE_FILE, 'utf8'))
    return normalizeTheme(parsed?.theme)
  } catch {
    return null
  }
}

/** Atomically persist the preference (tmp + rename). Storage failures are non-fatal. */
function writePreference(theme) {
  try {
    mkdirSync(PREFERENCE_DIR, { recursive: true })
    const tmp = `${PREFERENCE_FILE}.${process.pid}.tmp`
    writeFileSync(tmp, `${JSON.stringify({ theme })}\n`)
    renameSync(tmp, PREFERENCE_FILE)
    return true
  } catch {
    return false
  }
}

/** Collect a JSON request body with a hard size cap. */
function readJsonBody(req, limitBytes = 2048) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limitBytes) {
        reject(new Error('body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) }
      catch (error) { reject(error) }
    })
    req.on('error', reject)
  })
}

const json = (res, status, payload) => {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

/**
 * Mount the plugin routes: the font prefix and the preference endpoint.
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

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/dsh-pixel-ui/preference',
    handler: async (req, res) => {
      if (req.method === 'GET' || req.method === 'HEAD') {
        json(res, 200, { theme: readPreference() })
        return
      }
      if (req.method === 'PUT' || req.method === 'POST') {
        let theme = null
        try {
          const body = await readJsonBody(req)
          theme = normalizeTheme(body?.theme)
        } catch {
          json(res, 400, { error: 'invalid json body' })
          return
        }
        if (theme === null || !writePreference(theme)) {
          json(res, 400, { error: 'theme must be light, dark, system or pixel-*' })
          return
        }
        json(res, 200, { theme })
        return
      }
      json(res, 405, { error: 'method not allowed' })
    },
  }), 'dsh-pixel-ui: preference route')

  ctx.effect(() => ctx.on('webserver/index-inject', (table) => {
    table.push({ kind: 'global', name: BOOTSTRAP_GLOBAL, value: { theme: readPreference() } })
  }), 'dsh-pixel-ui: boot preference injection')
}
