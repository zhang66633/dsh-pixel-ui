/**
 * dsh-pixel-ui — node-half (host) tests.
 *
 * Loads lib/index.js with $DSH_HOME pointed at a temp directory, mounts the
 * routes through a fake webServer, and drives them with fake req/res:
 *   - font whitelist (200 + right type + exact bytes, 404 for others and traversal)
 *   - preference GET/PUT round-trip, validation (400), method guard (405),
 *     atomic file location under $DSH_HOME/storages
 * Run: node scripts/test-host.mjs
 */
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, existsSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { register } from 'node:module'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const HOME = mkdtempSync(join(tmpdir(), 'dsh-pixel-ui-test-'))
process.env.DSH_HOME = HOME

// Resolve @deepseek-ai/* host peers from a local DSH install for this test run.
register(new URL('./resolve-dsh-peers.mjs', import.meta.url))

// lib/index.js resolves the storage path at import time, so it must load after the override.
const mod = await import(new URL('../lib/index.js', import.meta.url).href)

/** Captured route registrations from the fake webServer. */
const routes = []
const disposers = []
const injections = []
const listeners = new Map()
const ctx = {
  webServer: {
    register(route) {
      routes.push(route)
      return () => {
        const i = routes.indexOf(route)
        if (i >= 0) routes.splice(i, 1)
      }
    },
  },
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set())
    listeners.get(event).add(fn)
    return () => { listeners.get(event)?.delete(fn) }
  },
  effect(fn) {
    disposers.push(fn())
  },
}

mod.apply(ctx)

const fontRoute = routes.find((r) => r.path === '/dsh-pixel-ui/fonts')
const prefRoute = routes.find((r) => r.path === '/dsh-pixel-ui/preference')
assert.ok(fontRoute, 'fonts prefix route registered')
assert.ok(prefRoute, 'preference exact route registered')

/** Minimal ServerResponse double. */
function makeRes() {
  const res = { statusCode: null, headers: null, body: null, json: null }
  res.writeHead = (status, headers) => { res.statusCode = status; res.headers = headers }
  res.end = (body) => { res.body = body ?? null }
  return res
}

/** Minimal IncomingMessage double for body-carrying methods. */
function makeReq(method, url, body) {
  const handlers = {}
  const req = {
    method,
    url,
    on(event, fn) { handlers[event] = fn; return req },
    destroy() {},
  }
  if (body !== undefined) {
    queueMicrotask(() => {
      handlers.data?.(Buffer.from(body))
      handlers.end?.()
    })
  }
  return req
}

const call = async (route, method, url, body) => {
  const res = makeRes()
  await route.handler(makeReq(method, url, body), res)
  if (typeof res.body === 'string' && (res.headers?.['content-type'] ?? '').includes('json')) {
    res.json = JSON.parse(res.body)
  }
  return res
}

let passed = 0
const check = (label, fn) => { fn(); passed++; console.log(`  ok ${label}`) }

console.log('== host: identity ==')
check('name + inject', () => {
  assert.equal(mod.name, 'dsh-pixel-ui')
  assert.deepEqual(mod.inject, ['webServer'])
})

console.log('== host: fonts route ==')
const fusion = readFileSync(join(ROOT, 'assets/fonts/fusion-pixel-12px.woff2'))
const press = readFileSync(join(ROOT, 'assets/fonts/PressStart2P-Regular.ttf'))
let res = await call(fontRoute, 'GET', '/dsh-pixel-ui/fonts/fusion-pixel-12px.woff2')
check('woff2 200 + type + exact bytes', () => {
  assert.equal(res.statusCode, 200)
  assert.equal(res.headers['content-type'], 'font/woff2')
  assert.ok(Buffer.compare(res.body, fusion) === 0)
})
res = await call(fontRoute, 'GET', '/dsh-pixel-ui/fonts/PressStart2P-Regular.ttf')
check('ttf 200 + type', () => {
  assert.equal(res.statusCode, 200)
  assert.equal(res.headers['content-type'], 'font/ttf')
})
res = await call(fontRoute, 'GET', '/dsh-pixel-ui/fonts/package.json')
check('unknown file 404', () => assert.equal(res.statusCode, 404))
res = await call(fontRoute, 'GET', '/dsh-pixel-ui/fonts/..%2f..%2fpackage.json')
check('traversal 404', () => assert.equal(res.statusCode, 404))
res = await call(fontRoute, 'GET', '/dsh-pixel-ui/fonts/%2e%2e/%2e%2e/package.json')
check('encoded traversal 404', () => assert.equal(res.statusCode, 404))

