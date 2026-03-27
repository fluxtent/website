"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { BookmarkCheck, CloudUpload, BarChart3, LogIn } from "lucide-react"

export default function AuthPromptBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/6 via-card to-cyan-400/10 p-6 md:p-8">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sign in to keep your AP CSA progress moving
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg">
            Create a free account to save completed lessons, resume the right module instantly, and keep your work synced across devices.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
              Save progress
            </span>
            <span className="flex items-center gap-1.5">
              <CloudUpload className="h-3.5 w-3.5 text-primary" />
              Sync across devices
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              Track completion
            </span>
          </div>
        </div>

        <Button
          onClick={() => signIn("google")}
          className="gradient-primary text-white border-0 gap-2 px-5 h-11 font-semibold shadow-lg shadow-primary/20 shrink-0"
        >
          <LogIn className="h-4 w-4" />
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
