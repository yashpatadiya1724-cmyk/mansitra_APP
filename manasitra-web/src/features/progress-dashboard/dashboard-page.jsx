import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import { useLanguageStore } from '@store/language-store'
import { useGardenStore } from '@store/garden-store'
import { MOOD_STATES } from '@/app/config/constants'
import { getDayLabel } from '@utils/date-utils'
import { Trophy, Plus, Trash2, TrendingUp, BarChart2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import affirmations from '@data/affirmations/affirmations.json'
import { ExamCountdown } from './components/exam-countdown'

const MOOD_VAL = { very_happy:7, content:6, neutral:5, anxious:3, sad:2, overwhelmed:2, exhausted:3 }
const MOOD_COL = { very_happy:'#F5C842', content:'#5DD6A0', neutral:'#9E9B94', anxious:'#F0B860', sad:'#5B9BD5', overwhelmed:'#E87090', exhausted:'#9B8FF0' }

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const m = MOOD_STATES.find(x => x.id === d.mood)
  const c = m?.color || 'var(--color-primary)'
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/30 rounded-xl px-3 py-2 text-sm flex items-center gap-2 shadow-sm">
      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c }} />
      <span className="text-[var(--color-on-surface)]">{d.day} · {d.mood?.replace('_',' ')}</span>
    </div>
  )
}

