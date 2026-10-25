/**
 * dsh-pixel-ui — compatibility gate.
 *
 * Verifies the manifest the way the two real judges read it:
 *   - app-boot (`evaluatePluginCompatibility`): `engines.dsh` alone when present,
 *     otherwise every `@deepseek-ai/dsh*` peer; semver with includePrerelease.
 *   - dshmarket discovery (`deriveHostCompatibility`): `engines.dsh` plus the
 *     lockstep dsh peers, conjunctive; same prerelease admission.
 *
 * The listed host releases are the ones this repository has actually exercised.
 * A release marked `compatible` must pass every declaration, and `0.2.1-rc.3`
 * must also pass with npm's default prerelease gate (`includePrerelease: false`)
 * so a plain pnpm/npm peer resolution accepts it too.
 *
 * Run: node scripts/check-compat.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import semver from 'semver'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

/** The strict-install target the user asked for (2026-10-25). */
const CURRENT_DSH = '0.2.1-rc.3'

/** Host releases this package has exercised, oldest first. */
const HOST_RELEASES = [
  '0.1.0-rc.6',
  '0.1.0-rc.7',
  '0.1.7-rc.2',
  '0.2.0-rc.1',
  '0.2.0-rc.2',
  '0.2.1-rc.3',
]

const DS_PEERS = Object.entries(manifest.peerDependencies ?? {})
  .filter(([name]) => name === '@deepseek-ai/dsh' || name.startsWith('@deepseek-ai/dsh-'))
  .map(([name, range]) => ({ name, range }))

const releases = manifest.dsh?.compatibility?.dshReleases
const declaredRange = manifest.dsh?.compatibility?.dsh
const enginesRange = manifest.engines?.dsh

let passed = 0
const check = (label, fn) => { fn(); passed++; console.log(`  ok ${label}`) }

console.log('== compat: manifest shape ==')
check('package version is valid semver', () => assert.notEqual(semver.valid(manifest.version), null))
check('bundle patch file exists', () => assert.ok(existsSync(new URL(`../${manifest.dsh.bundle.patch}`, import.meta.url))))
check('client half is a web bundle', () => {
  assert.equal(manifest.dsh.client.platform, 'web')
  assert.equal(manifest.exports['./client'], './lib/client.js')
  assert.ok(manifest.dsh.client.inject.every((name) => typeof name === 'string' && name.length > 0))
})
check('built client bundle exists and is wire-format', () => {
  const bundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  assert.ok(bundle.startsWith('window.__ModuleLoader__.load({'), 'wire format header')
  assert.ok(bundle.includes('id: "dsh-pixel-ui"'), 'bundle id')
})
check('dshReleases records concrete host releases', () => {
  assert.ok(releases && typeof releases === 'object', 'dsh.compatibility.dshReleases exists')
  for (const [version, status] of Object.entries(releases)) {
    assert.notEqual(semver.valid(version), null, `${version} is not a semver version`)
    assert.ok(['compatible', 'incompatible'].includes(status), `${version} status ${status}`)
  }
  for (const version of HOST_RELEASES) assert.ok(version in releases, `${version} is declared`)
})

console.log('== compat: declarations ==')
check('engines.dsh is present and valid', () => {
  assert.equal(typeof enginesRange, 'string')
  assert.notEqual(semver.validRange(enginesRange), null, 'engines.dsh range parses')
})
check('dsh.compatibility.dsh is present and valid', () => {
  assert.equal(typeof declaredRange, 'string')
  assert.notEqual(semver.validRange(declaredRange), null)
})
check('every lockstep dsh peer has a parseable range', () => {
  assert.ok(DS_PEERS.length >= 5, 'expected at least five dsh peers')
  for (const peer of DS_PEERS) assert.notEqual(semver.validRange(peer.range), null, peer.name)
})

console.log('== compat: declared host releases ==')
for (const version of HOST_RELEASES) {
  if (releases[version] !== 'compatible') continue
  check(`${version}: engines + peers + compatibility all admit it`, () => {
    assert.ok(semver.satisfies(version, enginesRange, { includePrerelease: true }), `engines.dsh rejects ${version}`)
    assert.ok(semver.satisfies(version, declaredRange, { includePrerelease: true }), `dsh.compatibility.dsh rejects ${version}`)
    for (const peer of DS_PEERS) {
      assert.ok(semver.satisfies(version, peer.range, { includePrerelease: true }), `${peer.name} rejects ${version}`)
    }
  })
}

console.log('== compat: DSH 0.2.1-rc.3 strict install gate ==')
check('0.2.1-rc.3 is declared compatible', () => assert.equal(releases[CURRENT_DSH], 'compatible'))
check('engines.dsh admits 0.2.1-rc.3 without includePrerelease', () => {
  assert.ok(semver.satisfies(CURRENT_DSH, enginesRange))
})
check('every dsh peer admits 0.2.1-rc.3 without includePrerelease', () => {
  for (const peer of DS_PEERS) {
    assert.ok(semver.satisfies(CURRENT_DSH, peer.range), `${peer.name} needs an explicit >=0.2.1-0 segment`)
  }
})

// Mirror dshmarket's deriveHostCompatibility: engines + peers are conjunctive.
// A definite mismatch means incompatible; every satisfied declaration means
// compatible; anything else stays unknown (visible, not hidden).
function marketVerdict(version) {
  const outcomes = [
    semver.satisfies(version, enginesRange, { includePrerelease: true }),
    ...DS_PEERS.map((peer) => semver.satisfies(version, peer.range, { includePrerelease: true })),
  ]
  if (outcomes.some((ok) => ok === false)) return 'incompatible'
  return outcomes.every((ok) => ok === true) ? 'compatible' : 'unknown'
}

console.log('== compat: market verdicts ==')
for (const version of HOST_RELEASES) {
  const expected = releases[version] === 'compatible' ? 'compatible' : 'unknown'
  check(`${version} derives "${expected}" like dshmarket`, () => {
    assert.equal(marketVerdict(version), expected)
  })
}

console.log(`\ncompat: ${passed} checks passed (${manifest.name}@${manifest.version}; target DSH ${CURRENT_DSH})`)
