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
 * The host settings scope persists only the built-in preferences
 * (light/dark/system), so this plugin persists the last choice itself
 * (localStorage) and restores it on load; the first run activates the
 * default wood skin. A settings row in the General section switches
 * between the four skins and back to the modern default (`system`).
 *
 * @module dsh-pixel-ui/client
 */
import { createElement as h } from 'react'
import { defineStore } from '@deepseek-ai/dsh-client-runtime/client'
import cssText from './pixel.css'

/** Plugin name; also the patch row id. */
export const name = 'dsh-pixel-ui'

/** Required services: the theme runtime and the settings item slot. */
export const inject = ['slots', 'theme']

/** localStorage key carrying the last theme choice across loads. */
const THEME_STORAGE_KEY = 'dsh-pixel-ui:theme'

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
      '--dsw-alias-label-secondary': '#9B7B5B',
      '--dsw-alias-state-error-primary': '#E74C3C',
      '--dsw-alias-state-success-primary': '#7DCE82',
      '--dsw-alias-state-warn-primary': '#F39C12',
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
      '--dsw-alias-border-l2': '#9B8B6B',
      '--dsw-alias-brand-primary': '#C8960C',
      '--dsw-alias-label-primary': '#3A2A10',
      '--dsw-alias-label-secondary': '#6B5020',
      '--dsw-alias-state-error-primary': '#8B2020',
      '--dsw-alias-state-success-primary': '#3A7A40',
      '--dsw-alias-state-warn-primary': '#805000',
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
      '--dsw-alias-label-secondary': '#A86B40',
      '--dsw-alias-state-error-primary': '#D93B3B',
      '--dsw-alias-state-success-primary': '#6DBF6D',
      '--dsw-alias-state-warn-primary': '#FF8C42',
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
      '--dsw-alias-border-l2': '#3A5A3A',
      '--dsw-alias-brand-primary': '#33FF33',
      '--dsw-alias-label-primary': '#33FF33',
      '--dsw-alias-label-secondary': '#118811',
      '--dsw-alias-state-error-primary': '#FF3333',
      '--dsw-alias-state-success-primary': '#33FF33',
      '--dsw-alias-state-warn-primary': '#FFCC33',
      '--dsw-specific-sidebar-fill': '#0C100C',
    },
  },
]

const PIXEL_IDS = THEMES.map((theme) => theme.id)

/** Built-in preference ids; together with the pixel ids they are restorable. */
const RESTORABLE_IDS = new Set(['light', 'dark', 'system', ...PIXEL_IDS])

/** Settings row choices: the four skins plus the modern default escape. */
const THEME_CHOICES = [
  { id: 'pixel-wood', label: '像素·木屋', swatch: '#F4D03F' },
  { id: 'pixel-paper', label: '像素·羊皮纸', swatch: '#F5E6C8' },
  { id: 'pixel-warm', label: '像素·暖阳', swatch: '#FF8C42' },
  { id: 'pixel-retro', label: '像素·终端绿', swatch: '#33FF33' },
  { id: 'system', label: '现代默认', swatch: '#7A7A7A' },
]

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
 * modern default. Reads selection state through props.useStore and writes
 * through the injected setTheme callback.
 * @param props - slot shares (useStore + injected face).
 * @returns the row element tree.
 */
function ThemeRow(props) {
  const preference = props.useStore((state) => state.preference)
  return h('div', { className: 'px-theme-row' },
    h('div', { className: 'px-theme-row-title' }, '像素主题'),
    h('div', { className: 'px-theme-row-cubes' },
      THEME_CHOICES.map((choice) => h('button', {
        key: choice.id,
        type: 'button',
        className: 'px-theme-btn' + (preference === choice.id ? ' px-theme-btn-active' : ''),
        onClick: () => { props.setTheme(choice.id) },
      },
        h('span', { className: 'px-theme-swatch', style: { background: choice.swatch } }),
        choice.label,
      )),
    ),
  )
}

/** Client plugin body: register the four themes, restore/persist the choice, inject CSS and the settings row. */
export function apply(ctx) {
  // Scope attributes mirror the active theme, so the stylesheet only shades
  // while a pixel theme is selected and the variant rules can pick the palette.
  const syncScope = () => {
    const active = ctx.theme.getTheme().active
    const on = PIXEL_IDS.includes(active.id)
    document.documentElement.toggleAttribute('data-pixel-ui', on)
    if (on) document.documentElement.setAttribute('data-pixel-theme', active.id)
    else document.documentElement.removeAttribute('data-pixel-theme')
  }

  // Custom theme ids do not survive the host settings scope, so carry the
  // latest preference here; built-in choices ride along too.
  const persist = (snapshot) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, snapshot.preference)
    } catch {
      // Storage unavailable (private mode / quota): persistence is best-effort.
    }
  }
  ctx.on('theme/change', (snapshot) => { syncScope(); persist(snapshot) })

  ctx.effect(() => {
    const disposers = THEMES.map((definition) => ctx.theme.register(definition))
    return () => { for (const dispose of disposers) dispose() }
  }, 'dsh-pixel-ui: theme registration')

  // Restore the last choice; the first run wears the default wood skin.
  let saved = null
  try { saved = localStorage.getItem(THEME_STORAGE_KEY) } catch { /* storage unavailable */ }
  const target = saved !== null && RESTORABLE_IDS.has(saved) ? saved : 'pixel-wood'
  try { ctx.theme.setTheme(target) } catch { /* unknown id from an older version: keep current */ }
  syncScope()

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
    inject: (actions) => {
      bound = actions
      // Re-sync from the getter so no event is lost between registration and
      // first render (the store's revision guard drops stale duplicates).
      syncRow(ctx.theme.getTheme())
      return { setTheme: (id) => { ctx.theme.setTheme(id) } }
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
