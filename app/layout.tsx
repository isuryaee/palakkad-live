import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'LivePalakkad - Palakkad First - Breaking News & Live Updates',
  description: 'Breaking news and hyperlocal stories from Palakkad district, Kerala. Politics, crime, weather, education, sports, health and latest updates.',
  generator: 'LivePalakkad.com',
  keywords: ['Palakkad news', 'Kerala news', 'breaking news', 'live updates', 'Palakkad District', 'latest news'],
  icons: {
    icon: '/logo/livepalakkad-icon.png',
    apple: '/logo/livepalakkad-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://livepalakkad.com',
    siteName: 'LivePalakkad',
    title: 'LivePalakkad - Palakkad News & Breaking News',
    description: 'Latest news from Palakkad district, Kerala',
    images: [
      {
        url: 'https://livepalakkad.com/logo/livepalakkad-og.png',
        width: 1200,
        height: 630,
        alt: 'LivePalakkad Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivePalakkad - Palakkad News',
    description: 'Breaking news from Palakkad, Kerala',
    creator: '@LivePalakkad',
    images: ['https://livepalakkad.com/logo/livepalakkad-og.png'],
  },
  alternates: {
    canonical: 'https://livepalakkad.com',
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
    <html lang="en" suppressHydrationWarning className="bg-background">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-background text-foreground md:pb-0 pb-16">
        <ThemeProvider>
          <LanguageProvider>
            <SessionProvider>
              {children}
              <MobileBottomNav />
            </SessionProvider>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
