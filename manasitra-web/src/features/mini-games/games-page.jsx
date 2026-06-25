import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Wind, Hand, Grid3x3, Anchor, Palette, Sparkles, Type, Flower2, ScanLine, Package, Play } from 'lucide-react'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import { useGardenStore, XP_REWARDS } from '@store/garden-store'

const GAMES = [
  { key:'breathing',    route:'/games/breathing',    icon:Wind,     bgClass: 'bg-[var(--color-sage-soft)]', textClass: 'text-[var(--color-primary-container)]', duration:'~2 min',  tag:'Breathing', bentoClass: 'bento-item-large' },
  { key:'grounding',    route:'/games/grounding',    icon:Anchor,   bgClass: 'bg-[var(--color-secondary-container)]/20', textClass: 'text-[var(--color-secondary-container)]', duration:'~3 min',  tag:'Grounding', bentoClass: 'bento-item-wide' },
  { key:'puzzle',       route:'/games/puzzle',       icon:Grid3x3,  bgClass: 'bg-[var(--color-tertiary-container)]/20', textClass: 'text-[var(--color-tertiary-container)]', duration:'~2 min',  tag:'Focus', bentoClass: 'bento-item-standard' },
  { key:'canvas',       route:'/games/canvas',       icon:Palette,  bgClass: 'bg-[var(--color-primary-container)]/20', textClass: 'text-[var(--color-primary-container)]', duration:'Open',    tag:'Express', bentoClass: 'bento-item-tall', hasImage: true },
  { key:'gratitude',    route:'/games/gratitude',    icon:Flower2,  bgClass: 'bg-[var(--color-warm-mist)]', textClass: 'text-[var(--color-on-surface-variant)]', duration:'~3 min',  tag:'Gratitude', bentoClass: 'bento-item-standard' },
  { key:'affirmations', route:'/games/affirmations', icon:Sparkles, bgClass: 'bg-[var(--color-secondary-container)]/20', textClass: 'text-[var(--color-secondary-container)]', duration:'~1 min',  tag:'Uplift', bentoClass: 'bento-item-standard' },
  { key:'tap',          route:'/games/tap',          icon:Hand,     bgClass: 'bg-[var(--color-tertiary-container)]/20', textClass: 'text-[var(--color-tertiary-container)]', duration:'~1 min',  tag:'Release', bentoClass: 'bento-item-standard' },
  { key:'word_reset',   route:'/games/words',        icon:Type,     bgClass: 'bg-[var(--color-sage-soft)]', textClass: 'text-[var(--color-primary-container)]', duration:'~2 min',  tag:'Reflect', bentoClass: 'bento-item-standard' },
  { key:'body_scan',    route:'/games/bodyscan',     icon:ScanLine, bgClass: 'bg-[var(--color-secondary-container)]/20', textClass: 'text-[var(--color-secondary-container)]', duration:'~4 min',  tag:'Body', bentoClass: 'bento-item-standard' },
  { key:'worry_box',    route:'/games/worrybox',     icon:Package,  bgClass: 'bg-[var(--color-tertiary-container)]/20', textClass: 'text-[var(--color-tertiary-container)]', duration:'~3 min',  tag:'Release', bentoClass: 'bento-item-standard' },
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

  // To simulate the streak data since progressStore might not have it yet.
  const streakDays = 4;
  const sessionsCount = 12;
  const mindfulMins = 85;

  return (
    <div className="app-shell bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      {/* Decorative background elements */}
      <div className="floating-orb w-96 h-96 bg-[var(--color-primary-container)] top-[-10%] left-[-10%]"></div>
      <div className="floating-orb w-80 h-80 bg-[var(--color-secondary-container)] bottom-[10%] right-[-5%]" style={{ animationDelay: '-5s' }}></div>

      <main className="pt-8 pb-32 px-5 md:px-10 max-w-[1200px] mx-auto relative z-10">
        {/* Hero Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-on-surface)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Wellness Tools Library
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl">
            A curated sanctuary of calming activities designed to help you refocus, recharge, and find your center during busy student days.
          </p>
        </section>

        {/* Bento Grid Tools */}
        <div className="bento-grid">
          {GAMES.map((game) => {
            const { key, route, icon: Icon, bgClass, textClass, duration, bentoClass, hasImage } = game;
            const isRecommended = recommended.includes(key);

            if (bentoClass === 'bento-item-large') {
              return (
                <motion.div key={key}
                  whileHover={{ y: -4 }}
                  className={`glass-card ${bentoClass} p-8 rounded-[1.5rem] flex flex-col justify-between group overflow-hidden relative cursor-pointer border ${isRecommended ? 'border-[var(--color-primary-container)]' : 'border-[rgba(226,232,240,0.5)]'}`}
                  onClick={() => handleGameClick(route, key)}
                >
                  <div className="relative z-10">
                    {isRecommended && <span className="absolute right-0 top-0 text-xs font-bold px-3 py-1 bg-[var(--color-primary-container)] text-white rounded-full">Recommended</span>}
                    <div className={`w-16 h-16 ${bgClass} rounded-2xl flex items-center justify-center mb-6 ${textClass} group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 font-display">{t(`games.${key}`)}</h3>
                    <p className="text-[var(--color-on-surface-variant)] mb-6 text-base">{t(`games.${key}_desc`)}</p>
                  </div>
                  <div className="relative z-10 flex gap-4">
                    <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                      Start Session
                      <Play size={16} />
                    </button>
                  </div>
                  {/* Visual Decoration */}
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5">
                    <Icon size={200} />
                  </div>
                </motion.div>
              );
            }

            if (bentoClass === 'bento-item-wide') {
              return (
                <motion.div key={key}
                  whileHover={{ y: -4 }}
                  className={`glass-card ${bentoClass} p-6 rounded-[1.5rem] flex items-center gap-6 group cursor-pointer border ${isRecommended ? 'border-[var(--color-primary-container)]' : 'border-[rgba(226,232,240,0.5)]'}`}
                  onClick={() => handleGameClick(route, key)}
                >
                  <div className={`w-20 h-20 ${bgClass} rounded-2xl flex-shrink-0 flex items-center justify-center ${textClass} group-hover:rotate-12 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold font-display">{t(`games.${key}`)}</h3>
                      {isRecommended && <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--color-primary-container)] text-white rounded-full">Rec</span>}
                    </div>
                    <p className="text-[var(--color-on-surface-variant)] text-sm mb-2">{t(`games.${key}_desc`)}</p>
                    <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-wider">{duration} duration</span>
                  </div>
                </motion.div>
              );
            }

            if (bentoClass === 'bento-item-tall') {
              return (
                <motion.div key={key}
                  whileHover={{ y: -4 }}
                  className={`glass-card ${bentoClass} p-6 rounded-[1.5rem] flex flex-col group overflow-hidden relative cursor-pointer border ${isRecommended ? 'border-[var(--color-primary-container)]' : 'border-[rgba(226,232,240,0.5)]'}`}
                  onClick={() => handleGameClick(route, key)}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${bgClass} rounded-xl flex items-center justify-center ${textClass}`}>
                        <Icon size={24} />
                      </div>
                      {isRecommended && <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--color-primary-container)] text-white rounded-full">Recommended</span>}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 font-display">{t(`games.${key}`)}</h3>
                    <p className="text-[var(--color-on-surface-variant)] text-sm mb-6">{t(`games.${key}_desc`)}</p>
                  </div>
                  {hasImage && (
                    <div className="mt-auto relative z-10">
                      <img className="w-full h-40 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQNxcS3HuPmiglPmB2MCe6VdLjH5KFp1hoQeqQgiLdor-NvfKPQkCsYW35DfHZCyKGIKkrEtZRgpw8hDPGppTCN1PbOWj4fb111RvThOWsdR26cBZ-q347VgLa6XJJJNQ8xWAE1kfYNyfxR2yb2mZ_BSnLu2x9_bw8KkuGUKQ9uzt9DDbqqR-IVruKh06wlxNI6zwA_Wn2Zdt8GoVoAKOJ2JqVkKE2OagRiD7ZX0SQZ6Mdhrvx-hhIey87uTl81hKqNEzqo-RATwBI" alt="Canvas" />
                    </div>
                  )}
                </motion.div>
              );
            }

            // Standard bento item
            return (
              <motion.div key={key}
                whileHover={{ y: -4 }}
                className={`glass-card ${bentoClass} p-6 rounded-[1.5rem] group cursor-pointer border ${isRecommended ? 'border-[var(--color-primary-container)]' : 'border-[rgba(226,232,240,0.5)]'}`}
                onClick={() => handleGameClick(route, key)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${bgClass} rounded-xl flex items-center justify-center ${textClass}`}>
                    <Icon size={24} />
                  </div>
                  {isRecommended && <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--color-primary-container)] text-white rounded-full">Rec</span>}
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">{t(`games.${key}`)}</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm mb-4">{t(`games.${key}_desc`)}</p>
                <span className="text-[var(--color-outline-variant)] font-semibold text-xs">{duration}</span>
              </motion.div>
            );
          })}

          {/* Daily Quote (Wide) */}
          <div className="glass-card bento-item-wide p-6 rounded-[1.5rem] flex flex-col justify-center text-center bg-[var(--color-surface-tint)] text-white">
            <p className="text-lg italic mb-2 font-display">"Peace is a practice, not a destination. You are doing enough just by being here."</p>
            <span className="text-white/80 text-xs font-medium">— Your Mansitra Companion</span>
          </div>
        </div>

        {/* Weekly Progress Summary */}
        <section className="mt-16 p-8 bg-[var(--color-surface-container)] rounded-[2rem] border border-[var(--color-outline-variant)]/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-semibold mb-2 font-display text-[var(--color-on-surface)]">Your Mindful Streak</h3>
              <p className="text-[var(--color-on-surface-variant)] mb-4">You've engaged with wellness tools for {streakDays} days this week. You're building a healthy habit!</p>
              <div className="w-full bg-white/50 h-3 rounded-full overflow-hidden">
                <div className="bg-[var(--color-active-teal)] h-full w-[60%] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]"></div>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-surface-tint)]">{sessionsCount}</div>
                <div className="text-[10px] uppercase text-[var(--color-outline-variant)] font-bold tracking-widest">Sessions</div>
              </div>
              <div className="w-px h-10 bg-[var(--color-outline-variant)]"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-surface-tint)]">{mindfulMins}m</div>
                <div className="text-[10px] uppercase text-[var(--color-outline-variant)] font-bold tracking-widest">Mindful</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
