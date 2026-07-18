'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'en' | 'ml'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ml')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Get language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
    setIsHydrated(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
