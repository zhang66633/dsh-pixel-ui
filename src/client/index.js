/**
 * dsh-pixel-ui — browser half (the pixel skin).
 *
 * Registers four Agent-Xi-style pixel themes on the ThemeService seam
 * (`ctx.theme.register` with --dsw-alias-* token overrides): wood (dark),
 * paper (light), warm (dark), retro-green (dark). The stylesheet carries
 * the pixel borders, fonts, CRT overlay, and component tweaks that alias
 * tokens alone cannot express, scoped to `html[data-pixel-ui]` with a
 * `data-pixel-theme` variant attribute for the four palettes.
 *
 * Theme-choice memory is two-layered on purpose:
 *   1. the browser `localStorage` mirror (instant, per-origin);
 *   2. the host-side durable preference (`/dsh-pixel-ui/preference`,
 *      stored under $DSH_HOME) which survives DSH Desktop's per-launch
 *      random local port — the origin (port included) changes on every
 *      restart, so the mirror alone forgets the choice.
 * The host file is authoritative whenever the mirror is absent (new port);
 * explicit user picks are written to both layers at once.
 *
 * The host settings scope persists only the built-in preferences
 * (light/dark/system), so switching model / reasoning-effort re-applies that
 * built-in and would visibly drop the skin. We keep the user's intended
 * theme and re-assert a pixel theme whenever a built-in arrives without an
 * explicit choice in the settings row below (restore must be a user action,
 * not an app-forced re-init).
 *
 * @module dsh-pixel-ui/client
 */
import { createElement as h } from 'react'
import { defineStore } from '@deepseek-ai/dsh-client-store'
import cssText from './pixel.css'

/** Plugin name; also the patch row id. */
export const name = 'dsh-pixel-ui'

/** Required services: the theme runtime, the settings item slot, the locale. */
export const inject = ['slots', 'theme', 'locale']

/** localStorage key carrying the per-origin theme mirror. */
const THEME_STORAGE_KEY = 'dsh-pixel-ui:theme'

/** Host-backed durable preference route (registered by the node half). */
const PREFERENCE_URL = '/dsh-pixel-ui/preference'

/**
 * Page-bootstrap global written by the node half's index injection. DSH
 * Desktop renders from `dsh-app://app/`, where the relative fetch above can
 * never reach the loopback route, so the injection is the transport that
 * exists on both deployments.
 */
const BOOTSTRAP_GLOBAL = '__DSH_PIXEL_UI__'

/** Default skin for a first run (no mirror, no durable preference). */
const DEFAULT_SKIN = 'pixel-wood'

