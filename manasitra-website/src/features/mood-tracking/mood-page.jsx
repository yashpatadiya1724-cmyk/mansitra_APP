import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import { useGardenStore, XP_REWARDS } from '@store/garden-store'
import { MOOD_STATES } from '@/app/config/constants'
import { formatDate } from '@utils/date-utils'
import { CheckCircle, ChevronDown, StickyNote, Smile, Sun, Meh, CloudRain, Zap, Wind, Moon, BarChart2 } from 'lucide-react'

const MOOD_ICONS = {
  very_happy:  Sun,
  content:     Smile,
  neutral:     Meh,
  anxious:     Zap,
  sad:         CloudRain,
  overwhelmed: Wind,
  exhausted:   Moon,
}

const MoodIcon = ({ moodId, size = 24, color }) => {
  const Icon = MOOD_ICONS[moodId] || Smile
  return <Icon size={size} style={{ color }} />
}

const MOOD_COLOR = {
  very_happy:'#FDE047', content:'#86EFAC', neutral:'#D1D5DB',
  anxious:'#FCA5A5', sad:'#93C5FD', overwhelmed:'#F9A8D4', exhausted:'#C4B5FD',
}
const TAGS = ['exam', 'family', 'sleep', 'social', 'work', 'health', 'placement', 'hostel']

export const MoodPage = () => {
  const { t } = useTranslation()
  const { addMoodEntry, getTodaysMood, getMoodTrend } = useMoodStore()
  const { recordCheckIn } = useProgressStore()
  const { addXP } = useGardenStore()
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [tags, setTags] = useState([])
  const [saved, setSaved] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const today = getTodaysMood()
  const recent = getMoodTrend(7)
  const toggleTag = t => setTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])

  const save = () => {
    if (!selected) return
    addMoodEntry({ mood: selected, note: note.slice(0, 100), tags })
    recordCheckIn()
    addXP(XP_REWARDS.mood_checkin, 'mood')
    setSaved(true)
    setTimeout(() => { setSaved(false); setSelected(null); setNote(''); setTags([]) }, 1800)
  }

  return (
    <div className="app-shell">
      <div className="page-wrap">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-soft)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smile size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <h1 className="page-title" style={{ marginBottom: 0 }}>{t('mood.title')}</h1>
          </div>
          <p className="page-subtitle">Check in with yourself. No judgment here.</p>
        </div>

        {/* Today's mood banner */}
        {today && !selected && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '18px 20px', borderRadius: 16, marginBottom: 20,
              background: `linear-gradient(135deg, ${MOOD_COLOR[today.mood]}14 0%, ${MOOD_COLOR[today.mood]}07 100%)`,
              border: `1px solid ${MOOD_COLOR[today.mood]}30`,
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <div style={{ width:52, height:52, borderRadius:14, background:`${MOOD_COLOR[today.mood]}18`, border:`1px solid ${MOOD_COLOR[today.mood]}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <MoodIcon moodId={today.mood} size={26} color={MOOD_COLOR[today.mood]} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 3 }}>Today you felt</p>
              <p style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: MOOD_COLOR[today.mood] }}>
                {t(`mood.states.${today.mood}`)}
              </p>
              {today.note && <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3, fontStyle: 'italic' }}>"{today.note}"</p>}
            </div>
            <button onClick={() => setSelected(null)} className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12, minHeight: 36 }}>
              Update
            </button>
          </motion.div>
        )}

        {/* Mood selector card */}
        <div className="glass-card" style={{ marginBottom: 20 }}>
          <p className="section-label">{today ? 'Update your mood' : 'How are you feeling right now?'}</p>

          <div className="mood-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: selected ? 24 : 0 }}
            role="radiogroup" aria-label={t('a11y.mood_selector')}
          >
            {MOOD_STATES.map(m => (
              <motion.button key={m.id} whileTap={{ scale: 0.95 }} onClick={() => setSelected(m.id)}
                aria-label={t(`mood.states.${m.id}`)} aria-pressed={selected === m.id}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '16px 10px', borderRadius: 20, cursor: 'pointer',
                  border: selected === m.id ? '3px solid var(--text)' : '3px solid transparent',
                  background: MOOD_COLOR[m.id],
                  transition: 'all 0.15s', minHeight: 90,
                  boxShadow: selected === m.id ? '0 4px 0 var(--text)' : 'none',
                }}
              >
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <MoodIcon moodId={m.id} size={32} color="var(--text)" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, textAlign: 'center', color: 'var(--text)' }}>
                  {t(`mood.states.${m.id}`)}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ position: 'relative', marginBottom: 14 }}>
                    <StickyNote size={14} style={{ position: 'absolute', left: 13, top: 14, color: 'var(--text-3)', pointerEvents: 'none' }} />
                    <textarea value={note} onChange={e => setNote(e.target.value)}
                      placeholder={t('mood.note_placeholder')} maxLength={100} rows={2}
                      className="input" style={{ paddingLeft: 34, resize: 'none' }}
                    />
                    <span style={{ position: 'absolute', right: 12, bottom: 10, fontSize: 11, color: 'var(--text-3)' }}>{note.length}/100</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                    {TAGS.map(tag => (
                      <button key={tag} onClick={() => toggleTag(tag)} className={`tag ${tags.includes(tag) ? 'active' : ''}`}>{tag}</button>
                    ))}
                  </div>

                  <motion.button whileTap={{ scale: 0.98 }} onClick={save}
                    style={{
                      width: '100%', padding: '14px', borderRadius: 12, cursor: 'pointer',
                      background: saved
                        ? 'linear-gradient(135deg, var(--success) 0%, #4CAF82 100%)'
                        : `linear-gradient(135deg, ${MOOD_COLOR[selected]} 0%, ${MOOD_COLOR[selected]}CC 100%)`,
                      border: 'none', color: 'white',
                      fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'background 0.3s', minHeight: 50,
                    }}
                  >
                    {saved ? <><CheckCircle size={16} /> Saved!</> : t('mood.save')}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History */}
        {recent.length > 0 && (
          <div>
            <button onClick={() => setShowHistory(!showHistory)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 14px' }}
            >
              <p className="section-label" style={{ marginBottom: 0 }}>{t('mood.history')} ({recent.length})</p>
              <ChevronDown size={16} style={{ color: 'var(--text-3)', transform: showHistory ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {recent.slice(0, 7).map((e, i) => {
                      const m = MOOD_STATES.find(x => x.id === e.mood)
                      const c = MOOD_COLOR[e.mood]
                      return (
                        <motion.div key={e.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                          className="glass-sm" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderLeft: `3px solid ${c}` }}
                        >
                          <div style={{ width:36, height:36, borderRadius:10, background:`${c}14`, border:`1px solid ${c}25`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <MoodIcon moodId={e.mood} size={18} color={c} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: c }}>{t(`mood.states.${e.mood}`)}</p>
                            {e.note && <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{e.note}</p>}
                            {e.tags?.length > 0 && (
                              <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                                {e.tags.map(tag => (
                                  <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'var(--primary-soft)', color: 'var(--primary)' }}>{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--text-3)', flexShrink: 0 }}>{formatDate(e.timestamp)}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {recent.length === 0 && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
            <div style={{ width:52, height:52, borderRadius:14, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
              <BarChart2 size={24} style={{ color:'var(--primary)' }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>No mood history yet</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Select a mood above to start tracking your emotional journey.</p>
          </div>
        )}
      </div>
    </div>
  )
}
