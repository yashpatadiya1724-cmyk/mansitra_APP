import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../config/constants'

export const useMoodStore = create(
  persist(
    (set, get) => ({
      moodHistory: [],

      addMoodEntry: (entry) => {
        const newEntry = { ...entry, id: crypto.randomUUID(), timestamp: Date.now() }
        set((state) => ({ moodHistory: [newEntry, ...state.moodHistory] }))
      },

      getTodaysMood: () => {
        const today = new Date().toDateString()
        return get().moodHistory.find(
          (e) => new Date(e.timestamp).toDateString() === today
        ) || null
      },

      getMoodTrend: (days = 7) => {
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
        return get().moodHistory.filter((e) => e.timestamp >= cutoff)
      },

      clearMoodHistory: () => set({ moodHistory: [] }),
    }),
    { name: STORAGE_KEYS.MOOD_LOG }
  )
)
