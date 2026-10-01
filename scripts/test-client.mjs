/**
 * dsh-pixel-ui — browser-half (client) tests.
 *
 * Loads the real wire-format bundle (lib/client.js) through a
 * window.__ModuleLoader__ shim with stubbed platform modules (react,
 * @deepseek-ai/dsh-client-store), then drives apply() with a fake cordis
 * context (faithful ThemeService semantics) + fake DOM/localStorage/fetch.
 * Covers: theme registration, scope attributes, stylesheet injection,
 * two-layer restore (local mirror vs host file), explicit picks, host
 * built-in re-assert, modern-default escape, and row rendering/a11y.
 * Run: node scripts/test-client.mjs
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const tick = async (n = 4) => { for (let i = 0; i < n; i++) await new Promise((r) => setTimeout(r, 0)) }

let passed = 0
const check = (label, fn) => { fn(); passed++; console.log(`  ok ${label}`) }

/* ── platform module stubs ───────────────────────────────── */

const fakeH = (type, props, ...children) => ({ type, props, children })

/** Faithful-enough defineStore: init + draft-mutator actions + snapshot reads. */
function fakeDefineStore(decl) {
  return {
    spec: decl,
    create() {
      let state = decl.init()
      const actions = {}
      for (const key of Object.keys(decl.actions ?? {})) {
        actions[key] = (...params) => {
          const draft = { ...state }
          decl.actions[key](draft, ...params)
          state = draft
        }
      }
      return { actions, getSnapshot: () => state, subscribe: () => () => {}, store: {}, clearPersisted: () => {} }
    },
  }
}

/* ── browser environment stubs ───────────────────────────── */

const styleTags = []
const htmlAttrs = new Map()
const htmlEl = {
  style: {},
  setAttribute: (k, v) => htmlAttrs.set(k, v),
  removeAttribute: (k) => htmlAttrs.delete(k),
  toggleAttribute: (k, on) => { on ? htmlAttrs.set(k, '') : htmlAttrs.delete(k) },
  hasAttribute: (k) => htmlAttrs.has(k),
}
globalThis.document = {
  documentElement: htmlEl,
  createElement: () => ({
    dataset: {},
    textContent: '',
    appended: false,
    remove() {
      const i = styleTags.indexOf(this)
      if (i >= 0) styleTags.splice(i, 1)
    },
  }),
  head: { appendChild: (el) => { el.appended = true; styleTags.push(el) } },
}
globalThis.localStorage = (() => {
  const map = new Map()
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    _map: map,
  }
})()
const fetchCalls = []
let fetchResponder = async () => ({ ok: true, json: async () => ({ theme: null }) })
globalThis.fetch = async (url, init) => {
  fetchCalls.push({ url, init, method: init?.method ?? 'GET', body: init?.body ?? null })
  return fetchResponder(url, init)
}

/* ── wire-format loading ─────────────────────────────────── */

let loaded = null
// The plugin reads the index-injection bootstrap off `globalThis`, exactly as
// a browser does (window === globalThis); the shim only adds the loader.
globalThis.window = globalThis
globalThis.__ModuleLoader__ = {
  load(entry) { loaded = entry },
}

const bundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
;(0, eval)(bundle)

check('wire format: window.__ModuleLoader__.load({ id, factory })', () => {
  assert.equal(loaded.id, 'dsh-pixel-ui')
  assert.equal(typeof loaded.factory, 'function')
})

const requireStub = (id) => {
  if (id === 'react') return { createElement: fakeH }
  if (id === '@deepseek-ai/dsh-client-store') return { defineStore: fakeDefineStore }
  throw new Error(`unexpected require: ${id}`)
}
const mod = loaded.factory(requireStub)

check('module exports', () => {
  assert.equal(mod.name, 'dsh-pixel-ui')
  assert.deepEqual(mod.inject, ['slots', 'theme', 'locale'])
  assert.equal(typeof mod.apply, 'function')
})

/* ── fake cordis context ─────────────────────────────────── */

