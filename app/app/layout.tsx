
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Isabel's Magical Birthday Website",
  description: 'A dreamy cottagecore birthday celebration for Isabel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} hydration-safe`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
