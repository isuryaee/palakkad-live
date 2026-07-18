'use client'

import Header from './Header'
import SettingsToggle from './SettingsToggle'
import { Suspense } from 'react'

export default function HeaderWithSettings() {
  return (
    <div className="relative">
      <div className="absolute top-3 right-16 md:right-24 z-50">
        <Suspense fallback={<div className="w-24 h-10" />}>
          <SettingsToggle />
        </Suspense>
      </div>
      <Header />
    </div>
  )
}
