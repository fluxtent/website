'use client'

import { ThemeProvider } from "@/components/theme-provider"

export default function ThemeClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      themes={["light", "dark", "ocean", "forest"]}
    >
      {children}
    </ThemeProvider>
  )
}
