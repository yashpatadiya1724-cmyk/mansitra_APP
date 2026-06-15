import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, Trash2, Clock } from 'lucide-react'

const STORAGE_KEY = 'manasitra_exams'

const loadExams = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

const saveExams = (exams) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exams))
}

const getDaysLeft = (dateStr) => {
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target - today) / 86400000)
}

const getUrgencyColor = (days) => {
  if (days < 0)  return 'var(--text-3)'
  if (days <= 3) return 'var(--danger)'
  if (days <= 7) return 'var(--warning)'
  if (days <= 14) return 'var(--primary)'
  return 'var(--success)'
}

const getUrgencyLabel = (days) => {
  if (days < 0)  return 'Passed'
  if (days === 0) return 'Today!'
  if (days === 1) return 'Tomorrow!'
  if (days <= 3) return `${days} days — focus now`
  if (days <= 7) return `${days} days — stay steady`
  return `${days} days`
}

export const ExamCountdown = () => {
  const [exams, setExams] = useState(loadExams)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => { saveExams(exams) }, [exams])

  const add = () => {
    if (!name.trim() || !date) return
    setExams(prev => [...prev, { id: crypto.randomUUID(), name: name.trim(), date }].sort((a, b) => new Date(a.date) - new Date(b.date)))
    setName(''); setDate(''); setAdding(false)
  }

  const remove = (id) => setExams(prev => prev.filter(e => e.id !== id))

  // Filter out exams more than 1 day past
  const active = exams.filter(e => getDaysLeft(e.date) >= -1)

  return (
    <div className="glass-card" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={16} style={{ color: 'var(--primary)' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>Exam Countdown</p>
        </div>
        <button onClick={() => setAdding(!adding)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 12 }}
        >
          <Plus size={13} /> Add
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: 14 }}
          >
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="Exam name (e.g. JEE Mains)"
                className="input" style={{ flex: 2 }}
              />
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="input" style={{ flex: 1 }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setAdding(false)}
                style={{ flex: 1, padding: '8px', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 13 }}
              >Cancel</button>
              <button onClick={add} disabled={!name.trim() || !date}
                style={{ flex: 2, padding: '8px', borderRadius: 10, border: 'none', background: name.trim() && date ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: name.trim() && date ? 'white' : 'var(--text-3)', cursor: name.trim() && date ? 'pointer' : 'not-allowed', fontSize: 13, fontWeight: 600 }}
              >Add Exam</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exam list */}
      {active.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>No exams added. Tap + to track your upcoming exams.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {active.map((exam, i) => {
            const days = getDaysLeft(exam.date)
            const color = getUrgencyColor(days)
            const label = getUrgencyLabel(days)
            return (
              <motion.div key={exam.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: `${color}08`, border: `1px solid ${color}25` }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color, lineHeight: 1 }}>
                    {days < 0 ? '✓' : days === 0 ? '!' : days}
                  </span>
                  {days > 0 && <span style={{ fontSize: 9, color, opacity: 0.8 }}>days</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{exam.name}</p>
                  <p style={{ fontSize: 12, color }}>{label}</p>
                </div>
                <button onClick={() => remove(exam.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 4, borderRadius: 6, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                ><Trash2 size={13} /></button>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
