"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft, Code2 } from "lucide-react"
import AuthButton from "@/components/auth-button"
import Settings from "@/components/settings"
import { primaryNavItems } from "@/lib/landing-content"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onBack?: () => void
  showBack?: boolean
  title?: string
  subtitle?: string
}

export default function Navbar({ onBack, showBack, title, subtitle }: NavbarProps) {
  const pathname = usePathname()
  const { status } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {showBack && onBack ? (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="mr-1 gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : null}

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/20">
              <Code2 className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="leading-none">
              <span className="block text-lg font-bold tracking-tight text-foreground">CodeCSA</span>
              <span className="hidden text-[11px] uppercase tracking-[0.24em] text-muted-foreground md:block">
                AP CSA workspace
              </span>
            </div>
          </Link>

          {title && (
            <div className="hidden min-w-0 items-center gap-2 border-l border-border pl-4 md:flex">
              <span className="truncate text-sm font-medium text-foreground">{title}</span>
              {subtitle && <span className="truncate text-xs text-muted-foreground">{subtitle}</span>}
            </div>
          )}
        </div>

        {!showBack && (
          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 md:flex">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.match || pathname?.startsWith(`${item.match}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {status === "authenticated" && !showBack && (
            <Link
              href="/learn"
              className="hidden rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-primary lg:inline-flex"
            >
              Jump back in
            </Link>
          )}
          <AuthButton />
          <Settings />
        </div>
      </div>
    </header>
  )
}
