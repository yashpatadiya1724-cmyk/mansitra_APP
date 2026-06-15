import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGardenStore, GARDEN_STAGES, XP_REWARDS } from '@store/garden-store'
import { Leaf, Zap, MessageCircle, Smile, Wind, Trophy, X } from 'lucide-react'

// ── SVG Plants for each stage ─────────────────────────────────
const Seed = () => (
  <svg viewBox="0 0 200 200" width="160" height="160">
    <ellipse cx="100" cy="160" rx="40" ry="8" fill="rgba(74,124,111,0.15)"/>
    <ellipse cx="100" cy="148" rx="18" ry="22" fill="#8B6914" opacity="0.8"/>
    <ellipse cx="100" cy="140" rx="14" ry="16" fill="#A07820"/>
    <path d="M100 128 Q104 120 100 115 Q96 120 100 128" fill="#5BA88A" opacity="0.7"/>
  </svg>
)

const Sprout = () => (
  <svg viewBox="0 0 200 220" width="160" height="180">
    <ellipse cx="100" cy="195" rx="45" ry="9" fill="rgba(74,124,111,0.15)"/>
    {/* Stem */}
    <path d="M100 190 Q100 160 100 130" stroke="#5BA88A" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* Left leaf */}
    <path d="M100 160 Q78 148 72 132 Q88 138 100 160" fill="#6BBF9A" opacity="0.9"/>
    {/* Right leaf */}
    <path d="M100 150 Q122 138 128 122 Q112 128 100 150" fill="#5BA88A" opacity="0.9"/>
    {/* Tiny bud */}
    <ellipse cx="100" cy="128" rx="7" ry="9" fill="#7DD4A8"/>
    {/* Soil */}
    <ellipse cx="100" cy="190" rx="38" ry="12" fill="#8B6914" opacity="0.6"/>
    <ellipse cx="100" cy="186" rx="34" ry="9" fill="#A07820" opacity="0.5"/>
  </svg>
)

const Sapling = () => (
  <svg viewBox="0 0 200 240" width="170" height="200">
    <ellipse cx="100" cy="215" rx="50" ry="10" fill="rgba(74,124,111,0.15)"/>
    {/* Trunk */}
    <path d="M100 210 Q98 180 100 140" stroke="#8B6914" strokeWidth="7" fill="none" strokeLinecap="round"/>
    {/* Branch left */}
    <path d="M100 165 Q80 155 68 140" stroke="#8B6914" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* Branch right */}
    <path d="M100 155 Q120 145 132 130" stroke="#8B6914" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* Foliage */}
    <circle cx="100" cy="118" r="32" fill="#5BA88A" opacity="0.85"/>
    <circle cx="72"  cy="128" r="22" fill="#6BBF9A" opacity="0.80"/>
    <circle cx="130" cy="120" r="20" fill="#4A9A7A" opacity="0.80"/>
    <circle cx="100" cy="105" r="18" fill="#7DD4A8" opacity="0.75"/>
    {/* Soil */}
    <ellipse cx="100" cy="212" rx="42" ry="13" fill="#8B6914" opacity="0.6"/>
    <ellipse cx="100" cy="208" rx="38" ry="10" fill="#A07820" opacity="0.5"/>
  </svg>
)

const Tree = () => (
  <svg viewBox="0 0 220 260" width="190" height="220">
    <ellipse cx="110" cy="238" rx="60" ry="12" fill="rgba(74,124,111,0.15)"/>
    {/* Trunk */}
    <path d="M110 232 Q107 195 110 145" stroke="#7A5010" strokeWidth="12" fill="none" strokeLinecap="round"/>
    {/* Branches */}
    <path d="M110 180 Q82 165 65 145" stroke="#7A5010" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M110 168 Q138 153 155 133" stroke="#7A5010" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M110 195 Q88 185 75 170" stroke="#7A5010" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* Foliage layers */}
    <circle cx="110" cy="110" r="52" fill="#4A9A7A" opacity="0.80"/>
    <circle cx="72"  cy="128" r="36" fill="#5BA88A" opacity="0.82"/>
    <circle cx="148" cy="122" r="32" fill="#4A9A7A" opacity="0.78"/>
    <circle cx="110" cy="88"  r="38" fill="#6BBF9A" opacity="0.80"/>
    <circle cx="85"  cy="100" r="26" fill="#7DD4A8" opacity="0.70"/>
    <circle cx="135" cy="98"  r="24" fill="#5BA88A" opacity="0.72"/>
    {/* Soil */}
    <ellipse cx="110" cy="234" rx="52" ry="14" fill="#7A5010" opacity="0.6"/>
    <ellipse cx="110" cy="229" rx="46" ry="11" fill="#9A6818" opacity="0.5"/>
  </svg>
)