function makeCtx(initialPreference = 'light') {
  const listeners = new Map()
  const effects = []
  const themes = [
    { id: 'light', colorScheme: 'light', tokens: {} },
    { id: 'dark', colorScheme: 'dark', tokens: {} },
  ]
  let preference = initialPreference
  let revision = 0
  const snapshot = () => {
    const active = themes.find((t) => t.id === preference) ?? themes[0]
    return { preference, revision, active: { id: active.id, colorScheme: active.colorScheme, tokens: active.tokens }, themes }
  }
  const ctx = {
    theme: {
      register(def) {
        if (themes.some((t) => t.id === def.id)) throw new Error(`theme "${def.id}" is already registered`)
        themes.push(def)
        publish()
        return () => {
          const i = themes.findIndex((t) => t.id === def.id)
          if (i >= 0) themes.splice(i, 1)
          publish()
        }
      },
      setTheme(id) {
        if (id !== 'system' && !themes.some((t) => t.id === id)) throw new Error(`theme "${id}" is not registered`)
        if (preference === id) return
        preference = id
        publish()
      },
      getTheme: snapshot,
    },
    slots: {
      entries: [],
      injected: [],
      // The platform invokes the inject factory when the slot mounts.
      inject(name, factory) {
        ctx.slots.injected.push({ name, factory })
        factory()
      },
      register(options, component) { ctx.slots.entries.push({ options, component }) },
    },
    locale: { registered: [], register(ns, dict) { ctx.locale.registered.push({ ns, dict }) } },
    on(event, fn) {
      if (!listeners.has(event)) listeners.set(event, [])
      listeners.get(event).push(fn)
    },
    // Framework-faithful: the effect callback runs at registration and its
    // return value (when a function) is the teardown; ctx.effect() itself
    // returns a disposer that runs that teardown exactly once.
    effect(fn, label) {
      let cleanup
      const entry = {
        fn,
        label,
        dispose: () => {
          const teardown = cleanup
          cleanup = null
          if (typeof teardown === 'function') teardown()
        },
      }
      cleanup = fn()
      effects.push(entry)
    },
    effects,
    _themes: themes,
  }
  const publish = () => {
    revision += 1
    for (const fn of listeners.get('theme/change') ?? []) fn(snapshot())
  }
  return ctx
}

/* ── tree helpers ────────────────────────────────────────── */

function findButtons(node, out = []) {
  if (!node || typeof node !== 'object') return out
  if (Array.isArray(node)) {
    for (const item of node) findButtons(item, out)
    return out
  }
  if (node.type === 'button') out.push(node)
  for (const child of node.children ?? []) findButtons(child, out)
  return out
}
function textOf(node) {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return (node.children ?? []).map(textOf).join('')
}
function renderRow(ctx) {
  const entry = ctx.slots.entries[0]
  const instance = entry.options.store.create()
  const face = entry.options.inject(instance.actions)
  const zh = ctx.locale.registered.find((r) => r.ns === 'settings.pixel-ui')?.dict.zh ?? {}
  const t = (key) => zh[key] ?? key
  const tree = entry.component({ useStore: (sel) => sel(instance.getSnapshot()), t, setTheme: face.setTheme })
  return { tree, buttons: findButtons(tree), t }
}

/** Fresh plugin instance with the given persisted state. */
function boot({ localTheme = null, hostTheme = null, bootTheme = undefined } = {}) {
  styleTags.length = 0
  htmlAttrs.clear()
  globalThis.localStorage._map.clear()
  if (localTheme !== null) globalThis.localStorage.setItem('dsh-pixel-ui:theme', localTheme)
  fetchCalls.length = 0
  fetchResponder = async () => ({ ok: true, json: async () => ({ theme: hostTheme }) })
  if (bootTheme === undefined) delete globalThis.window.__DSH_PIXEL_UI__
  else globalThis.window.__DSH_PIXEL_UI__ = { theme: bootTheme }
  const ctx = makeCtx()
  mod.apply(ctx)
  return ctx
}

/* ── registration & static wiring ────────────────────────── */