console.log('== host: preference route ==')
res = await call(prefRoute, 'GET', '/dsh-pixel-ui/preference')
check('GET default null', () => {
  assert.equal(res.statusCode, 200)
  assert.equal(res.json.theme, null)
  assert.equal(res.headers['cache-control'], 'no-store')
})

const prefFile = join(HOME, 'storages', 'dsh-pixel-ui', 'preference.json')
res = await call(prefRoute, 'PUT', '/dsh-pixel-ui/preference', JSON.stringify({ theme: 'pixel-retro' }))
check('PUT writes + file lands under $DSH_HOME/storages', () => {
  assert.equal(res.statusCode, 200)
  assert.equal(res.json.theme, 'pixel-retro')
  assert.ok(existsSync(prefFile), 'preference file exists')
  const onDisk = JSON.parse(readFileSync(prefFile, 'utf8'))
  assert.equal(onDisk.theme, 'pixel-retro')
})

res = await call(prefRoute, 'GET', '/dsh-pixel-ui/preference')
check('GET round-trip', () => assert.equal(res.json.theme, 'pixel-retro'))

res = await call(prefRoute, 'PUT', '/dsh-pixel-ui/preference', JSON.stringify({ theme: 'system' }))
check('PUT system accepted', () => assert.equal(res.statusCode, 200))

res = await call(prefRoute, 'PUT', '/dsh-pixel-ui/preference', JSON.stringify({ theme: 'dark-space' }))
check('PUT unknown id 400', () => assert.equal(res.statusCode, 400))

res = await call(prefRoute, 'PUT', '/dsh-pixel-ui/preference', 'not json')
check('PUT malformed json 400', () => assert.equal(res.statusCode, 400))

res = await call(prefRoute, 'PUT', '/dsh-pixel-ui/preference', JSON.stringify({ theme: 42 }))
check('PUT non-string theme 400', () => assert.equal(res.statusCode, 400))

res = await call(prefRoute, 'POST', '/dsh-pixel-ui/preference', JSON.stringify({ theme: 'pixel-wood' }))
check('POST accepted (method parity)', () => assert.equal(res.statusCode, 200))

res = await call(prefRoute, 'DELETE', '/dsh-pixel-ui/preference')
check('DELETE 405', () => assert.equal(res.statusCode, 405))

// Corrupt file must read as unset, not crash.
writeFileSync(prefFile, '{oops')
res = await call(prefRoute, 'GET', '/dsh-pixel-ui/preference')
check('corrupt file reads null', () => assert.equal(res.json.theme, null))

console.log('== host: index injection ==')
const emitIndex = () => {
  const table = []
  for (const fn of listeners.get('webserver/index-inject') ?? []) fn(table)
  return table
}
{
  writeFileSync(prefFile, JSON.stringify({ theme: 'pixel-retro' }))
  const table = emitIndex()
  check('boot global carries the durable preference', () => {
    const row = table.find((r) => r.name === '__DSH_PIXEL_UI__')
    assert.ok(row, 'injection row pushed')
    assert.equal(row.kind, 'global')
    assert.deepEqual(row.value, { theme: 'pixel-retro' })
  })
  writeFileSync(prefFile, JSON.stringify({ theme: 'not-a-theme' }))
  check('unknown stored id is normalized to null in the bootstrap', () => {
    const row = emitIndex().find((r) => r.name === '__DSH_PIXEL_UI__')
    assert.deepEqual(row.value, { theme: null })
  })
}

console.log('== host: dispose releases routes ==')
for (const dispose of disposers) dispose()
check('routes released', () => assert.equal(routes.length, 0))
check('index-inject listener released', () => assert.equal(emitIndex().length, 0))

rmSync(HOME, { recursive: true, force: true })
console.log(`\nhost: ${passed} checks passed`)
