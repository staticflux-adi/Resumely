import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadDarkMode, saveDarkMode } from '@/utils/storage'

interface ThemeContextValue {
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (v: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState<boolean>(() => loadDarkMode())

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    saveDarkMode(darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkModeState((v) => !v)
  const setDarkMode = (v: boolean) => setDarkModeState(v)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider')
  return ctx
}
