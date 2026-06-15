const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')
const { generalLimiter } = require('../middleware/rate-limiter')

const REPORTS_FILE = path.join(__dirname, '../data/reports.json')

// Ensure data dir and file exist
const ensureFile = () => {
  const dir = path.dirname(REPORTS_FILE)
  if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true })
  if (!fsSync.existsSync(REPORTS_FILE)) fsSync.writeFileSync(REPORTS_FILE, '[]', 'utf8')
}

const readReports = async () => {
  ensureFile()
  try { return JSON.parse(await fs.readFile(REPORTS_FILE, 'utf8')) }
  catch { return [] }
}

const writeReports = async (reports) => {
  ensureFile()
  await fs.writeFile(REPORTS_FILE, JSON.stringify(reports, null, 2), 'utf8')
}

router.post('/', generalLimiter, async (req, res) => {
  try {
    const { reason, detail, messageSnippet, language, responseMode } = req.body
    if (!reason) return res.status(400).json({ error: 'Reason required' })
    const VALID_REASONS = ['harmful', 'ignored', 'cultural', 'diagnosis', 'wrong_language', 'other']
    if (!VALID_REASONS.includes(reason)) return res.status(400).json({ error: 'Invalid reason' })
    const report = {
      id: `r_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      reason,
      detail: detail ? String(detail).replace(/<[^>]*>/g, '').slice(0, 500) : '',
      messageSnippet: messageSnippet ? String(messageSnippet).slice(0, 120) : '',
      language: language || 'en',
      responseMode: responseMode || 'standard',
      status: 'pending',
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
    }
    const reports = await readReports()
    reports.unshift(report)
    await writeReports(reports.slice(0, 500))
    res.json({ success: true, id: report.id })
  } catch (err) {
    console.error('[Report] Error:', err.message)
    res.status(500).json({ error: 'Failed to save report' })
  }
})

// GET /api/report — list all reports (admin only)
router.get('/', async (req, res) => {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey || req.headers['x-admin-key'] !== adminKey) return res.status(401).json({ error: 'Unauthorized' })
  const reports = await readReports()
  const { status, limit = 50, offset = 0 } = req.query
  const filtered = status ? reports.filter(r => r.status === status) : reports
  res.json({ total: filtered.length, reports: filtered.slice(Number(offset), Number(offset) + Number(limit)) })
})

// PATCH /api/report/:id — update status (admin only)
router.patch('/:id', async (req, res) => {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey || req.headers['x-admin-key'] !== adminKey) return res.status(401).json({ error: 'Unauthorized' })
  const { status } = req.body
  const VALID_STATUS = ['pending', 'reviewed', 'resolved']
  if (!VALID_STATUS.includes(status)) return res.status(400).json({ error: 'Invalid status' })
  const reports = await readReports()
  const idx = reports.findIndex(r => r.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Report not found' })
  reports[idx].status = status
  reports[idx].updatedAt = new Date().toISOString()
  await writeReports(reports)
  res.json({ success: true, report: reports[idx] })
})

module.exports = router
