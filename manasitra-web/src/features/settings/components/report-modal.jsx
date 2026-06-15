import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flag, CheckCircle, AlertTriangle, MessageSquare, Globe, Send, Loader } from 'lucide-react'
import { submitReport } from '@utils/report-service'
import { useLanguageStore } from '@store/language-store'
import { useSessionStore } from '@store/session-store'

const REASONS = [
  { id: 'harmful',        icon: AlertTriangle, label: 'This response felt harmful or unsafe',      color: 'var(--danger)' },
  { id: 'ignored',        icon: MessageSquare, label: 'This ignored my distress',                  color: 'var(--warning)' },
  { id: 'cultural',       icon: Globe,         label: 'This felt culturally wrong or insensitive', color: 'var(--primary)' },
  { id: 'diagnosis',      icon: Flag,          label: 'This sounded like a diagnosis',             color: 'var(--warning)' },
  { id: 'wrong_language', icon: Globe,         label: 'Response was in the wrong language',        color: 'var(--secondary)' },
  { id: 'other',          icon: Flag,          label: 'Other issue',                               color: 'var(--text-2)' },
]

export const ReportModal = ({ isOpen, onClose, prefillMessage }) => {
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reportFailed, setReportFailed] = useState(false)

  const { selectedLanguage } = useLanguageStore()
  const responseMode = useSessionStore(s => s.responseMode)

  const reset = () => {
    setSelected(null)
    setDetail('')
    setSubmitted(false)
    setReportFailed(false)
    setLoading(false)
  }

  const handleClose = () => { reset(); onClose() }

  const submit = async () => {
    if (!selected) return
    setLoading(true)

    const result = await submitReport({
      reason: selected,
      detail: detail.trim(),
      // Only send first 120 chars of message — never the full conversation
      messageSnippet: prefillMessage ? prefillMessage.slice(0, 120) : '',
      language: selectedLanguage,
      responseMode,
    })

    setLoading(false)
    setReportFailed(result.source === 'discarded')
    setSubmitted(true)
    setTimeout(() => { reset(); onClose() }, 3000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        onKeyDown={e => e.key === 'Escape' && handleClose()}
      >
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 14 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'relative', width: '100%', maxWidth: 480, zIndex: 1,
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            borderRadius: 20, overflow: 'hidden',
          }}
          role="dialog" aria-modal="true" aria-label="Report a Response"
        >
          {/* Header */}
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(232,112,144,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flag size={17} style={{ color: 'var(--danger)' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
                  Report a Response
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Help us improve safety and quality</p>
              </div>
            </div>
            <button onClick={handleClose}
              style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close"
            ><X size={16} /></button>
          </div>

          <div style={{ padding: '20px 24px 24px' }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                {reportFailed ? (
                  <>
                    <div style={{ fontSize: 44, marginBottom: 14 }}>📭</div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                      Couldn't reach the server
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                      Your report wasn't saved — we never store report data on your device. Please try again when you're online.
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle size={48} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                      Report submitted
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                      Your feedback helps make Manasitra safer for everyone. We review all reports within 48 hours.
                    </p>
                  </>
                )}
              </motion.div>
            ) : (
              <>
                {/* ── Message preview ── */}
                {prefillMessage && (
                  <div style={{
                    padding: '10px 14px', borderRadius: 12, marginBottom: 16,
                    background: 'rgba(155,143,240,0.06)', border: '1px solid var(--border)',
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Reporting this response
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic' }}>
                      "{prefillMessage.length > 120 ? prefillMessage.slice(0, 120) + '…' : prefillMessage}"
                    </p>
                  </div>
                )}

                <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14, lineHeight: 1.6 }}>
                  What was the issue?
                </p>

                {/* ── Reason buttons ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {REASONS.map(({ id, icon: Icon, label, color }) => (
                    <button key={id} onClick={() => setSelected(id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '11px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                        border: `1.5px solid ${selected === id ? color : 'var(--border)'}`,
                        background: selected === id ? `${color}10` : 'rgba(255,255,255,0.02)',
                        transition: 'all 0.15s',
                      }}
                    >
                      <Icon size={15} style={{ color: selected === id ? color : 'var(--text-3)', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: selected === id ? 'var(--text)' : 'var(--text-2)', fontWeight: selected === id ? 500 : 400 }}>
                        {label}
                      </span>
                      {selected === id && (
                        <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      )}
                    </button>
                  ))}
                </div>

                {/* ── Detail textarea ── */}
                <textarea
                  value={detail}
                  onChange={e => setDetail(e.target.value)}
                  placeholder="Add more detail (optional) — what did you expect instead?"
                  rows={3}
                  maxLength={500}
                  style={{
                    width: '100%', padding: '11px 14px', borderRadius: 12, resize: 'none',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                    color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-body)',
                    outline: 'none', marginBottom: 6, lineHeight: 1.6,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 16, textAlign: 'right' }}>
                  {detail.length}/500
                </p>

                {/* ── Privacy note ── */}
                <div style={{ padding: '9px 12px', borderRadius: 10, marginBottom: 16, background: 'rgba(93,214,160,0.06)', border: '1px solid rgba(93,214,160,0.15)' }}>
                  <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.55 }}>
                    🔒 Only the reason, your detail, and the first 120 characters of the response are sent. No personal data, no chat history.
                  </p>
                </div>

                {/* ── Actions ── */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handleClose}
                    style={{ flex: 1, padding: '12px', borderRadius: 12, cursor: 'pointer', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', fontSize: 13, fontWeight: 500 }}
                  >
                    Cancel
                  </button>
                  <button onClick={submit} disabled={!selected || loading}
                    style={{
                      flex: 2, padding: '12px', borderRadius: 12,
                      cursor: selected && !loading ? 'pointer' : 'not-allowed',
                      border: 'none',
                      background: selected ? 'linear-gradient(135deg, var(--danger) 0%, #C04060 100%)' : 'rgba(255,255,255,0.05)',
                      color: selected ? 'white' : 'var(--text-3)',
                      fontSize: 13, fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      transition: 'all 0.15s',
                      boxShadow: selected ? '0 4px 16px rgba(232,112,144,0.25)' : 'none',
                    }}
                  >
                    {loading
                      ? <><Loader size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> Submitting…</>
                      : <><Send size={14} /> Submit Report</>
                    }
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
