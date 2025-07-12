import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'testappthing',
  description: 'gooner69',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
