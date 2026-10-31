/**
 * dsh-pixel-ui — build-time 9-slice PNG inliner.
 *
 * The skin's asset themes reference sprites with a package-local scheme:
 *
 *   --pxa-panel: url('pxasset:pumpkin/panel.png');
 *
 * That keeps the source stylesheet readable (a theme author only writes the
 * theme id + file name) while the shipped client bundle stays self-contained:
 * the build rewrites every `pxasset:` reference to a `data:image/png;base64`
 * URI. Inlining is deliberate — the browser half runs on `dsh-app://` in DSH
 * Desktop and on the loopback web server elsewhere, and a data URI is the one
 * transport that needs neither a host route nor a restart to pick up new
 * sprites.
 *
 * Unknown theme ids or missing files fail the build instead of silently
 * emitting a broken url().
 *
 * @module dsh-pixel-ui/asset-inline
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

/** Asset theme id → directory under `assets/`. */
export const ASSET_DIRS = {
  hologram: 'complete-ui/hologram',
  pumpkin: 'complete-ui/pumpkin',
  papernote: 'complete-ui/papernote',
  marble: 'complete-ui/marble',
}

const PXASSET_REF = /url\(\s*(['"]?)pxasset:([a-z0-9-]+)\/([a-z0-9_.-]+\.png)\1\s*\)/gi

/**
 * Replace every `url(pxasset:<theme>/<file>.png)` with a PNG data URI.
 * @param css - stylesheet source text.
 * @returns the rewritten stylesheet and the sorted list of inlined assets.
 */
export function inlinePixelAssets(css) {
  const inlined = new Set()
  const out = css.replace(PXASSET_REF, (_match, _quote, theme, file) => {
    const dir = ASSET_DIRS[theme]
    if (dir === undefined) throw new Error(`inlinePixelAssets: unknown asset theme "${theme}"`)
    const key = `${theme}/${file}`
    inlined.add(key)
    const bytes = readFileSync(join(ROOT, 'assets', dir, file))
    return `url("data:image/png;base64,${bytes.toString('base64')}")`
  })
  return { css: out, assets: [...inlined].sort() }
}
