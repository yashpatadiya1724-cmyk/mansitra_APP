import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Growth stages: Seed → Sprout → Sapling → Tree → Banyan ──
export const GARDEN_STAGES = [
  { id: 'seed',    label: 'Beej',          labelEn: 'Seed',           minXP: 0,   desc: 'Your journey begins. A tiny seed of courage.' },
  { id: 'sprout',  label: 'Ankur',         labelEn: 'Sprout',         minXP: 20,  desc: 'You opened up. The first green shoot appears.' },
  { id: 'sapling', label: 'Paudha',        labelEn: 'Sapling',        minXP: 60,  desc: 'Growing stronger. Roots are forming.' },
  { id: 'tree',    label: 'Ped',           labelEn: 'Tree',           minXP: 130, desc: 'Standing tall. Your resilience is real.' },
  { id: 'banyan',  label: 'Bargad',        labelEn: 'Banyan Tree',    minXP: 250, desc: 'The Banyan of Resilience. You are unshakeable.' },
]

// XP rewards for different actions
export const XP_REWARDS = {
  chat_message:   2,   // sending a message
  mood_checkin:   5,   // daily mood log
  tool_used:      8,   // using a calming tool
  daily_win:      6,   // logging a win
  streak_bonus:   10,  // 3-day streak bonus
  voice_session:  4,   // using voice input
}

const getStage = (xp) => {
  let stage = GARDEN_STAGES[0]
  for (const s of GARDEN_STAGES) {
    if (xp >= s.minXP) stage = s
  }
  return stage
}

const getNextStage = (xp) => {
  return GARDEN_STAGES.find(s => s.minXP > xp) || null
}

export const useGardenStore = create(
  persist(
    (set, get) => ({
      xp: 0,
      totalMessages: 0,
      lastWatered: null,   // timestamp of last XP gain
      unlockedStages: ['seed'],
      newUnlock: null,     // stage just unlocked (for celebration)

      addXP: (amount, reason) => {
        set(state => {
          const newXP = state.xp + amount
          const prevStage = getStage(state.xp)
          const newStage  = getStage(newXP)
          const justUnlocked = newStage.id !== prevStage.id

          const unlockedStages = justUnlocked && !state.unlockedStages.includes(newStage.id)
            ? [...state.unlockedStages, newStage.id]
            : state.unlockedStages

          return {
            xp: newXP,
            lastWatered: Date.now(),
            unlockedStages,
            newUnlock: justUnlocked ? newStage : null,
          }
        })
      },

      recordMessage: () => {
        set(state => ({ totalMessages: state.totalMessages + 1 }))
        get().addXP(XP_REWARDS.chat_message, 'chat')
      },

      clearNewUnlock: () => set({ newUnlock: null }),

      getStage:     () => getStage(get().xp),
      getNextStage: () => getNextStage(get().xp),
      getProgress:  () => {
        const xp = get().xp
        const current = getStage(xp)
        const next = getNextStage(xp)
        if (!next) return 100
        const range = next.minXP - current.minXP
        const earned = xp - current.minXP
        return Math.round((earned / range) * 100)
      },
    }),
    { name: 'manasitra_garden' }
  )
)
