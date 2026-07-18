'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useTheme } from '@/app/context/ThemeContext'
import { Globe, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

export default function SettingsToggle() {
  const [showMenu, setShowMenu] = useState(false)
  
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative flex items-center gap-2">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      {/* Language Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 flex items-center gap-1"
          title="Change language"
          aria-label="Change language"
        >
          <Globe className="w-5 h-5" />
          <span className="text-xs font-bold uppercase">{language}</span>
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <button
              onClick={() => {
                setLanguage('en')
                setShowMenu(false)
              }}
              className={`block w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setLanguage('ml')
                setShowMenu(false)
              }}
              className={`block w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                language === 'ml'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              മലയാളം
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
