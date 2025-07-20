import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          themes={["light", "dark", "ocean", "forest"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
