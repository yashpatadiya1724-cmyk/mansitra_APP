import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../config/constants'

// Real resilience score — multi-factor, not just streak
const computeResilienceScore = ({ checkInStreak, dailyWins, toolsUsed, moodHistory }) => {
  // Factor 1: Check-in consistency (max 40 pts) — logarithmic so early streaks feel rewarding
  const streakScore = Math.min(40, Math.round(Math.log2(checkInStreak + 1) * 14))

  // Factor 2: Daily wins logged this week (max 30 pts)
  const weekAgo = Date.now() - 7 * 86400000
  const recentWins = dailyWins.filter(w => w.timestamp > weekAgo).length
  const winsScore = Math.min(30, recentWins * 5)

  // Factor 3: Calming tools used this week (max 20 pts)
  const recentTools = (toolsUsed || []).filter(t => t.timestamp > weekAgo).length
  const toolScore = Math.min(20, recentTools * 4)

  // Factor 4: Mood stability — fewer extreme swings = more resilient (max 10 pts)
  const MOOD_VAL = { very_happy: 7, content: 6, neutral: 5, anxious: 3, sad: 2, overwhelmed: 2, exhausted: 3 }
  const recentMoods = (moodHistory || []).filter(m => m.timestamp > weekAgo).map(m => MOOD_VAL[m.mood] || 5)
  let stabilityScore = 10
  if (recentMoods.length >= 2) {
    const swings = recentMoods.slice(1).reduce((acc, v, i) => acc + Math.abs(v - recentMoods[i]), 0)
    const avgSwing = swings / (recentMoods.length - 1)
    stabilityScore = Math.max(0, Math.round(10 - avgSwing * 2))
  }

  return Math.min(100, streakScore + winsScore + toolScore + stabilityScore)
}

export const useProgressStore = create(
  persist(
    (set, get) => ({
      checkInStreak: 0,
      lastCheckIn: null,
      dailyWins: [],
      toolsUsed: [],       // { tool: string, timestamp: number }
      resilienceScore: 0,
      weeklyInsight: null, // { text: string, generatedAt: number }

      recordCheckIn: () => {
        const today = new Date().toDateString()
        const { lastCheckIn, checkInStreak, dailyWins, toolsUsed } = get()
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const newStreak =
          lastCheckIn === yesterday ? checkInStreak + 1
          : lastCheckIn === today   ? checkInStreak
          : 1
        const score = computeResilienceScore({ checkInStreak: newStreak, dailyWins, toolsUsed, moodHistory: [] })
        set({ checkInStreak: newStreak, lastCheckIn: today, resilienceScore: score })
      },

      recordToolUsed: (tool) => {
        const entry = { tool, timestamp: Date.now() }
        set(state => {
          const toolsUsed = [entry, ...state.toolsUsed].slice(0, 100)
          const score = computeResilienceScore({ checkInStreak: state.checkInStreak, dailyWins: state.dailyWins, toolsUsed, moodHistory: [] })
          return { toolsUsed, resilienceScore: score }
        })
      },

      addWin: (text) => {
        const win = { id: crypto.randomUUID(), text, timestamp: Date.now() }
        set(state => {
          const dailyWins = [win, ...state.dailyWins].slice(0, 50)
          const score = computeResilienceScore({ checkInStreak: state.checkInStreak, dailyWins, toolsUsed: state.toolsUsed, moodHistory: [] })
          return { dailyWins, resilienceScore: score }
        })
      },

      removeWin: (id) =>
        set(state => ({ dailyWins: state.dailyWins.filter(w => w.id !== id) })),

      setWeeklyInsight: (text) =>
        set({ weeklyInsight: { text, generatedAt: Date.now() } }),

      clearProgress: () =>
        set({ checkInStreak: 0, lastCheckIn: null, dailyWins: [], toolsUsed: [], resilienceScore: 0, weeklyInsight: null }),
    }),
    { name: STORAGE_KEYS.PROGRESS }
  )
)
