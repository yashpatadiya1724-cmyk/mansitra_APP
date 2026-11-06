import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../config/constants'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light', // 'dark' | 'light' | 'auto'
      setTheme: (theme) => set({ theme }),
    }),
    { name: STORAGE_KEYS.THEME }
  )
)
