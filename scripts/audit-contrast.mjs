/**
 * dsh-pixel-ui — WCAG contrast audit for the four pixel themes.
 *
 * Reads the theme token table from src/client/index.js (THEMES) and the
 * --px-* variable blocks from src/client/pixel.css, then checks the
 * text/background and UI/background pairs each theme actually renders:
 *   - text pairs  >= 4.5:1  (WCAG 1.4.3 AA normal text)
 *   - UI pairs    >= 3.0:1  (WCAG 1.4.11 non-text contrast)
 * Exit code 1 when any pair fails, so `node scripts/audit-contrast.mjs`
 * is a usable CI gate. Palette fixes must go through this script first.
 *
 * Usage: node scripts/audit-contrast.mjs [--json]
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8')

/** Relative luminance per WCAG 2.x. */
function luminance(hex) {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? [...m].map((c) => c + c).join('') : m
  const channels = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

/** WCAG contrast ratio between two hex colors. */
function contrast(a, b) {
  const [la, lb] = [luminance(a), luminance(b)]
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Parse the THEMES table out of the client module source. */
function parseThemes(source) {
  const themes = []
  const rowRe = /id:\s*'([a-z-]+)',\s*colorScheme:\s*'(light|dark)',\s*tokens:\s*\{([^}]+)\}/g
  for (const m of source.matchAll(rowRe)) {
    const tokens = {}
    for (const t of m[3].matchAll(/'([^']+)':\s*'(#[0-9a-fA-F]{3,8})'/g)) tokens[t[1]] = t[2]
    themes.push({ id: m[1], colorScheme: m[2], tokens })
  }
  return themes
}

/** Parse the --px-* blocks out of the skin stylesheet (default + per theme). */
function parseCssVars(css) {
  const blocks = {}
  const blockRe = /html\[data-pixel-theme='([a-z-]+)'\]\s*\{([^}]+)\}/g
  for (const m of css.matchAll(blockRe)) {
    const vars = {}
    for (const v of m[2].matchAll(/(--px-[a-z-]+):\s*(#[0-9a-fA-F]{3,8})/g)) vars[v[1]] = v[2]
    blocks[m[1]] = vars
  }
  const def = css.match(/html\[data-pixel-ui\]\s*\{([^}]+)\}/)
  const fallback = {}
  if (def) for (const v of def[1].matchAll(/(--px-[a-z-]+):\s*(#[0-9a-fA-F]{3,8})/g)) fallback[v[1]] = v[2]
  return { fallback, blocks }
}

/**
 * Pairs a theme renders, expressed as (label, foreground var, background var, minRatio).
 * The alias tokens come from THEMES; the px-* vars come from pixel.css with the
 * shared html[data-pixel-ui] block as fallback.
 */
function pairsFor(theme, vars) {
  const T = (name, fb) => theme.tokens[name] ?? fb
  const P = (name) => vars[name]
  return [
    // text pairs (>= 4.5)
    ['label-primary / bg-base', T('--dsw-alias-label-primary'), T('--dsw-alias-bg-base'), 4.5],
    ['label-secondary / bg-base', T('--dsw-alias-label-secondary'), T('--dsw-alias-bg-base'), 4.5],
    ['label-secondary / bg-layer-1', T('--dsw-alias-label-secondary'), T('--dsw-alias-bg-layer-1'), 4.5],
    ['input text / input bg', P('--px-input-text'), P('--px-input-bg'), 4.5],
    ['input placeholder / input bg', P('--px-input-ph'), P('--px-input-bg'), 4.5],
    ['code text / code bg', P('--px-text-on-dark'), P('--px-wood-darkest'), 4.5],
    ['inline code ink / inline code bg', P('--px-code-ink'), P('--px-code-bg'), 4.5],
    ['link+title gold-bright / bg-base', P('--px-gold-bright'), T('--dsw-alias-bg-base'), 4.5],
    ['tooltip text / tooltip bg', P('--px-parchment'), P('--px-tooltip-bg'), 4.5],
    ['accent ink / accent bg (selection+row active)', P('--px-accent-ink'), P('--px-accent-bg'), 4.5],
    ['ink-on-mid / wood-mid (active tab + th)', P('--px-ink-on-mid'), P('--px-wood-mid'), 4.5],
    ['row idle text / row idle bg', P('--px-text-on-dark'), P('--px-wood-dark'), 4.5],
    ['text-light / bg-layer-1 (sidebar meta)', P('--px-text-light'), T('--dsw-alias-bg-layer-1'), 4.5],
    // UI pairs (>= 3.0)
    ['brand-primary / bg-base', T('--dsw-alias-brand-primary'), T('--dsw-alias-bg-base'), 3],
    ['border-l2 / bg-base', T('--dsw-alias-border-l2'), T('--dsw-alias-bg-base'), 3],
    ['state-error / bg-base', T('--dsw-alias-state-error-primary'), T('--dsw-alias-bg-base'), 3],
    ['state-success / bg-base', T('--dsw-alias-state-success-primary'), T('--dsw-alias-bg-base'), 3],
    ['state-warn / bg-base', T('--dsw-alias-state-warn-primary'), T('--dsw-alias-bg-base'), 3],
    ['state-idle / bg-base', T('--dsw-alias-state-idle-primary'), T('--dsw-alias-bg-base'), 3],
  ]
}

const themes = parseThemes(read('src/client/index.js'))
const { fallback, blocks } = parseCssVars(read('src/client/pixel.css'))
const asJson = process.argv.includes('--json')
const report = []
let failures = 0

for (const theme of themes) {
  const vars = { ...fallback, ...(blocks[theme.id] ?? {}) }
  const rows = []
  for (const [label, fg, bg, min] of pairsFor(theme, vars)) {
    if (!fg || !bg) {
      rows.push({ label, status: 'MISSING', fg, bg, ratio: null, min })
      failures++
      continue
    }
    const ratio = contrast(fg, bg)
    const pass = ratio >= min
    if (!pass) failures++
    rows.push({ label, status: pass ? 'pass' : 'FAIL', fg, bg, ratio: Number(ratio.toFixed(2)), min })
  }
  report.push({ theme: theme.id, colorScheme: theme.colorScheme, rows })
}

if (asJson) {
  console.log(JSON.stringify(report, null, 2))
} else {
  for (const entry of report) {
    console.log(`\n== ${entry.theme} (${entry.colorScheme})`)
    for (const r of entry.rows) {
      const mark = r.status === 'pass' ? 'ok  ' : r.status === 'FAIL' ? 'FAIL' : 'MISS'
      console.log(`  ${mark} ${String(r.ratio ?? '-').padStart(6)}  (min ${r.min})  ${r.label}  ${r.fg} on ${r.bg}`)
    }
  }
  console.log(`\n${failures === 0 ? 'ALL PASS' : `${failures} FAILURES`}`)
}
process.exit(failures === 0 ? 0 : 1)