const BanyanTree = () => (
  <svg viewBox="0 0 260 280" width="220" height="240">
    <ellipse cx="130" cy="258" rx="80" ry="14" fill="rgba(74,124,111,0.20)"/>
    {/* Main trunk */}
    <path d="M130 252 Q126 210 130 155" stroke="#6B4010" strokeWidth="16" fill="none" strokeLinecap="round"/>
    {/* Aerial roots */}
    <path d="M85 185 Q82 210 80 248" stroke="#8B6020" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
    <path d="M175 180 Q178 210 180 248" stroke="#8B6020" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
    <path d="M60 170 Q56 205 55 248" stroke="#8B6020" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M200 168 Q204 205 205 248" stroke="#8B6020" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
    {/* Main branches */}
    <path d="M130 175 Q95 158 72 138" stroke="#6B4010" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <path d="M130 165 Q165 148 188 128" stroke="#6B4010" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <path d="M130 190 Q105 178 88 162" stroke="#6B4010" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <path d="M130 185 Q155 173 172 157" stroke="#6B4010" strokeWidth="5" fill="none" strokeLinecap="round"/>
    {/* Massive foliage */}
    <circle cx="130" cy="100" r="68" fill="#3D8A6A" opacity="0.78"/>
    <circle cx="72"  cy="118" r="48" fill="#4A9A7A" opacity="0.82"/>
    <circle cx="188" cy="112" r="44" fill="#3D8A6A" opacity="0.80"/>
    <circle cx="130" cy="72"  r="52" fill="#5BA88A" opacity="0.80"/>
    <circle cx="95"  cy="88"  r="38" fill="#6BBF9A" opacity="0.75"/>
    <circle cx="165" cy="85"  r="36" fill="#5BA88A" opacity="0.75"/>
    <circle cx="50"  cy="135" r="32" fill="#4A9A7A" opacity="0.70"/>
    <circle cx="210" cy="130" r="30" fill="#3D8A6A" opacity="0.70"/>
    <circle cx="130" cy="55"  r="30" fill="#7DD4A8" opacity="0.72"/>
    {/* Golden glow at top */}
    <circle cx="130" cy="60" r="20" fill="#F5C842" opacity="0.25"/>
    <circle cx="130" cy="60" r="12" fill="#F5C842" opacity="0.20"/>
    {/* Soil */}
    <ellipse cx="130" cy="254" rx="68" ry="16" fill="#6B4010" opacity="0.6"/>
    <ellipse cx="130" cy="248" rx="60" ry="12" fill="#8B5818" opacity="0.5"/>
  </svg>
)

const PLANT_COMPONENTS = { seed: Seed, sprout: Sprout, sapling: Sapling, tree: Tree, banyan: BanyanTree }

// ── XP Activity list ──────────────────────────────────────────
const ACTIVITIES = [
  { icon: MessageCircle, label: 'Chat karo',        xp: XP_REWARDS.chat_message, color: '#4A7C6F' },
  { icon: Smile,         label: 'Mood log karo',    xp: XP_REWARDS.mood_checkin, color: '#5BA88A' },
  { icon: Wind,          label: 'Tool use karo',    xp: XP_REWARDS.tool_used,    color: '#7EBAA8' },
  { icon: Trophy,        label: 'Win log karo',     xp: XP_REWARDS.daily_win,    color: '#D4A574' },
]