/** The four pixel themes (Agent Xi palettes) registered on the ThemeService. */
const THEMES = [
  {
    id: 'pixel-wood',
    colorScheme: 'dark',
    tokens: {
      '--dsw-alias-bg-base': '#1A0F06',
      '--dsw-alias-bg-layer-1': '#2C1A0C',
      '--dsw-alias-bg-layer-2': '#3A2515',
      '--dsw-alias-bg-overlay': '#241408',
      '--dsw-alias-border-l1': '#4A3020',
      '--dsw-alias-border-l2': '#8B6B45',
      '--dsw-alias-brand-primary': '#F4D03F',
      '--dsw-alias-label-primary': '#F5E6C8',
      '--dsw-alias-label-secondary': '#AC8A63',
      '--dsw-alias-state-error-primary': '#E74C3C',
      '--dsw-alias-state-success-primary': '#7DCE82',
      '--dsw-alias-state-warn-primary': '#F39C12',
      '--dsw-alias-state-idle-primary': '#7A5C3E',
      '--dsw-specific-sidebar-fill': '#241408',
    },
  },
  {
    id: 'pixel-paper',
    colorScheme: 'light',
    tokens: {
      '--dsw-alias-bg-base': '#F0E8D8',
      '--dsw-alias-bg-layer-1': '#E8DCC8',
      '--dsw-alias-bg-layer-2': '#DDD0B8',
      '--dsw-alias-bg-overlay': '#E2D6BE',
      '--dsw-alias-border-l1': '#D4C4A8',
      '--dsw-alias-border-l2': '#7A6A4A',
      '--dsw-alias-brand-primary': '#8A6400',
      '--dsw-alias-label-primary': '#3A2A10',
      '--dsw-alias-label-secondary': '#6B5020',
      '--dsw-alias-state-error-primary': '#8B2020',
      '--dsw-alias-state-success-primary': '#3A7A40',
      '--dsw-alias-state-warn-primary': '#805000',
      '--dsw-alias-state-idle-primary': '#847458',
      '--dsw-specific-sidebar-fill': '#E8DCC8',
    },
  },
  {
    id: 'pixel-warm',
    colorScheme: 'dark',
    tokens: {
      '--dsw-alias-bg-base': '#1E0E04',
      '--dsw-alias-bg-layer-1': '#34180A',
      '--dsw-alias-bg-layer-2': '#4A2210',
      '--dsw-alias-bg-overlay': '#2A1308',
      '--dsw-alias-border-l1': '#5C2E16',
      '--dsw-alias-border-l2': '#A86B40',
      '--dsw-alias-brand-primary': '#FF8C42',
      '--dsw-alias-label-primary': '#F0C8A0',
      '--dsw-alias-label-secondary': '#C08A5C',
      '--dsw-alias-state-error-primary': '#D93B3B',
      '--dsw-alias-state-success-primary': '#6DBF6D',
      '--dsw-alias-state-warn-primary': '#FF8C42',
      '--dsw-alias-state-idle-primary': '#8A5A38',
      '--dsw-specific-sidebar-fill': '#2A1308',
    },
  },
  {
    id: 'pixel-retro',
    colorScheme: 'dark',
    tokens: {
      '--dsw-alias-bg-base': '#0A0E0A',
      '--dsw-alias-bg-layer-1': '#0E140E',
      '--dsw-alias-bg-layer-2': '#121A12',
      '--dsw-alias-bg-overlay': '#0C100C',
      '--dsw-alias-border-l1': '#2A402A',
      '--dsw-alias-border-l2': '#4A7A4A',
      '--dsw-alias-brand-primary': '#33FF33',
      '--dsw-alias-label-primary': '#33FF33',
      '--dsw-alias-label-secondary': '#22AA22',
      '--dsw-alias-state-error-primary': '#FF3333',
      '--dsw-alias-state-success-primary': '#33FF33',
      '--dsw-alias-state-warn-primary': '#FFCC33',
      '--dsw-alias-state-idle-primary': '#359035',
      '--dsw-specific-sidebar-fill': '#0C100C',
    },
  },
]

const PIXEL_IDS = THEMES.map((theme) => theme.id)

/** Built-in preference ids; together with the pixel ids they are restorable. */
const RESTORABLE_IDS = new Set(['light', 'dark', 'system', ...PIXEL_IDS])

/** Settings-row copy (zh is the key-set source of truth; en mirrors it). */
const LOCALE_NS = 'settings.pixel-ui'
const MESSAGES = {
  zh: {
    'row.title': '像素主题',
    'row.desc': '选择后立即生效并跨重启记忆；「现代默认」回到宿主外观',
    'theme.pixel-wood': '像素·木屋',
    'theme.pixel-paper': '像素·羊皮纸',
    'theme.pixel-warm': '像素·暖阳',
    'theme.pixel-retro': '像素·终端绿',
    'theme.system': '现代默认',
  },
  en: {
    'row.title': 'Pixel theme',
    'row.desc': 'Applies instantly and persists across restarts; “Modern default” returns to the host appearance',
    'theme.pixel-wood': 'Pixel · Wood',
    'theme.pixel-paper': 'Pixel · Paper',
    'theme.pixel-warm': 'Pixel · Warm',
    'theme.pixel-retro': 'Pixel · Terminal Green',
    'theme.system': 'Modern default',
  },
}

/** Settings row choices: the four skins plus the modern default escape. */
const THEME_CHOICES = [
  { id: 'pixel-wood', swatch: '#F4D03F' },
  { id: 'pixel-paper', swatch: '#FFFDF5' },
  { id: 'pixel-warm', swatch: '#FF8C42' },
  { id: 'pixel-retro', swatch: '#33FF33' },
  { id: 'system', swatch: '#7A7A7A' },
]

/** Fallback translator for environments where the slot props carry no `t`. */
const fallbackT = (key) => key

/**
 * Declares the theme row slot store: a mirror of the theme service
 * preference, written only by the plugin's apply-world change listener
 * (same shape as the ui-theme Appearance row store).
 * @returns the store handle.
 */
