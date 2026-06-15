import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../config/constants'

export const useLanguageStore = create(
  persist(
    (set) => ({
      selectedLanguage: 'en',
      isLanguageLocked: false,
      setLanguage: (lang) => set({ selectedLanguage: lang, isLanguageLocked: true }),
      unlockLanguage: () => set({ isLanguageLocked: false }),
    }),
    { name: STORAGE_KEYS.LANGUAGE }
  )
)