export const SoulGardenPage = () => {
  const { xp, getStage, getNextStage, getProgress, newUnlock, clearNewUnlock, unlockedStages } = useGardenStore()
  const stage = getStage()
  const nextStage = getNextStage()
  const progress = getProgress()
  const PlantSVG = PLANT_COMPONENTS[stage.id]

  useEffect(() => {
    if (newUnlock) {
      const t = setTimeout(clearNewUnlock, 4000)
      return () => clearTimeout(t)
    }
  }, [newUnlock])

  return (
    <div className="page-wrap" style={{ paddingBottom: 100 }}>

      {/* ── Unlock celebration ── */}
      <AnimatePresence>
        {newUnlock && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            style={{
              position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
              zIndex: 100, background: 'var(--primary)', color: 'white',
              padding: '14px 24px', borderRadius: 20, textAlign: 'center',
              boxShadow: '0 8px 32px rgba(74,124,111,0.4)', maxWidth: 320, width: '90%',
            }}
          >
            <p style={{ fontSize: 22, marginBottom: 4 }}>🌱✨</p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>
              {newUnlock.labelEn} Unlocked!
            </p>
            <p style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{newUnlock.desc}</p>
            <button onClick={clearNewUnlock}
              style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}>
              <X size={14}/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Leaf size={24} style={{ color: 'var(--primary)' }} />
          Soul Garden
        </h1>
        <p className="page-subtitle">Teri resilience ka ped — har baat karne se badata hai</p>
      </div>

      {/* ── Plant display ── */}
      <motion.div
        className="glass-card"
        style={{ textAlign: 'center', marginBottom: 20, padding: '32px 20px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(74,124,111,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* Stage name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
            {stage.labelEn}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>·</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{stage.label}</span>
        </div>

        {/* Animated plant */}
        <motion.div
          key={stage.id}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ display: 'inline-block' }}
        >
          <PlantSVG />
        </motion.div>

        {/* Stage description */}
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 8, fontStyle: 'italic' }}>
          "{stage.desc}"
        </p>

        {/* XP badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, padding: '6px 14px', borderRadius: 999, background: 'var(--primary-soft)', border: '1px solid var(--border)' }}>
          <Zap size={13} style={{ color: 'var(--primary)' }}/>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{xp} XP</span>
        </div>
      </motion.div>

      {/* ── Progress bar ── */}
      {nextStage && (
        <div className="glass-card" style={{ marginBottom: 20, padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
              Next: {nextStage.labelEn}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
              {xp} / {nextStage.minXP} XP
            </span>
          </div>
          <div style={{ height: 10, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)' }}
            />
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
            {nextStage.minXP - xp} XP aur chahiye "{nextStage.labelEn}" ke liye
          </p>
        </div>
      )}

      {/* ── How to earn XP ── */}
      <div className="glass-card" style={{ marginBottom: 20, padding: '18px 20px' }}>
        <p className="section-label">XP Kaise Kamao</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ACTIVITIES.map(({ icon: Icon, label, xp: pts, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} style={{ color }}/>
              </div>
              <span style={{ flex: 1, fontSize: 14, color: 'var(--text)' }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>+{pts} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── All stages journey ── */}
      <div className="glass-card" style={{ padding: '18px 20px' }}>
        <p className="section-label">Tera Safar</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {GARDEN_STAGES.map((s, i) => {
            const unlocked = unlockedStages.includes(s.id)
            const isCurrent = s.id === stage.id
            return (
              <div key={s.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: i < GARDEN_STAGES.length - 1 ? 16 : 0 }}>
                {/* Timeline dot + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: isCurrent ? 'var(--primary)' : unlocked ? 'var(--secondary)' : 'var(--border)',
                    border: isCurrent ? '3px solid var(--primary-glow)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isCurrent ? '0 0 12px var(--primary-glow)' : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {unlocked
                      ? <Leaf size={13} style={{ color: 'white' }}/>
                      : <span style={{ fontSize: 10, color: 'var(--text-3)' }}>?</span>
                    }
                  </div>
                  {i < GARDEN_STAGES.length - 1 && (
                    <div style={{ width: 2, height: 24, background: unlocked ? 'var(--primary)' : 'var(--border)', marginTop: 4, borderRadius: 1 }}/>
                  )}
                </div>
                {/* Info */}
                <div style={{ paddingTop: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--primary)' : unlocked ? 'var(--text)' : 'var(--text-3)' }}>
                    {s.labelEn} · {s.label}
                    {isCurrent && <span style={{ fontSize: 11, marginLeft: 8, background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>Current</span>}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{s.minXP} XP se unlock</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
