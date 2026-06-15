const isNative = typeof window !== 'undefined' && (window.location.protocol === 'capacitor:' || window.location.protocol === 'file:')
const API_BASE = isNative ? 'http://10.179.44.214:3001/api' : '/api'

/**
 * Submit a response report to the backend.
 * Privacy rule: if the backend is unreachable, the report is silently discarded.
 * We never persist report data locally — it could contain message snippets.
 */
export const submitReport = async ({ reason, detail, messageSnippet, language, responseMode }) => {
  try {
    const res = await fetch(`${API_BASE}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, detail, messageSnippet, language, responseMode }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { success: true, source: 'server' }
  } catch {
    // Backend unreachable — discard silently.
    // We do NOT store report data locally because it may contain message content.
    return { success: false, source: 'discarded' }
  }
}