console.log('== client: registration ==')
{
  const ctx = boot()
  check('four pixel themes registered with the 14-token palette', () => {
    const ids = ctx._themes.map((t) => t.id)
    for (const id of ['pixel-wood', 'pixel-paper', 'pixel-warm', 'pixel-retro']) assert.ok(ids.includes(id))
    const wood = ctx._themes.find((t) => t.id === 'pixel-wood')
    assert.equal(wood.colorScheme, 'dark')
    assert.equal(Object.keys(wood.tokens).length, 14)
    assert.equal(wood.tokens['--dsw-alias-state-idle-primary'], '#7A5C3E')
    const paper = ctx._themes.find((t) => t.id === 'pixel-paper')
    assert.equal(paper.colorScheme, 'light')
    assert.equal(paper.tokens['--dsw-alias-brand-primary'], '#8A6400')
  })
  check('stylesheet injected with plugin dataset', () => {
    assert.equal(styleTags.length, 1)
    assert.equal(styleTags[0].dataset.plugin, 'dsh-pixel-ui')
    assert.ok(styleTags[0].textContent.includes('html[data-pixel-ui]'))
    assert.ok(styleTags[0].textContent.includes('--px-accent-bg'))
    assert.equal(styleTags[0].appended, true)
  })
  check('stylesheet widens the host content column and drops the scanline overlay', () => {
    const css = styleTags[0].textContent
    // The Host never assigns --dsh-conversation-column-width, so its clamp
    // stays at the 680px floor; the skin supplies the missing value at the
    // root with !important (the Host writes the user width inline).
    assert.ok(css.includes('--dsh-conversation-column-width'))
    assert.ok(css.includes('--dsh-chat-user-width: var(--px-chat-width) !important'))
    assert.ok(css.includes('[class*=\'xz4KEq_column\']'), 'column fallback rule present')
    // 1px CRT scanlines read as anti-aliased grey on fractional DPRs.
    assert.equal(css.includes('px-crt-flicker') && css.includes('repeating-linear-gradient(\n      0deg'), false)
  })
  check('stylesheet is flat: no depth cues, no blanket container selectors', () => {
    const raw = styleTags[0].textContent
    // Comments are documentation, not rules — audit the declarations only.
    const css = raw.replace(/\/\*[\s\S]*?\*\//g, '')
    // User decision 2026-10-01: no 3D at all.
    assert.equal(/box-shadow\s*:/.test(css), false, 'no box-shadow anywhere')
    assert.equal(/text-shadow\s*:/.test(css), false, 'no text-shadow anywhere')
    assert.equal(/blur\(/.test(css), false, 'no blur filters')
    assert.equal(/--px-bevel/.test(css), false, 'bevel tokens removed')
    // v1.4 styled bare `[class*=X]` selectors (panel/card/header/sidebar/tab/
    // message/content/…), which matched host containers and icon classes the
    // skin never meant to touch — the "stamped box everywhere" regression.
    // Only two shapes may survive: the documented column fallback, and
    // element-scoped utilities (`button[class*='primary']`).
    const bad = []
    for (const m of css.matchAll(/([^\s{}>+~,]*)\[class\*=[^\]]+\]/g)) {
      const prefix = m[1]
      if (prefix === '' && m[0].includes('xz4KEq_column')) continue
      if (prefix.startsWith('button')) continue
      bad.push(m[0])
    }
    assert.deepEqual([...new Set(bad)], [], `unscoped blanket selectors: ${bad.join(' ')}`)
  })
  check('locale dictionaries registered (zh/en key sets equal)', () => {
    const reg = ctx.locale.registered.find((r) => r.ns === 'settings.pixel-ui')
    assert.ok(reg, 'settings.pixel-ui registered')
    assert.deepEqual(Object.keys(reg.dict.zh).sort(), Object.keys(reg.dict.en).sort())
  })
  check('settings.general.item slot registered with locale', () => {
    const entry = ctx.slots.entries[0]
    assert.equal(entry.options.name, 'settings.general.item')
    assert.equal(entry.options.id, 'pixel-theme')
    assert.equal(entry.options.order, 20)
    assert.equal(entry.options.locale, 'settings.pixel-ui')
    assert.equal(typeof entry.options.store.create, 'function')
    assert.equal(typeof entry.component, 'function')
  })
  await tick()
}

/* ── restore matrix ──────────────────────────────────────── */

console.log('== client: restore ==')
{
  const ctx = boot()
  await tick()
  check('first run: default pixel-wood + scope attributes + mirrored locally', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-wood')
    assert.equal(htmlEl.hasAttribute('data-pixel-ui'), true)
    assert.equal(htmlAttrs.get('data-pixel-theme'), 'pixel-wood')
    assert.equal(globalThis.localStorage.getItem('dsh-pixel-ui:theme'), 'pixel-wood')
  })
  check('first run: host file written', () => {
    const put = fetchCalls.find((c) => c.method === 'PUT')
    assert.ok(put, 'PUT issued')
    assert.deepEqual(JSON.parse(put.body), { theme: 'pixel-wood' })
  })
}
{
  const ctx = boot({ hostTheme: 'pixel-retro' })
  await tick()
  check('fresh port: host preference wins over default', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-retro')
    assert.equal(htmlAttrs.get('data-pixel-theme'), 'pixel-retro')
    assert.equal(globalThis.localStorage.getItem('dsh-pixel-ui:theme'), 'pixel-retro')
  })
}
{
  const ctx = boot({ localTheme: 'pixel-warm', hostTheme: 'pixel-retro' })
  check('stale local mirror: host applied synchronously (no default flash)', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-warm')
  })
  await tick()
  check('stale local mirror: host file reconciles afterwards', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-retro')
    assert.equal(globalThis.localStorage.getItem('dsh-pixel-ui:theme'), 'pixel-retro')
  })
}
{
  const ctx = boot({ localTheme: 'system', hostTheme: 'system' })
  await tick()
  check('modern default persisted: no skin, no scope attribute', () => {
    assert.equal(ctx.theme.getTheme().preference, 'system')
    assert.equal(htmlEl.hasAttribute('data-pixel-ui'), false)
    assert.equal(htmlAttrs.has('data-pixel-theme'), false)
  })
}
{
  const ctx = boot({ localTheme: 'not-a-theme' })
  await tick()
  check('garbage local value treated as first run', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-wood')
  })
}
{
  fetchResponder = async () => ({ ok: false, json: async () => ({}) })
  const ctx = boot({ localTheme: 'pixel-paper' })
  await tick()
  check('host route unavailable: local mirror still applies', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-paper')
  })
}
{
  // DSH Desktop: the page runs on the `dsh-app://` origin, where the relative
  // preference fetch always fails. The index injection is the only transport.
  const ctx = boot({ bootTheme: 'pixel-retro', hostTheme: null })
  await tick()
  check('desktop bootstrap: injected preference beats the unreachable route', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-retro')
    assert.equal(htmlAttrs.get('data-pixel-theme'), 'pixel-retro')
    assert.equal(fetchCalls.some((c) => c.method === 'GET'), false, 'no routed GET when the bootstrap answers')
  })
}
{
  const ctx = boot({ bootTheme: 'not-a-theme' })
  await tick()
  check('desktop bootstrap: unusable injected value falls back to the default skin', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-wood')
  })
}
{
  // The Host applies its own preference (settings scope) right after our first
  // setTheme; the skin must win, not the built-in that lands late.
  const ctx = boot()
  ctx.theme.setTheme('light')
  await tick()
  check('late built-in during restore: skin wins over the Host initial preference', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-wood')
    assert.equal(htmlEl.hasAttribute('data-pixel-ui'), true)
  })
}

