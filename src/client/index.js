/**
 * dsh-pixel-ui — browser half (the pixel skin).
 *
 * Registers a dark wood / gold pixel theme on the ThemeService seam
 * (`ctx.theme.register` with the --dsw-alias-* token overrides), activates
 * it once, and mirrors the active-theme state onto `html[data-pixel-ui]`
 * so the injected stylesheet only applies while this skin is active. The
 * stylesheet carries the pixel borders, fonts, and component tweaks that
 * the alias tokens alone cannot express.
 *
 * @module dsh-pixel-ui/client
 */
import cssText from './pixel.css'

/** Plugin name; also the patch row id. */
export const name = 'dsh-pixel-ui'

/** Required services: the theme runtime. */
export const inject = ['theme']

/** Theme id registered on the ThemeService. */
export const THEME_ID = 'pixel-wood'

/**
 * Dark-wood / gold alias-token overrides (single dark scheme; the ThemeService
 * contract applies these as inline CSS variables over the dark base palette).
 */
const THEME_TOKENS = {
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
}

/** Client plugin body: register/activate the theme, sync scope attribute, inject CSS. */
export function apply(ctx) {
  // Scope attribute mirrors the active theme, so the stylesheet only shades
  // while pixel-wood is selected (the theme/change event covers switching).
  const syncScope = () => {
    const active = ctx.theme.getTheme().active
    document.documentElement.toggleAttribute('data-pixel-ui', active.id === THEME_ID)
  }

  ctx.on('theme/change', syncScope)

  ctx.effect(() => ctx.theme.register({
    id: THEME_ID,
    colorScheme: 'dark',
    tokens: THEME_TOKENS,
  }), 'dsh-pixel-ui: theme registration')

  // Activate on load: installing a skin means wearing it; switching back is
  // one click in the theme preference.
  try {
    ctx.theme.setTheme(THEME_ID)
  } catch {
    // Already active or momentarily unregistered — the change event re-syncs.
  }
  syncScope()

  ctx.effect(() => {
    const style = document.createElement('style')
    style.dataset.plugin = 'dsh-pixel-ui'
    style.textContent = cssText
    document.head.appendChild(style)
    return () => style.remove()
  }, 'dsh-pixel-ui: stylesheet')
}
