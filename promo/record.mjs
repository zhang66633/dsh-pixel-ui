import http from 'node:http'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const EDGE = process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 8765
const OUT = path.join(ROOT, 'TEMP', 'promo.webm')
const profile = path.join(ROOT, 'TEMP', 'edge-record-' + Date.now())
mkdirSync(profile, { recursive: true })

let edge = null
let done = false
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  if (req.method === 'OPTIONS') return res.end()
  if (req.url === '/upload' && req.method === 'POST') {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const buf = Buffer.concat(chunks)
      writeFileSync(OUT, buf)
      console.log('SAVED', buf.length)
      res.end('ok')
      finish(0)
    })
  } else { res.statusCode = 404; res.end('no') }
})

function finish(code) {
  if (done) return
  done = true
  if (edge && edge.pid) {
    try { spawn('taskkill', ['/PID', String(edge.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
  }
  try { server.close() } catch {}
  setTimeout(() => process.exit(code), 800)
}

server.listen(PORT, '127.0.0.1', () => {
  console.log('SERVER READY')
  edge = spawn(EDGE, [
    '--headless=new', '--disable-gpu', '--allow-file-access-from-files',
    '--no-first-run', '--hide-scrollbars', `--user-data-dir=${profile}`,
    '--window-size=1920,1080',
    pathToFileURL(path.join(ROOT, 'promo', 'index.html')).href + '?record=1',
  ], { stdio: 'ignore' })
  console.log('EDGE PID', edge.pid)
  edge.on('exit', (code, sig) => console.log('EDGE EXIT', code, sig))
})

setTimeout(() => {
  if (!done) {
    console.log('TIMEOUT, exists=', existsSync(OUT))
    finish(2)
  }
}, 70000)
