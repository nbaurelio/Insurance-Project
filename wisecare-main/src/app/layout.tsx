import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const defaultUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s - WiseCare',
    default: 'WiseCare Employee Portal',
  },
  description: 'WiseCare Employee Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('[RootLayout] minimal render — no providers')
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning={true}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
