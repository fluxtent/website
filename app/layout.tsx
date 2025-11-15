import type { Metadata } from 'next'
import './globals.css'
import ThemeClientWrapper from '@/components/providers/theme-client-wrapper'
import NextAuthSessionProvider from '@/components/providers/session-provider'

export const metadata: Metadata = {
  title: 'AP Computer Science A - Interactive Learning Platform',
  description: 'Learn AP Computer Science A with interactive lessons and coding exercises',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAuthSessionProvider>
          <ThemeClientWrapper>{children}</ThemeClientWrapper>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
