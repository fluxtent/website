"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Play } from "lucide-react"

interface ContinueLearningProps {
  lastModuleId: number | null
  lastModuleTitle: string
  lastModuleProgress: number
  onContinue: (moduleId: number) => void
}

export default function ContinueLearning({
  lastModuleId,
  lastModuleTitle,
  lastModuleProgress,
  onContinue,
}: ContinueLearningProps) {
  if (!lastModuleId) return null

  return (
    <div className="relative rounded-2xl border border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-cyan-400/10" />
      <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Play className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-primary mb-1">Continue where you left off</p>
            <h3 className="text-lg font-semibold text-foreground">{lastModuleTitle}</h3>
            <p className="text-sm text-muted-foreground">{Math.round(lastModuleProgress)}% complete</p>
          </div>
        </div>

        <Button
          onClick={() => onContinue(lastModuleId)}
          className="gradient-primary text-white border-0 gap-2 px-5 h-11 font-semibold shadow-lg shadow-primary/20"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