function createThemeRowStore() {
  return defineStore({
    init: () => ({ preference: null, revision: -1 }),
    actions: {
      sync: (draft, preference, revision) => {
        if (revision <= draft.revision) return
        draft.preference = preference
        draft.revision = revision
      },
    },
  })
}

/**
 * General-section row: switch between the four pixel skins and back to the
 * modern default. Reads selection state through props.useStore, localized
 * copy through props.t, and writes through the injected setTheme callback.
 * Each button carries aria-pressed so the current pick is announced, and the
 * swatch is decorative (the visible label names the theme).
 * @param props - slot shares (useStore, t + injected face).
 * @returns the row element tree.
 */
function ThemeRow(props) {
  const preference = props.useStore((state) => state.preference)
  const t = typeof props.t === 'function' ? props.t : fallbackT
  return h('div', { className: 'px-theme-row', role: 'group', 'aria-label': t('row.title') },
    h('div', { className: 'px-theme-row-title' }, t('row.title')),
    h('div', { className: 'px-theme-row-desc' }, t('row.desc')),
    h('div', { className: 'px-theme-row-cubes' },
      THEME_CHOICES.map((choice) => h('button', {
        key: choice.id,
        type: 'button',
        className: 'px-theme-btn' + (preference === choice.id ? ' px-theme-btn-active' : ''),
        'aria-pressed': preference === choice.id,
        onClick: () => { props.setTheme(choice.id) },
      },
        h('span', { className: 'px-theme-swatch', 'aria-hidden': 'true', style: { background: choice.swatch } }),
        t(`theme.${choice.id}`),
      )),
    ),
  )
}

/**
 * Read the per-origin mirror; storage failures read as unset. Values outside
 * the restorable set (stale ids from an older install, corrupt data) read as
 * unset so a first run can still reach the default skin.
 * @returns the stored restorable id or null.
 */
function readLocalTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return RESTORABLE_IDS.has(value) ? value : null
  } catch { return null }
}

/**
 * Write the per-origin mirror; storage failures are non-fatal.
 * @param id - theme id to mirror.
 */
function writeLocalTheme(id) {
  try { localStorage.setItem(THEME_STORAGE_KEY, id) } catch { /* best-effort */ }
}

/**
 * Read the host-side durable preference from the index-injection bootstrap
 * (desktop transport). Values outside the restorable set read as unset.
 * @returns the restorable id or null.
 */
function readBootTheme() {
  try {
    const theme = globalThis[BOOTSTRAP_GLOBAL]?.theme
    return typeof theme === 'string' && RESTORABLE_IDS.has(theme) ? theme : null
  } catch { return null }
}

/**
 * Read the host-side durable preference over the HTTP route (Web transport).
 * Any failure (desktop `dsh-app://` origin, old host without the route,
 * offline, non-JSON) reads as unset so the local mirror stays usable.
 * @returns the restorable id or null.
 */
async function readHostTheme() {
  const injected = readBootTheme()
  if (injected !== null) return injected
  try {
    const res = await fetch(PREFERENCE_URL, { headers: { accept: 'application/json' } })
    if (!res.ok) return null
    const body = await res.json()
    const theme = body?.theme
    return typeof theme === 'string' && RESTORABLE_IDS.has(theme) ? theme : null
  } catch {
    return null
  }
}

/**
 * Write the host-side durable preference (fire-and-forget): a failed PUT
 * only costs the cross-port memory, never the current session.
 * @param id - theme id to persist.
 */
function writeHostTheme(id) {
  try {
    fetch(PREFERENCE_URL, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ theme: id }),
    }).catch(() => { /* host unavailable: local mirror still holds */ })
  } catch { /* fetch missing: ignore */ }
}

