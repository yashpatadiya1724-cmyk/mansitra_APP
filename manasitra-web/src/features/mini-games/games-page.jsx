import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Wind, Hand, Grid3x3, Anchor, Palette, Sparkles, Type, Flower2, ScanLine, Package, Gamepad2, Zap } from 'lucide-react'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import { useGardenStore, XP_REWARDS } from '@store/garden-store'

const GAMES = [
  { key:'breathing',    route:'/games/breathing',    icon:Wind,     color:'#62C8B9', duration:'~2 min',  tag:'Breathing' },
  { key:'tap',          route:'/games/tap',          icon:Hand,     color:'#9B8FF0', duration:'~1 min',  tag:'Release' },
  { key:'grounding',    route:'/games/grounding',    icon:Anchor,   color:'#5DD6A0', duration:'~3 min',  tag:'Grounding' },
  { key:'puzzle',       route:'/games/puzzle',       icon:Grid3x3,  color:'#F0B860', duration:'~2 min',  tag:'Focus' },
  { key:'canvas',       route:'/games/canvas',       icon:Palette,  color:'#E87090', duration:'Open',    tag:'Express' },
  { key:'affirmations', route:'/games/affirmations', icon:Sparkles, color:'#9B8FF0', duration:'~1 min',  tag:'Uplift' },
  { key:'word_reset',   route:'/games/words',        icon:Type,     color:'#62C8B9', duration:'~2 min',  tag:'Reflect' },
  { key:'gratitude',    route:'/games/gratitude',    icon:Flower2,  color:'#F5C842', duration:'~3 min',  tag:'Gratitude' },
  { key:'body_scan',    route:'/games/bodyscan',     icon:ScanLine, color:'#5B9BD5', duration:'~4 min',  tag:'Body' },
  { key:'worry_box',    route:'/games/worrybox',     icon:Package,  color:'#E87090', duration:'~3 min',  tag:'Release' },
]

// Mood → recommended tools mapping
const MOOD_RECOMMENDATIONS = {
  anxious:     ['breathing', 'grounding', 'tap'],
  overwhelmed: ['breathing', 'worry_box', 'body_scan'],
  sad:         ['affirmations', 'gratitude', 'word_reset'],
  exhausted:   ['body_scan', 'tap', 'breathing'],
  neutral:     ['affirmations', 'word_reset', 'puzzle'],
  content:     ['gratitude', 'canvas', 'affirmations'],
  very_happy:  ['gratitude', 'canvas', 'affirmations'],
}

export const GamesPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getTodaysMood } = useMoodStore()
  const { recordToolUsed } = useProgressStore()
  const { addXP } = useGardenStore()

  const todaysMood = getTodaysMood()
  const recommended = todaysMood ? (MOOD_RECOMMENDATIONS[todaysMood.mood] || []) : []

  const handleGameClick = (route, key) => {
    recordToolUsed(key)
    addXP(XP_REWARDS.tool_used, 'tool')
    navigate(route)
  }

  return (
    <div className="app-shell">
      <div className="page-wrap">

        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-soft)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Gamepad2 size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <h1 className="page-title" style={{ marginBottom: 0 }}>{t('games.title')}</h1>
          </div>
          <p className="page-subtitle">{t('games.subtitle')}</p>
        </div>

        {/* Mood-aware recommendation banner */}
        {todaysMood && recommended.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: '14px 18px', borderRadius: 14, marginBottom: 16, background: 'linear-gradient(135deg, rgba(155,143,240,0.12) 0%, rgba(98,200,185,0.08) 100%)', border: '1px solid var(--border-2)', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <Zap size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                Based on your mood today
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-2)' }}>
                These tools are recommended for when you're feeling {todaysMood.mood.replace('_', ' ')}.
              </p>
            </div>
          </motion.div>
        )}

        {/* Recommended section */}
        {recommended.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p className="section-label">Recommended for you</p>
            <div className="games-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
              {GAMES.filter(g => recommended.includes(g.key)).map(({ key, route, icon: Icon, color, duration, tag }, i) => (
                <motion.div key={`rec-${key}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="game-card"
                  onClick={() => handleGameClick(route, key)}
                  style={{
                    background: `linear-gradient(135deg, ${color}12 0%, var(--surface) 100%)`,
                    borderRadius: 28,
                    padding: 24,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                    border: 'none',
                    display: 'flex', flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} style={{ color }} />
                    </div>
                    <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: `${color}15`, color, fontWeight: 700 }}>{tag}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, marginBottom: 4, color: 'var(--text)' }}>{t(`games.${key}`)}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 12 }}>{t(`games.${key}_desc`)}</p>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{duration}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <p className="section-label">{recommended.length > 0 ? 'All tools' : 'Choose a tool'}</p>

        <div className="games-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
          {GAMES.map(({ key, route, icon: Icon, color, duration, tag }, i) => (
            <motion.div key={key}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="game-card"
              onClick={() => handleGameClick(route, key)}
              style={{
                background: 'var(--surface)',
                borderRadius: 28,
                padding: 24,
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                border: 'none',
                display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: `${color}15`, color, fontWeight: 700 }}>{tag}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, marginBottom: 4, color: 'var(--text)' }}>
                {t(`games.${key}`)}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 12 }}>
                {t(`games.${key}_desc`)}
              </p>
              <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
