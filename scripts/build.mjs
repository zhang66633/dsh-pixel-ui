/**
 * dsh-pixel-ui — browser-half bundle build.
 *
 * Produces lib/client.js in the DSH Web client-module wire format:
 * `window.__ModuleLoader__.load({ id, factory: (require) => { ... } })`.
 * The pixel theme CSS is loaded as TEXT (esbuild text loader) and injected
 * as a <style data-plugin> tag at factory execution; platform modules
 * (@deepseek-ai/*) stay external and resolve from the loader module table.
 */
import { build } from 'esbuild'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const { name: id } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

const PLATFORM_EXTERNALS = [
  'react', 'react/jsx-runtime', 'react-dom', 'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
]

await build({
  entryPoints: [fileURLToPath(new URL('../src/client/index.js', import.meta.url))],
  outfile: fileURLToPath(new URL('../lib/client.js', import.meta.url)),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  charset: 'utf8',
  loader: { '.css': 'text' },
  external: PLATFORM_EXTERNALS,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  },
  // Wire-format wrapper (same contract as the official tsdown preset):
  // banner opens the load handoff, intro creates the factory-scoped
  // module/exports, footer returns and closes.
  banner: { js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => { var module = { exports: {} }; var exports = module.exports;` },
  footer: { js: 'return module.exports; } });' },
  sourcemap: true,
})

console.log(`built lib/client.js (bundle id "${id}")`)
