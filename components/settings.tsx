"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings as SettingsIcon, Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"

const themes = [
  {
    id: "dark",
    name: "Dark Space",
    description: "Dark theme with space aesthetics",
    icon: Moon,
    preview: "bg-gray-900",
  },
  {
    id: "light",
    name: "Light Classic",
    description: "Clean light theme",
    icon: Sun,
    preview: "bg-gray-50",
  },
  {
    id: "system",
    name: "System",
    description: "Follows your system preference",
    icon: Monitor,
    preview: "bg-gradient-to-r from-gray-50 to-gray-900",
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    description: "Deep blue ocean theme",
    icon: Palette,
    preview: "bg-gradient-to-br from-blue-900 to-blue-700",
  },
  {
    id: "forest",
    name: "Forest Green",
    description: "Nature-inspired green theme",
    icon: Palette,
    preview: "bg-gradient-to-br from-green-900 to-green-700",
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
    // Force a re-render by updating the document class
    if (typeof document !== 'undefined') {
      document.documentElement.className = newTheme === 'system' ? '' : newTheme
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50">
        <SettingsIcon className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Theme</h3>
            <div className="grid grid-cols-1 gap-3">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon
                const isActive = theme === themeOption.id
                
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`relative p-4 rounded-lg border transition-all ${
                      isActive 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded ${themeOption.preview} flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{themeOption.name}</span>
                          {isActive && (
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{themeOption.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>AP Computer Science A Interactive Learning Platform</p>
              <p>Version 1.0.0</p>
              <p>Built with Next.js and Tailwind CSS</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 