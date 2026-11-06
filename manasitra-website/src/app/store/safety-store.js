import { create } from 'zustand'
import { RISK_LEVELS } from '../config/constants'

export const useSafetyStore = create((set) => ({
  riskLevel: RISK_LEVELS.NONE,
  crisisScreenVisible: false,
  lastRiskAssessment: null,

  setRiskLevel: (level) =>
    set({ riskLevel: level, lastRiskAssessment: Date.now() }),

  showCrisisScreen: () => set({ crisisScreenVisible: true }),

  hideCrisisScreen: () =>
    set({ crisisScreenVisible: false, riskLevel: RISK_LEVELS.LOW }),

  reset: () =>
    set({
      riskLevel: RISK_LEVELS.NONE,
      crisisScreenVisible: false,
      lastRiskAssessment: null,
    }),
}))
