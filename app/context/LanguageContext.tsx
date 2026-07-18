'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'en' | 'ml'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const defaultValue: LanguageContextType = {
  language: 'ml',
  setLanguage: () => {},
}

const LanguageContext = createContext<LanguageContextType>(defaultValue)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ml')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('language') as Language | null
      if (saved === 'en' || saved === 'ml') {
        setLanguageState(saved)
      }
    } catch {
      // Silently handle storage access errors
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('language', lang)
    } catch {
      // Silently handle storage write errors
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
