"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, BookOpen, Code2 } from "lucide-react"
import type { ModuleData } from "@/types/course"

interface ModuleCardProps {
  module: ModuleData
  onClick: (moduleId: number) => void
  index: number
}

const moduleGradients: Record<string, string> = {
  "bg-sky-500": "from-sky-500 to-cyan-400",
  "bg-emerald-500": "from-emerald-500 to-teal-400",
  "bg-indigo-500": "from-indigo-500 to-violet-500",
  "bg-amber-500": "from-amber-500 to-orange-500",
  "bg-rose-500": "from-rose-500 to-red-500",
  "bg-cyan-500": "from-cyan-500 to-sky-500",
  "bg-fuchsia-500": "from-fuchsia-500 to-pink-500",
  "bg-teal-500": "from-teal-500 to-cyan-500",
  "bg-yellow-500": "from-amber-500 to-yellow-500",
  "bg-blue-600": "from-blue-600 to-sky-500",
  "bg-gray-500": "from-slate-500 to-gray-500",
  "bg-slate-500": "from-slate-500 to-zinc-500",
}

export default function ModuleCard({ module, onClick, index }: ModuleCardProps) {
  const progress = module.totalLessons > 0 ? (module.completed / module.totalLessons) * 100 : 0
  const gradient = moduleGradients[module.color] || "from-primary to-purple-500"

  const theoryCount = Math.ceil((module.totalLessons || module.lessons) * 0.5)
  const practiceCount = (module.totalLessons || module.lessons) - theoryCount

  return (
    <div
      onClick={() => onClick(module.id)}
      className="module-card group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden cursor-pointer"
    >
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
              {module.id}
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Module {module.id}</p>
              <h3 className="text-base font-semibold text-foreground leading-tight">{module.title}</h3>
            </div>
          </div>

          {module.isCompleted && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[10px] font-semibold text-emerald-400">Done</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{module.description}</p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {module.difficulty && (
            <Badge variant="outline" className="text-[10px] font-medium">{module.difficulty}</Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-3 w-3" />
            <span>{theoryCount} theory</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Code2 className="h-3 w-3" />
            <span>{practiceCount} practice</span>
          </div>
          {module.estimatedTime && (
            <span className="text-xs text-muted-foreground">≈ {module.estimatedTime}</span>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-semibold text-foreground">
              {module.completed}/{module.totalLessons || module.lessons}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
              style={{ width: `${Math.max(progress, 0)}%` }}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-colors"
        >
          <span className="text-sm font-medium">
            {module.isCompleted ? "Review Module" : module.completed > 0 ? "Continue" : "Start Learning"}
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
