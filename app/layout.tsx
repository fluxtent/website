import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import ThemeClientWrapper from "@/components/providers/theme-client-wrapper"
import NextAuthSessionProvider from "@/components/providers/session-provider"

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CodeCSA - Student-First AP Computer Science A Practice Platform",
  description:
    "Study AP Computer Science A with guided modules, in-browser Java practice, searchable drills, and a cleaner exam-prep workflow.",
  keywords: [
    "AP Computer Science A",
    "AP CSA",
    "Java",
    "coding practice",
    "AP exam prep",
    "browser Java editor",
  ],
  openGraph: {
    title: "CodeCSA - Student-First AP Computer Science A Practice Platform",
    description:
      "Guided AP CSA modules, live Java practice, a searchable drill hub, and a better final sprint into exam review.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${fontSans.variable} ${fontMono.variable} min-h-screen font-sans`}>
        <NextAuthSessionProvider>
          <ThemeClientWrapper>{children}</ThemeClientWrapper>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
