import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import { useLanguageStore } from '@store/language-store'
import { MOOD_STATES } from '@/app/config/constants'
import { getDayLabel } from '@utils/date-utils'
import { Flame, Trophy, Plus, Trash2, Sparkles, TrendingUp, BarChart2, Brain, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import affirmations from '@data/affirmations/affirmations.json'
import { ExamCountdown } from './components/exam-countdown'

const MOOD_VAL = { very_happy:7, content:6, neutral:5, anxious:3, sad:2, overwhelmed:2, exhausted:3 }
const MOOD_COL = { very_happy:'#F5C842', content:'#5DD6A0', neutral:'#9E9B94', anxious:'#F0B860', sad:'#5B9BD5', overwhelmed:'#E87090', exhausted:'#9B8FF0' }

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const m = MOOD_STATES.find(x => x.id === d.mood)
  const c = m?.color || 'var(--primary)'
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 12px', fontSize: 13, display:'flex', alignItems:'center', gap:6 }}>
      <div style={{ width:10, height:10, borderRadius:'50%', background: c, flexShrink:0 }} />
      <span style={{ color: 'var(--text)' }}>{d.day} · {d.mood?.replace('_',' ')}</span>
    </div>
  )
}

export const DashboardPage = () => {
  const { t } = useTranslation()
  const { getMoodTrend } = useMoodStore()
  const { checkInStreak, resilienceScore, dailyWins, addWin, removeWin } = useProgressStore()
  const { selectedLanguage } = useLanguageStore()
  const [winText, setWinText] = useState('')

  const trend = getMoodTrend(7)
  const chartData = trend.slice().reverse().map(e => ({ day: getDayLabel(e.timestamp), value: MOOD_VAL[e.mood] || 5, mood: e.mood }))
  const aff = affirmations[selectedLanguage] || affirmations.en
  const todayAff = aff[new Date().getDate() % aff.length]

  const circ = 2 * Math.PI * 28
  const dash = circ - (resilienceScore / 100) * circ

  // Resilience score breakdown for tooltip
  const weekAgo = Date.now() - 7 * 86400000
  const recentWins = dailyWins.filter(w => w.timestamp > weekAgo).length
  const recentTools = (useProgressStore.getState().toolsUsed || []).filter(t => t.timestamp > weekAgo).length

  const addWinHandler = () => { if (!winText.trim()) return; addWin(winText.trim()); setWinText('') }

  // Weekly insight — generate from mood data
  const weeklyMoods = trend.slice(0, 7)
  const dominantMood = weeklyMoods.length > 0
    ? Object.entries(weeklyMoods.reduce((acc, e) => { acc[e.mood] = (acc[e.mood] || 0) + 1; return acc }, {}))
        .sort((a, b) => b[1] - a[1])[0]?.[0]
    : null

  const WEEKLY_INSIGHTS = {
    anxious:     "You've been carrying a lot of anxiety this week. That's real and valid. The fact that you kept checking in shows strength.",
    overwhelmed: "This week felt heavy. But you showed up anyway. That matters more than you know.",
    sad:         "It's been a tough week emotionally. Be gentle with yourself. Small steps still count.",
    exhausted:   "You've been running on low energy. Rest is not laziness — it's recovery.",
    neutral:     "A steady week. Sometimes neutral is exactly what you need to recharge.",
    content:     "You've had a relatively calm week. That's worth acknowledging.",
    very_happy:  "A good week! Savour it. Notice what made it good — those things matter.",
  }

  return (
    <div className="app-shell">
      <div className="page-wrap">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-soft)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <h1 className="page-title" style={{ marginBottom: 0 }}>{t('dashboard.title')}</h1>
          </div>
          <p className="page-subtitle">Your journey, your pace. Every check-in counts.</p>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}
            className="glass-card stat-card"
            style={{ background: 'linear-gradient(135deg, rgba(240,184,96,0.10) 0%, rgba(240,184,96,0.04) 100%)' }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <Flame size={22} style={{ color:'var(--warning)' }} />
              <span style={{ fontFamily:'var(--font-display)', fontSize:36, fontWeight:800, color:'var(--warning)', lineHeight:1 }}>{checkInStreak}</span>
            </div>
            <p style={{ fontSize:12, color:'var(--text-2)' }}>{t('dashboard.streak')} {t('dashboard.days')}</p>
            {checkInStreak === 0 && <p style={{ fontSize:11, color:'var(--text-3)', marginTop:4 }}>Log a mood to start!</p>}
            {checkInStreak > 0 && <p style={{ fontSize:11, color:'var(--warning)', marginTop:4 }}>Keep it going!</p>}
          </motion.div>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className="glass-card stat-card"
            style={{ background: 'linear-gradient(135deg, rgba(155,143,240,0.10) 0%, rgba(155,143,240,0.04) 100%)' }}
          >
            <div style={{ position:'relative', width:68, height:68, marginBottom:4 }}>
              <svg width="68" height="68" viewBox="0 0 68 68" className="arc-svg">
                <circle cx="34" cy="34" r="28" fill="none" stroke="var(--border)" strokeWidth="5" />
                <circle cx="34" cy="34" r="28" fill="none" stroke="var(--primary)" strokeWidth="5"
                  strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:17, fontWeight:800, color:'var(--primary)' }}>
                {resilienceScore}
              </div>
            </div>
            <p style={{ fontSize:12, color:'var(--text-2)' }}>{t('dashboard.resilience_score')}</p>
            <p style={{ fontSize:10, color:'var(--text-3)', marginTop:3 }}>
              Streak · Wins · Tools · Stability
            </p>
          </motion.div>
        </div>

        {/* Chart */}
        {chartData.length > 0 ? (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
            className="glass-card" style={{ marginBottom:16 }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <TrendingUp size={16} style={{ color:'var(--primary)' }} />
              <p className="section-label" style={{ marginBottom:0 }}>7-Day Mood Trend</p>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={chartData} margin={{ top:5, right:5, bottom:0, left:-20 }}>
                <defs>
                  <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize:11, fill:'var(--text-2)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[1,7]} hide />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2.5} fill="url(#mg)"
                  dot={{ fill:'var(--primary)', r:5, strokeWidth:2, stroke:'var(--bg)' }}
                  activeDot={{ r:7, fill:'var(--primary)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="glass-card" style={{ marginBottom:16, textAlign:'center', padding:'32px 20px' }}>
            <div style={{ width:52, height:52, borderRadius:14, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
              <BarChart2 size={24} style={{ color:'var(--primary)' }} />
            </div>
            <p style={{ fontSize:14, color:'var(--text-2)' }}>Log your mood to see your trend here</p>
          </motion.div>
        )}

        {/* Weekly insight */}
        {dominantMood && WEEKLY_INSIGHTS[dominantMood] && (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18 }}
            style={{
              marginBottom:16, padding:'18px 20px', borderRadius:16,
              background:'linear-gradient(135deg, rgba(155,143,240,0.10) 0%, rgba(98,200,185,0.07) 100%)',
              border:'1px solid var(--border-2)',
              display:'flex', alignItems:'flex-start', gap:12,
            }}
          >
            <Brain size={18} style={{ color:'var(--primary)', flexShrink:0, marginTop:2 }} />
            <div>
              <p style={{ fontSize:11, color:'var(--text-3)', marginBottom:6, fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase' }}>
                This week's pattern
              </p>
              <p style={{ fontSize:14, color:'var(--text)', lineHeight:1.7 }}>
                {WEEKLY_INSIGHTS[dominantMood]}
              </p>
              <p style={{ fontSize:12, color:'var(--text-3)', marginTop:6 }}>
                Most common mood: {dominantMood.replace('_',' ')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Affirmation */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{
            marginBottom:16, padding:'20px 22px', borderRadius:16,
            background:'linear-gradient(135deg, rgba(155,143,240,0.10) 0%, rgba(98,200,185,0.07) 100%)',
            border:'1px solid var(--border)',
            display:'flex', alignItems:'flex-start', gap:12,
          }}
        >
          <Sparkles size={18} style={{ color:'var(--primary)', flexShrink:0, marginTop:2 }} />
          <div>
            <p style={{ fontSize:11, color:'var(--text-3)', marginBottom:7, fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase' }}>Today's reminder</p>
            <p style={{ fontSize:15, fontWeight:500, lineHeight:1.65, color:'var(--text)' }}>"{todayAff}"</p>
          </div>
        </motion.div>

        {/* Exam countdown */}
        <ExamCountdown />

        {/* Daily wins */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }} className="glass-card">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <Trophy size={16} style={{ color:'var(--warning)' }} />
            <p style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700 }}>{t('dashboard.daily_wins')}</p>
          </div>

          <div style={{ display:'flex', gap:8, marginBottom:16 }}>
            <input value={winText} onChange={e => setWinText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addWinHandler()}
              placeholder={t('dashboard.win_placeholder')} className="input" style={{ flex:1 }}
            />
            <button onClick={addWinHandler} disabled={!winText.trim()}
              style={{
                width:44, height:44, borderRadius:12, flexShrink:0, border:'none',
                cursor: winText.trim() ? 'pointer' : 'not-allowed',
                background: winText.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color:'white', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s',
              }}
            ><Plus size={18} /></button>
          </div>

          {dailyWins.length === 0 ? (
            <div style={{ textAlign:'center', padding:'24px 0' }}>
              <div style={{ width:52, height:52, borderRadius:14, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
                <Trophy size={24} style={{ color:'var(--primary)' }} />
              </div>
              <p style={{ fontSize:14, color:'var(--text-2)' }}>Log your first win today — even small ones count.</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:220, overflowY:'auto' }}>
              {dailyWins.slice(0,10).map((w, i) => (
                <motion.div key={w.id} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.04 }}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:10, background:'rgba(93,214,160,0.06)', border:'1px solid rgba(93,214,160,0.14)' }}
                >
                  <span style={{ color:'var(--success)', fontSize:16 }}>✓</span>
                  <span style={{ flex:1, fontSize:14, color:'var(--text)' }}>{w.text}</span>
                  <button onClick={() => removeWin(w.id)}
                    style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-3)', padding:4, borderRadius:6, transition:'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                  ><Trash2 size={13} /></button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
