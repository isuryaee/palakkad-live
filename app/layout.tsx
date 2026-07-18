import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'LivePalakkad - Palakkad First',
  description: 'Breaking news and hyperlocal stories from Palakkad district, Kerala. Politics, crime, weather, education, and more.',
  generator: 'LivePalakkad.com',
  icons: {
    icon: '/logo/livepalakkad-icon.png',
    apple: '/logo/livepalakkad-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <ThemeProvider>
          <LanguageProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
