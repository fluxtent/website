"use client"

import ProgressRing from "@/components/shared/progress-ring"
import { BookOpen, CheckCircle, Trophy, Clock } from "lucide-react"

interface ProgressSummaryProps {
  overallProgress: number
  totalModules: number
  completedModules: number
  totalLessons: number
  completedLessons: number
}

export default function ProgressSummary({
  overallProgress,
  totalModules,
  completedModules,
  totalLessons,
  completedLessons,
}: ProgressSummaryProps) {
  const stats = [
    {
      label: "Modules Completed",
      value: `${completedModules}/${totalModules}`,
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Lessons Completed",
      value: `${completedLessons}/${totalLessons}`,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Remaining",
      value: `${totalLessons - completedLessons}`,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0">
          <ProgressRing progress={overallProgress} size={140} strokeWidth={10} />
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-lg font-semibold text-foreground mb-1">Your Learning Progress</h3>
          <p className="text-sm text-muted-foreground mb-5">
            {completedLessons > 0
              ? `You've completed ${completedLessons} lessons. Keep up the momentum!`
              : "Start your first lesson to begin tracking your progress."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Completion</span>
          <span className="text-sm font-semibold text-primary">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-1000 ease-out animate-progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
