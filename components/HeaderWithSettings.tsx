'use client'

import { useState, useEffect } from 'react'
import Header from './Header'
import SettingsToggle from './SettingsToggle'

export default function HeaderWithSettings() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && (
        <div className="absolute top-4 right-20 z-50">
          <SettingsToggle />
        </div>
      )}
      <Header />
    </>
  )
}
