require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { generalLimiter } = require('./middleware/rate-limiter')

const app = express()
const PORT = process.env.PORT || 3001

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // handled by frontend
  crossOriginEmbedderPolicy: false,
}))

// CORS — allow localhost + LAN IPs + Capacitor WebView
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1')
    const isLAN = /^https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(origin)
    const isCapacitor = origin.startsWith('capacitor://') || origin.startsWith('ionic://')
    if (isLocalhost || isLAN || isCapacitor || allowed.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
}))

// Body parsing
app.use(express.json({ limit: '10kb' }))

// Logging (no PII — only method, url, status, response time)
app.use(morgan(':method :url :status :response-time ms'))

// Rate limiting
app.use(generalLimiter)

// Routes
app.use('/api/chat', require('./routes/chat'))
app.use('/api/safety', require('./routes/safety'))
app.use('/api/report', require('./routes/report'))

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', version: '1.0.0' }))

// 404
app.use((_, res) => res.status(404).json({ error: 'Not found' }))

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.message)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🌟 Manasitra backend running`)
  console.log(`   Local:   http://localhost:${PORT}`)
  // Print LAN IP for device access
  const { networkInterfaces } = require('os')
  const nets = networkInterfaces()
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`   Network: http://${net.address}:${PORT}`)
      }
    }
  }
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
    console.warn('\n⚠️  GROQ_API_KEY not set — AI responses will use fallbacks\n')
  } else {
    console.log('\n✅ Groq API key loaded\n')
  }
})