/** Client plugin body: register the four themes, restore/persist the choice, inject CSS, locale and the settings row. */
export function apply(ctx) {
  // Scope attributes mirror the active theme, so the stylesheet only shades
  // while a pixel theme is selected and the variant rules can pick the palette.
  const syncScope = () => {
    const active = ctx.theme.getTheme().active
    const on = PIXEL_IDS.includes(active.id)
    document.documentElement.toggleAttribute('data-pixel-ui', on)
    if (on) document.documentElement.setAttribute('data-pixel-theme', active.id)
    else document.documentElement.removeAttribute('data-pixel-theme')
    return on
  }

  // True only for the moment the user picks a theme in the settings row below.
  let explicit = false
  // True from `apply` until the restore below has written the intended skin.
  // While it is up, a built-in preference arriving is the Host's own initial
  // state (settings scope load, theme registration publish) and must not win
  // over the skin the user actually chose.
  let restoring = true

  ctx.on('theme/change', (snapshot) => {
    syncScope()
    const pref = snapshot.preference
    if (explicit) {
      explicit = false
      writeLocalTheme(pref)
      writeHostTheme(pref)
      return
    }
    if (PIXEL_IDS.includes(pref)) {
      writeLocalTheme(pref)
      writeHostTheme(pref)
      return
    }
    const want = readLocalTheme()
    if (want !== null && PIXEL_IDS.includes(want)) {
      // Host reapplied a built-in (model / reasoning switch, or its own
      // startup preference): re-assert the skin the user chose.
      try { ctx.theme.setTheme(want) } catch { /* ignore */ }
      return
    }
    if (restoring || want === null) {
      // No recorded choice yet: the built-in arriving is the Host's own
      // initial state. Recording it here would poison the restore below into
      // modern UI, so skip (the restore writes the intended skin itself).
      return
    }
    // A genuine built-in choice (e.g. user clicked Modern default): adopt it.
    writeLocalTheme(pref)
    writeHostTheme(pref)
  })

  ctx.effect(() => {
    const disposers = THEMES.map((definition) => ctx.theme.register(definition))
    return () => { for (const dispose of disposers) dispose() }
  }, 'dsh-pixel-ui: theme registration')

  // Restore the last choice. The per-origin mirror paints instantly; when it
  // is absent the injected / routed durable preference is the memory, so the
  // first setTheme waits for it instead of flashing the default skin.
  const applyTarget = (target) => {
    try { ctx.theme.setTheme(target) } catch { /* unknown id: keep current */ }
    syncScope()
    writeLocalTheme(target)
    return ctx.theme.getTheme().active.id === target
  }

  const restore = async () => {
    const local = readLocalTheme()
    if (local !== null) {
      applyTarget(local)
      const host = await readHostTheme()
      if (host !== null && host !== ctx.theme.getTheme().preference) applyTarget(host)
      return
    }
    const host = await readHostTheme()
    // A fresh install has no memory anywhere: pick the default skin, and retry
    // once because a Host that applies its own preference late would otherwise
    // leave the page in modern UI until the next interaction.
    if (!applyTarget(host ?? DEFAULT_SKIN)) {
      await new Promise((resolve) => { setTimeout(resolve, 120) })
      applyTarget(host ?? DEFAULT_SKIN)
    }
  }

  // `restoring` must drop the moment the intended skin is applied — not when
  // the durable read settles. A Host preference landing inside that window
  // (settings scope load, theme registration publish) would otherwise be
  // adopted as a "real" choice and silently drop the skin.
  const settle = () => { restoring = false }
  void restore().then(settle, settle)

  ctx.effect(() => ctx.locale.register(LOCALE_NS, MESSAGES), 'dsh-pixel-ui: settings row dictionaries')

  // Pixel theme row in the General settings section (alongside Appearance).
  const rowStore = createThemeRowStore()
  let bound = undefined
  const syncRow = (snapshot) => { bound?.sync(snapshot.preference, snapshot.revision) }
  ctx.on('theme/change', syncRow)
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'pixel-theme',
    order: 20,
    store: rowStore,
    locale: LOCALE_NS,
    inject: (actions) => {
      bound = actions
      // Re-sync from the getter so no event is lost between registration and
      // first render (the store's revision guard drops stale duplicates).
      syncRow(ctx.theme.getTheme())
      return { setTheme: (id) => { explicit = true; ctx.theme.setTheme(id) } }
    },
  }, ThemeRow))

  ctx.effect(() => {
    const style = document.createElement('style')
    style.dataset.plugin = 'dsh-pixel-ui'
    style.textContent = cssText
    document.head.appendChild(style)
    return () => {
      style.remove()
      document.documentElement.removeAttribute('data-pixel-ui')
      document.documentElement.removeAttribute('data-pixel-theme')
    }
  }, 'dsh-pixel-ui: stylesheet')
}
