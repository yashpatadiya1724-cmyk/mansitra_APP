import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flag, CheckCircle, Clock, RefreshCw, Lock, AlertTriangle, MessageSquare, Globe, Filter } from 'lucide-react'
import { supabase } from '@utils/supabase-client'

const REASON_META = {
  harmful:        { label: 'Harmful / Unsafe',        color: 'var(--danger)',    icon: AlertTriangle },
  ignored:        { label: 'Ignored Distress',         color: 'var(--warning)',   icon: MessageSquare },
  cultural:       { label: 'Culturally Wrong',         color: 'var(--primary)',   icon: Globe },
  diagnosis:      { label: 'Sounded Like Diagnosis',   color: 'var(--warning)',   icon: Flag },
  wrong_language: { label: 'Wrong Language',           color: 'var(--secondary)', icon: Globe },
  other:          { label: 'Other',                    color: 'var(--text-2)',    icon: Flag },
}

const STATUS_META = {
  pending:  { label: 'Pending',  color: 'var(--warning)', bg: 'rgba(240,184,96,0.12)' },
  reviewed: { label: 'Reviewed', color: 'var(--primary)', bg: 'rgba(155,143,240,0.12)' },
  resolved: { label: 'Resolved', color: 'var(--success)', bg: 'rgba(93,214,160,0.12)' },
}

export const AdminReportsPage = () => {
  const [adminKey, setAdminKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [reports, setReports] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState(null)

  const fetchReports = async (key = adminKey) => {
    setLoading(true)
    setError(null)
    if (key !== 'manasitra-admin-2026') {
      setError('Invalid admin key')
      setAuthed(false)
      setLoading(false)
      return
    }
    try {
      let query = supabase
        .from('reports')
        .select('*', { count: 'exact' })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, count, error } = await query
        .order('created_at', { ascending: false })

      if (error) throw error
      setReports(data || [])
      setTotal(count || 0)
      setAuthed(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    setUpdating(id)
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    } catch (e) {
      setError(e.message)
    } finally {
      setUpdating(null)
    }
  }

  useEffect(() => {
    if (authed) fetchReports()
  }, [filter])

  if (!authed) {
    return (
      <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={22} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Admin Access</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 20 }}>Enter your admin key to view reports</p>

          {error && (
            <div style={{ padding: '8px 12px', borderRadius: 8, marginBottom: 12, background: 'rgba(232,112,144,0.08)', border: '1px solid rgba(232,112,144,0.2)', fontSize: 13, color: 'var(--danger)' }}>
              {error}
            </div>
          )}

          <input
            type="password"
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchReports()}
            placeholder="Admin key"
            className="input"
            style={{ marginBottom: 12 }}
            autoComplete="off"
          />
          <button onClick={() => fetchReports()} disabled={!adminKey || loading}
            style={{
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              background: adminKey ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: adminKey ? 'white' : 'var(--text-3)',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: adminKey ? 'pointer' : 'not-allowed',
            }}
          >
            {loading ? 'Checking…' : 'Access Reports'}
          </button>
        </div>
      </div>
    )
  }

  const pendingCount = reports.filter(r => r.status === 'pending').length

  return (
    <div className="app-shell">
      <div className="page-wrap">

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(232,112,144,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flag size={20} style={{ color: 'var(--danger)' }} />
              </div>
              <div>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Response Reports</h1>
                <p style={{ fontSize: 12, color: 'var(--text-3)' }}>{total} total · {pendingCount} pending review</p>
              </div>
            </div>
            <button onClick={() => fetchReports()} disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 13 }}
            >
              <RefreshCw size={14} style={{ animation: loading ? 'spin 0.8s linear infinite' : 'none' }} />
              Refresh
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['all', 'pending', 'reviewed', 'resolved'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '7px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                border: `1.5px solid ${filter === f ? 'var(--primary)' : 'var(--border)'}`,
                background: filter === f ? 'var(--primary-soft)' : 'transparent',
                color: filter === f ? 'var(--primary)' : 'var(--text-2)',
                transition: 'all 0.15s', textTransform: 'capitalize',
              }}
            >{f}</button>
          ))}
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 10, marginBottom: 16, background: 'rgba(232,112,144,0.08)', border: '1px solid rgba(232,112,144,0.2)', fontSize: 13, color: 'var(--danger)' }}>
            {error}
          </div>
        )}

        {/* Reports list */}
        {reports.length === 0 && !loading ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
            <p style={{ fontSize: 15, color: 'var(--text-2)' }}>No reports {filter !== 'all' ? `with status "${filter}"` : 'yet'}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reports.map((report, i) => {
              const reason = REASON_META[report.reason] || REASON_META.other
              const status = STATUS_META[report.status] || STATUS_META.pending
              const ReasonIcon = reason.icon

              return (
                <motion.div key={report.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="glass-card"
                  style={{ padding: '16px 20px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    {/* Reason badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${reason.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ReasonIcon size={15} style={{ color: reason.color }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{reason.label}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-3)' }}>
                          {new Date(report.timestamp).toLocaleString()} · {report.language?.toUpperCase()} · {report.responseMode}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: status.bg, color: status.color, fontWeight: 600, flexShrink: 0 }}>
                      {status.label}
                    </span>
                  </div>

                  {/* Message snippet */}
                  {report.messageSnippet && (
                    <div style={{ padding: '8px 12px', borderRadius: 8, marginBottom: 10, background: 'rgba(155,143,240,0.06)', border: '1px solid var(--border)' }}>
                      <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 3, fontWeight: 600 }}>Response snippet</p>
                      <p style={{ fontSize: 13, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.55 }}>"{report.messageSnippet}"</p>
                    </div>
                  )}

                  {/* User detail */}
                  {report.detail && (
                    <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--text-3)', fontWeight: 600 }}>User note: </span>{report.detail}
                    </p>
                  )}

                  {/* Status actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['pending', 'reviewed', 'resolved'].map(s => (
                      <button key={s} onClick={() => updateStatus(report.id, s)}
                        disabled={report.status === s || updating === report.id}
                        style={{
                          padding: '6px 12px', borderRadius: 8, cursor: report.status === s ? 'default' : 'pointer',
                          fontSize: 12, fontWeight: 500, textTransform: 'capitalize',
                          border: `1px solid ${report.status === s ? STATUS_META[s].color : 'var(--border)'}`,
                          background: report.status === s ? STATUS_META[s].bg : 'transparent',
                          color: report.status === s ? STATUS_META[s].color : 'var(--text-2)',
                          transition: 'all 0.15s',
                          opacity: updating === report.id && report.status !== s ? 0.5 : 1,
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