export const DashboardPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getMoodTrend, addMoodEntry } = useMoodStore()
  const { checkInStreak, dailyWins, addWin, removeWin } = useProgressStore()
  const { selectedLanguage } = useLanguageStore()
  const { getStage, getNextStage, getProgress } = useGardenStore()
  const [winText, setWinText] = useState('')
  const [feedbackMood, setFeedbackMood] = useState(null)

  const trend = getMoodTrend(7)
  const chartData = trend.slice().reverse().map(e => ({ day: getDayLabel(e.timestamp), value: MOOD_VAL[e.mood] || 5, mood: e.mood }))
  const aff = affirmations[selectedLanguage] || affirmations.en
  const todayAff = aff[new Date().getDate() % aff.length]

  const gardenStage = getStage()
  const nextStage = getNextStage()
  const gardenProgress = getProgress()

  const addWinHandler = () => { if (!winText.trim()) return; addWin(winText.trim()); setWinText('') }

  const handleMoodClick = (moodId, moodName) => {
    addMoodEntry(moodId)
    setFeedbackMood(moodName)
    setTimeout(() => setFeedbackMood(null), 3000)
  }

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-surface)] min-h-[calc(100vh-64px)] pb-24 md:pb-8" style={{ fontFamily: 'var(--font-body)' }}>
      <main className="max-w-[1200px] mx-auto px-5 md:px-10 py-8 space-y-8">
        
        {/* ── Welcome Section ── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-[var(--color-primary)] font-semibold tracking-wide uppercase">WELCOME BACK</p>
            <h1 className="text-3xl md:text-4xl text-[var(--color-on-background)]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Hello, friend. How are you feeling today?
            </h1>
          </div>
        </section>

        {/* ── Soul Garden Progress Card ── */}
        <section 
          onClick={() => navigate('/garden')}
          className="bg-gradient-to-br from-[var(--color-sage-soft)] to-white rounded-3xl p-6 shadow-sm border border-[var(--color-primary)]/10 relative overflow-hidden group cursor-pointer transition-all hover:shadow-md"
        >
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500 text-[120px] text-[var(--color-primary)]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychiatry</span>
              </div>
              <div>
                <h2 className="text-xl text-[var(--color-on-surface)] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Soul Garden</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-[var(--color-primary)] font-semibold">Current Growth: {gardenStage.labelEn}</span>
                  <span className="material-symbols-outlined text-base text-[var(--color-primary)]">potted_plant</span>
                </div>
              </div>
            </div>
            {nextStage && (
              <div className="flex-1 max-w-md space-y-2">
                <div className="flex justify-between text-xs text-[var(--color-outline)] font-medium">
                  <span>Progress to {nextStage.labelEn}</span>
                  <span className="font-bold text-[var(--color-primary)]">{gardenProgress}%</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[var(--color-primary)]/5">
                  <div className="h-full bg-[var(--color-primary-container)] rounded-full transition-all duration-1000" style={{ width: `${gardenProgress}%` }}></div>
                </div>
                <p className="text-xs text-[var(--color-on-surface-variant)] italic">Keep checking in and chatting to nourish your garden.</p>
              </div>
            )}
            <div className="flex items-center gap-2 text-[var(--color-primary)] text-sm font-semibold mt-4 md:mt-0">
              <span>Visit Garden</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </section>

        {/* ── Bento Grid Main Dashboard ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Daily Mood Check-in */}
          <div className="md:col-span-8 glass-card rounded-3xl p-8 space-y-8 relative overflow-hidden bg-white/70 border border-[var(--color-primary-container)]/20 shadow-sm">
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-[var(--color-on-surface)] mb-6" style={{ fontFamily: 'var(--font-display)' }}>Daily Check-in</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <button onClick={() => handleMoodClick('very_happy', 'Happy')} className="mood-bubble flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 border border-teal-100/50 hover:bg-white hover:border-[var(--color-primary)]/30 transition-all cursor-pointer">
                  <span className="text-4xl">😊</span>
                  <span className="text-sm font-medium text-[var(--color-outline)]">Happy</span>
                </button>
                <button onClick={() => handleMoodClick('content', 'Calm')} className="mood-bubble flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 border border-teal-100/50 hover:bg-white hover:border-[var(--color-primary)]/30 transition-all cursor-pointer">
                  <span className="text-4xl">😌</span>
                  <span className="text-sm font-medium text-[var(--color-outline)]">Calm</span>
                </button>
                <button onClick={() => handleMoodClick('sad', 'Sad')} className="mood-bubble flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 border border-teal-100/50 hover:bg-white hover:border-[var(--color-primary)]/30 transition-all cursor-pointer">
                  <span className="text-4xl">😔</span>
                  <span className="text-sm font-medium text-[var(--color-outline)]">Sad</span>
                </button>
                <button onClick={() => handleMoodClick('anxious', 'Stressed')} className="mood-bubble flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 border border-teal-100/50 hover:bg-white hover:border-[var(--color-primary)]/30 transition-all cursor-pointer">
                  <span className="text-4xl">😫</span>
                  <span className="text-sm font-medium text-[var(--color-outline)]">Stressed</span>
                </button>
                <button onClick={() => handleMoodClick('exhausted', 'Tired')} className="mood-bubble flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 border border-teal-100/50 hover:bg-white hover:border-[var(--color-primary)]/30 transition-all cursor-pointer">
                  <span className="text-4xl">😴</span>
                  <span className="text-sm font-medium text-[var(--color-outline)]">Tired</span>
                </button>
              </div>
              <AnimatePresence>
                {feedbackMood && (
                  <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="mt-6 p-4 rounded-xl bg-[var(--color-sage-soft)] text-[var(--color-primary)] font-medium text-center">
                    It's okay to feel {feedbackMood.toLowerCase()}. Mitra is here for you.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative z-10 pt-4 border-t border-[var(--color-outline-variant)]/20">
              <p className="text-base text-[var(--color-outline)] italic">"Mana Ka Mitra" — A friend for your mind, always here to listen without judgment.</p>
            </div>
          </div>

          {/* Quick Action: Chat Now */}
          <div 
            onClick={() => navigate('/chat')}
            className="md:col-span-4 bg-[var(--color-primary)] rounded-3xl p-8 flex flex-col justify-between text-white shadow-xl shadow-[var(--color-primary)]/20 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Chat Now</h3>
                <p className="text-sm text-white/80 font-medium">Speak your heart out in your native language. 100% private.</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8">
              <span className="text-sm font-semibold">Start conversation</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Daily Quote Card */}
          <div className="md:col-span-5 bg-[var(--color-tertiary-fixed)] rounded-3xl p-8 flex flex-col justify-center space-y-6 shadow-sm border border-[var(--color-tertiary-container)]/30">
            <span className="material-symbols-outlined text-[var(--color-tertiary)] text-4xl opacity-50">format_quote</span>
            <p className="text-2xl text-[var(--color-on-tertiary-fixed)] italic leading-snug font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              "{todayAff}"
            </p>
            <p className="text-sm text-[var(--color-on-tertiary-fixed-variant)] font-bold uppercase tracking-widest">— Daily Affirmation</p>
          </div>

          {/* Privacy Promise Card */}
          <div className="md:col-span-7 glass-card bg-white/70 border border-[var(--color-outline-variant)]/30 shadow-sm rounded-3xl p-8 grid md:grid-cols-2 gap-8 items-center overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-active-teal)]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                <span className="text-sm font-bold uppercase tracking-wider">Privacy First</span>
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>Your sanctuary is secure.</h3>
              <p className="text-base text-[var(--color-on-surface-variant)] leading-relaxed">No personal data, chat history, or journals are ever stored on our servers. You remain anonymous.</p>
            </div>
            <div className="h-40 bg-[var(--color-warm-mist)] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[var(--color-outline-variant)]/20">
              <span className="material-symbols-outlined text-6xl text-[var(--color-outline-variant)]/40">lock</span>
            </div>
          </div>
        </div>

        {/* ── Retained Original Features (Chart, Wins, Countdown) ── */}
        <section className="pt-4 border-t border-[var(--color-outline-variant)]/20">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[var(--color-on-background)]" style={{ fontFamily: 'var(--font-display)' }}>Progress Overview</h2>
              <p className="text-base text-[var(--color-outline)]">Your mental wellness journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 7-Day Trend Chart */}
            <div className="glass-card bg-white/80 p-6 rounded-3xl shadow-sm border border-[var(--color-outline-variant)]/30">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-[var(--color-primary)]" />
                <h3 className="text-lg font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>7-Day Mood Trend</h3>
              </div>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={chartData} margin={{ top:5, right:5, bottom:0, left:-20 }}>
                    <defs>
                      <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="var(--color-primary)" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize:11, fill:'var(--color-outline)' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[1,7]} hide />
                    <Tooltip content={<Tip />} cursor={{ stroke: 'var(--color-outline-variant)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#mg)"
                      dot={{ fill:'var(--color-primary)', r:5, strokeWidth:2, stroke:'var(--color-background)' }}
                      activeDot={{ r:7, fill:'var(--color-primary)' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[160px] flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-container)]/10 flex items-center justify-center mb-3">
                    <BarChart2 size={24} className="text-[var(--color-primary)]" />
                  </div>
                  <p className="text-sm text-[var(--color-outline)]">Log your mood above to see your trend</p>
                </div>
              )}
            </div>

            {/* Daily Wins */}
            <div className="glass-card bg-white/80 p-6 rounded-3xl shadow-sm border border-[var(--color-outline-variant)]/30">
              <div className="flex items-center gap-2 mb-6">
                <Trophy size={20} className="text-[var(--color-warning)] text-yellow-500" />
                <h3 className="text-lg font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>Daily Wins</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <input 
                  value={winText} onChange={e => setWinText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addWinHandler()}
                  placeholder={t('dashboard.win_placeholder')} 
                  className="flex-1 bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
                <button 
                  onClick={addWinHandler} disabled={!winText.trim()}
                  className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed bg-[var(--color-primary)] text-white disabled:bg-[var(--color-outline-variant)]/30 disabled:text-[var(--color-outline)]"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto pr-1">
                {dailyWins.length === 0 ? (
                  <p className="text-sm text-[var(--color-outline)] text-center mt-2">Log your first win today — even small ones count.</p>
                ) : (
                  dailyWins.slice(0,5).map((w, i) => (
                    <motion.div key={w.id} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.04 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100"
                    >
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="flex-1 text-sm text-[var(--color-on-surface)]">{w.text}</span>
                      <button onClick={() => removeWin(w.id)} className="text-[var(--color-outline-variant)] hover:text-red-500 transition-colors bg-transparent border-none p-1 cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <ExamCountdown />
          </div>
        </section>

        {/* ── Secondary Tools Section ── */}
        <section className="space-y-6 pt-8 border-t border-[var(--color-outline-variant)]/20">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[var(--color-on-background)]" style={{ fontFamily: 'var(--font-display)' }}>Explore Tools</h2>
              <p className="text-base text-[var(--color-outline)]">Small steps to a calmer mind.</p>
            </div>
            <button onClick={() => navigate('/games')} className="text-[var(--color-primary)] font-semibold text-sm flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none">
              View All <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div onClick={() => navigate('/games/breathing')} className="glass-card bg-white/70 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-shadow cursor-pointer border border-[var(--color-outline-variant)]/30">
              <div className="w-12 h-12 bg-[var(--color-sage-soft)] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-primary)]">air</span>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>Breathing Bubble</h4>
              <p className="text-sm text-[var(--color-outline-variant)]">A guided breathing tool to anchor yourself in the present.</p>
            </div>
            <div onClick={() => navigate('/journal')} className="glass-card bg-white/70 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-shadow cursor-pointer border border-[var(--color-outline-variant)]/30">
              <div className="w-12 h-12 bg-[var(--color-secondary-fixed)] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-secondary)]">edit_note</span>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>Private Journal</h4>
              <p className="text-sm text-[var(--color-outline-variant)]">Express your thoughts. They stay on your device, always.</p>
            </div>
            <div onClick={() => navigate('/games')} className="glass-card bg-white/70 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-shadow cursor-pointer border border-[var(--color-outline-variant)]/30">
              <div className="w-12 h-12 bg-[var(--color-tertiary-fixed)] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-tertiary)]">sports_esports</span>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>Calming Games</h4>
              <p className="text-sm text-[var(--color-outline-variant)]">Gentle focus puzzles designed to lower academic anxiety.</p>
            </div>
            <div className="glass-card bg-white/70 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-shadow border border-[var(--color-outline-variant)]/30">
              <div className="w-12 h-12 bg-[var(--color-primary-fixed)] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-on-primary-fixed-variant)]">translate</span>
              </div>
              <h4 className="text-lg font-semibold text-[var(--color-on-surface)]" style={{ fontFamily: 'var(--font-display)' }}>10+ Languages</h4>
              <p className="text-sm text-[var(--color-outline-variant)]">Chat comfortably in Hindi, Marathi, Tamil, and more.</p>
            </div>
          </div>
        </section>

        {/* ── Team Quote / Impact ── */}
        <section className="py-12 border-t border-[var(--color-outline-variant)]/20 flex flex-col items-center text-center max-w-2xl mx-auto">
          <p className="text-lg text-[var(--color-on-surface)] italic mb-6 leading-relaxed">
            "I built Mansitra because I realized that sometimes, the hardest thing to do is simply talk to someone. I wanted to create a silent, supportive friend that genuinely cares."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <img alt="Yash Patadiya" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ19f_0hHIsce7NpGqU4Ru1hFI0T3-qVsQfCShptxMSEZHQy9HsPEiCp2cvfoepHyIa3SmYGIW9WdvJhoSUlHVv8DY8qTshEbV71MuX2Qnghp6lYDpA25qj8Xbqn4hBYKEB07r8C0fmUAzVgLAEsv0kD8HHuXhf1XxBr3C004XaHW4_LIUrS_lDl9c8PvUAtYCIDBmr5rdievFlv-m1mRU1I-QuiX9BsChs5BrfemMIaRCdPWL7nT46e8gE5RTLNmHv0n32US1Utfe" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[var(--color-on-surface)]">Yash Patadiya</p>
              <p className="text-xs font-medium text-[var(--color-outline)]">Founder, Mansitra</p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-[var(--color-surface-dim)]/20 py-12 px-5 md:px-10 mt-12 mb-24 md:mb-0 border-t border-[var(--color-outline-variant)]/20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              <img alt="Mansitra Logo" className="w-8 h-8 rounded-md" src="https://lh3.googleusercontent.com/aida/AP1WRLsNVMgnnPlJ0696Nr7yH94E0umOgcB_yePrfwQF296Hd2MEli-2SgFPbasuWrB5Sd_dLxdnxQ1pHRlnlf0m8ImtE3fAA8SzfZWl-Py0-6boaKAPcEt2thgD4zFzBM9xNX_8QnTZGRXYj6_E5EjVYMI8-uPfwdJ9uni6pIW4CkhX7Me3BXL4ozXYfn5gDOJgp--Xr0esk2dG-pxJ_u9Xvbo5MQlSZKJQkpXTFJuJryjIKTUsNDUFUyrjVHb7" />
              <span className="text-2xl font-bold text-[var(--color-primary)] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Mansitra</span>
            </div>
            <p className="text-base text-[var(--color-on-surface-variant)] leading-relaxed">Your anonymous, judgment-free AI companion. Designed to support emotional resilience and student well-being.</p>
            <p className="text-xs text-[var(--color-outline)] leading-tight">⚠️ Medical Disclaimer: Mansitra is a supportive AI companion, not a replacement for professional medical services.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-4">
              <h5 className="text-sm font-bold uppercase tracking-widest text-[var(--color-on-surface)]">Helplines</h5>
              <ul className="text-sm space-y-3 text-[var(--color-outline)] list-none p-0 m-0 font-medium">
                <li>iCall: 9152987821</li>
                <li>Vandrevala: 1860-2662-345</li>
                <li>AASRA: 9820466627</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-sm font-bold uppercase tracking-widest text-[var(--color-on-surface)]">Social</h5>
              <ul className="text-sm space-y-3 text-[var(--color-outline)] list-none p-0 m-0 font-medium">
                <li><a href="#" className="hover:text-[var(--color-primary)] text-inherit no-underline transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[var(--color-primary)] text-inherit no-underline transition-colors">Instagram</a></li>
                <li><a href="https://github.com/Mansitra" target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] text-inherit no-underline transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[var(--color-outline-variant)]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--color-outline)] text-xs font-medium">
          <p>© {new Date().getFullYear()} Mansitra (Mann Ka Mitra). All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-primary)] text-inherit no-underline">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-primary)] text-inherit no-underline">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
