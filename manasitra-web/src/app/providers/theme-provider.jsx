import { useEffect } from 'react'
import { useThemeStore } from '@store/theme-store'

export const ThemeInitializer = () => {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    // Force light theme — clear any old dark value from localStorage
    if (theme === 'dark') setTheme('light')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
      root.classList.remove('light')
    } else if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      // light (default beige)
      root.classList.remove('dark')
      root.classList.remove('light')
    }
  }, [theme])

  return null
}
