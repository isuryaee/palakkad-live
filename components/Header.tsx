'use client'

import Link from 'next/link'
import Image from 'next/image'
import SettingsToggle from './SettingsToggle'
import { useLanguage } from '@/app/context/LanguageContext'
import { t } from '@/app/lib/translations'
import { Menu } from 'lucide-react'
import { useState } from 'react'

const CATEGORY_SLUGS = [
  { enName: 'breaking', key: 'breaking' },
  { enName: 'Politics', key: 'politics' },
  { enName: 'Crime & Accidents', key: 'crime' },
  { enName: 'Weather', key: 'weather' },
  { enName: 'Sports', key: 'sports' },
  { enName: 'Education', key: 'education' },
]

export default function Header() {
  const { language } = useLanguage()
  const lang = language as 'en' | 'ml'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Domain Bar */}
      <div className="bg-gray-100 dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">LIVEPALAKKAD.COM</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-20">
          {/* Left Side - Hamburger + Logo (Mobile) */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo & Branding */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative">
                <Image
                  src="/logo/livepalakkad-icon.png"
                  alt="LivePalakkad"
                  width={44}
                  height={44}
                  className="w-11 h-11 group-hover:scale-110 transition"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-gray-900 dark:text-white">LivePalakkad</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Palakkad First</p>
              </div>
            </Link>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORY_SLUGS.map((cat) => (
              <Link
                key={cat.enName}
                href={`/category/${cat.enName.toLowerCase().replace(' & ', '-')}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                {t(cat.key as any, lang)}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <SettingsToggle />
            <Link
              href="/desk"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition shadow-md"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="hidden lg:flex items-center gap-6 pb-4 text-sm border-t border-gray-200 dark:border-gray-800 pt-4">
          <Link href="/latest" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition">{t('latest' as any, lang)}</Link>
          <Link href="/explore" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition">{t('explore' as any, lang)}</Link>
          <Link href="/photos" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition">{t('photos' as any, lang)}</Link>
          <Link href="/videos" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition">{t('videos' as any, lang)}</Link>
          <Link href="/live" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> {t('live' as any, lang)}
          </Link>
        </div>

        {/* Mobile Menu Dropdown - Instant like Instagram */}
        <div className={`md:hidden ${
          mobileMenuOpen 
            ? 'block' 
            : 'hidden'
        }`}>
          <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 backdrop-blur-sm">
            <nav className="flex flex-col gap-1 p-4">
              {CATEGORY_SLUGS.map((cat) => (
                <Link
                  key={cat.enName}
                  href={`/category/${cat.enName.toLowerCase().replace(' & ', '-')}`}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(cat.key as any, lang)}
                </Link>
              ))}
              <Link href="/latest" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>{t('latest' as any, lang)}</Link>
              <Link href="/explore" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>{t('explore' as any, lang)}</Link>
              <Link href="/photos" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>{t('photos' as any, lang)}</Link>
              <Link href="/videos" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>{t('videos' as any, lang)}</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
