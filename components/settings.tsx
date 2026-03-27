"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings as SettingsIcon, Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import AuthButton from "@/components/auth-button"

const themes = [
  {
    id: "dark",
    name: "Dark Space",
    description: "Deep dark theme — easy on the eyes",
    icon: Moon,
    preview: "bg-gradient-to-br from-slate-900 to-slate-800",
  },
  {
    id: "light",
    name: "Light Classic",
    description: "Clean and bright for daytime",
    icon: Sun,
    preview: "bg-gradient-to-br from-slate-50 to-slate-100",
  },
  {
    id: "system",
    name: "System",
    description: "Follows your OS preference",
    icon: Monitor,
    preview: "bg-gradient-to-r from-slate-50 to-slate-900",
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    description: "Deep blue ocean aesthetic",
    icon: Palette,
    preview: "bg-gradient-to-br from-blue-900 to-blue-700",
  },
  {
    id: "forest",
    name: "Forest Green",
    description: "Nature-inspired dark green",
    icon: Palette,
    preview: "bg-gradient-to-br from-emerald-900 to-emerald-700",
  },
]

export default function Settings() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    if (typeof document !== 'undefined') {
      document.documentElement.className = newTheme === 'system' ? '' : newTheme
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
        <SettingsIcon className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Appearance</h3>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon
                const isActive = theme === themeOption.id

                return (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${themeOption.preview} flex items-center justify-center shrink-0`}>
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{themeOption.name}</span>
                        {isActive && (
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Account</h3>
            <div className="mb-3">
              <AuthButton />
            </div>
            <p className="text-xs text-muted-foreground">
              Sign in with Google to save your progress across devices.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>CodeCSA — AP Computer Science A Interactive Learning Platform</p>
              <p>Version 2.0 · Built with Next.js & Tailwind CSS</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}