/* ── interactions ────────────────────────────────────────── */

console.log('== client: interactions ==')
{
  const ctx = boot()
  await tick()
  ctx.theme.setTheme('pixel-paper') // host-side re-apply path below
  const before = fetchCalls.length

  // The host re-applies a built-in (model / reasoning switch): skin must return.
  ctx.theme.setTheme('light')
  check('host built-in re-apply: pixel skin re-asserted', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-paper')
  })

  const { tree, buttons, t } = renderRow(ctx)
  check('row renders group + title + desc + five choices', () => {
    assert.equal(tree.props.role, 'group')
    assert.equal(tree.props['aria-label'], '像素主题')
    assert.ok(textOf(tree).includes('像素主题'))
    assert.ok(textOf(tree).includes('选择后立即生效'))
    assert.equal(buttons.length, 5)
    assert.equal(textOf(buttons[0]), '像素·木屋')
    assert.equal(textOf(buttons[4]), '现代默认')
  })
  check('aria-pressed marks the current pick; swatch is decorative', () => {
    assert.equal(buttons[1].props['aria-pressed'], true)
    assert.equal(buttons[0].props['aria-pressed'], false)
    const swatch = buttons[1].children[0]
    assert.equal(swatch.props['aria-hidden'], 'true')
    assert.equal(swatch.props.style.background, '#FFFDF5')
  })
  const putCountBefore = fetchCalls.filter((c) => c.method === 'PUT').length
  buttons[4].props.onClick()
  check('explicit pick writes both layers', () => {
    assert.equal(ctx.theme.getTheme().preference, 'system')
    assert.equal(globalThis.localStorage.getItem('dsh-pixel-ui:theme'), 'system')
    assert.equal(htmlEl.hasAttribute('data-pixel-ui'), false)
    const puts = fetchCalls.filter((c) => c.method === 'PUT')
    assert.ok(puts.length > putCountBefore)
    assert.deepEqual(JSON.parse(puts[puts.length - 1].body), { theme: 'system' })
  })
  const row2 = renderRow(ctx)
  check('row re-render moves aria-pressed to 现代默认', () => {
    assert.equal(row2.buttons[4].props['aria-pressed'], true)
    assert.equal(row2.buttons[1].props['aria-pressed'], false)
  })
  row2.buttons[0].props.onClick()
  check('pick from modern default re-activates the skin', () => {
    assert.equal(ctx.theme.getTheme().preference, 'pixel-wood')
    assert.equal(htmlAttrs.get('data-pixel-theme'), 'pixel-wood')
    assert.equal(globalThis.localStorage.getItem('dsh-pixel-ui:theme'), 'pixel-wood')
  })
}

/* ── dispose ─────────────────────────────────────────────── */

console.log('== client: dispose ==')
{
  const ctx = boot()
  await tick()
  for (const effect of ctx.effects) effect.dispose()
  check('dispose removes stylesheet and scope attributes', () => {
    assert.equal(styleTags.length, 0)
    assert.equal(htmlEl.hasAttribute('data-pixel-ui'), false)
    assert.equal(htmlAttrs.has('data-pixel-theme'), false)
  })
}

console.log(`\nclient: ${passed} checks passed`)
