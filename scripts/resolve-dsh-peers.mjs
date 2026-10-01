/**
 * Test-only ESM resolve hook.
 *
 * The node half imports @deepseek-ai/dsh-home-paths, which resolves inside a
 * dsh runtime (profile node_modules) but not in this repo's own dependency
 * tree. For local `node scripts/test-host.mjs` runs, map @deepseek-ai/*
 * specifiers to a local DSH install: $DSH_TEST_PEER_MODULES when set, else
 * this machine's profile node_modules. When the package resolves from the
 * project tree itself, that copy wins.
 */
import { pathToFileURL } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const FALLBACK_ROOTS = [
  process.env.DSH_TEST_PEER_MODULES,
  'C:/Users/lenovo/.dsh/profiles/node_modules/',
].filter(Boolean).map((root) => (root.endsWith('/') || root.endsWith('\\') ? root : `${root}/`))

/** Resolve @deepseek-ai/<pkg> inside a root through its package.json main. */
function packageMain(root, specifier) {
  const pkgDir = join(root, ...specifier.split('/'))
  const manifest = join(pkgDir, 'package.json')
  if (!existsSync(manifest)) return null
  try {
    const main = JSON.parse(readFileSync(manifest, 'utf8')).main ?? 'index.js'
    const entry = join(pkgDir, main)
    return existsSync(entry) ? pathToFileURL(entry).href : null
  } catch {
    return null
  }
}

export async function resolve(specifier, context, next) {
  if (!specifier.startsWith('@deepseek-ai/')) return next(specifier, context)
  try {
    return await next(specifier, context)
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND' && error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') throw error
  }
  let last
  for (const root of FALLBACK_ROOTS) {
    const href = packageMain(root, specifier)
    if (href === null) continue
    try {
      return await next(href, { ...context, parentURL: href })
    } catch (error) {
      last = error
    }
  }
  throw last ?? new Error(`cannot resolve ${specifier} from any DSH install`)
}
